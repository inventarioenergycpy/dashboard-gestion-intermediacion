/**
 * DASHBOARD DE GESTIÓN DE INTERMEDIACIÓN FINANCIERA
 * Módulo de Vista Principal (KPIs, Semáforo de Alertas y Próximas Reuniones)
 */

import { store } from '../store.js';

export class DashboardModule {
  constructor() {
    this.container = document.getElementById('view-dashboard');
  }

  render() {
    if (!this.container) return;

    const projects = store.getProjects();
    const deals = store.getDeals();
    const interlocutors = store.getInterlocutors();
    const settings = store.getSettings();

    // 1. Cálculos de KPIs
    const totalProjects = projects.length;
    const activeProjects = projects.filter(p => p.status === 'activo').length;
    
    const totalBaseCapital = projects.reduce((acc, p) => acc + (Number(p.basePrice) || 0), 0);
    const totalOverprice = projects.reduce((acc, p) => acc + (Number(p.overpriceTarget) || 0), 0);
    
    // 2. Semáforo de Vencimientos de Documentación
    const today = new Date();
    let expiredCount = 0;
    let warningCount = 0;
    let validCount = 0;
    const alertList = [];

    interlocutors.forEach(inter => {
      if (inter.expirationDate) {
        const exp = new Date(inter.expirationDate);
        const diffTime = exp.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        let statusType = 'green';
        let statusLabel = 'Vigente';

        if (diffDays < 0) {
          statusType = 'red';
          statusLabel = `Vencido hace ${Math.abs(diffDays)} días`;
          expiredCount++;
        } else if (diffDays <= (settings.alertDaysWarning || 30)) {
          statusType = 'yellow';
          statusLabel = `Vence en ${diffDays} días`;
          warningCount++;
        } else {
          validCount++;
        }

        if (statusType === 'red' || statusType === 'yellow') {
          alertList.push({
            interlocutor: inter,
            days: diffDays,
            type: statusType,
            label: statusLabel
          });
        }
      }
    });

    // 3. Próximas Reuniones y Fechas de Control
    const upcomingDeals = [...deals]
      .filter(d => d.meetingDate || d.controlDate)
      .sort((a, b) => new Date(a.meetingDate || a.controlDate) - new Date(b.meetingDate || b.controlDate));

    // Renderizado HTML
    this.container.innerHTML = `
      <!-- Semáforo de Alertas y Vencimientos -->
      <div class="alert-strip">
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="width: 10px; height: 10px; border-radius: 50%; background: ${expiredCount > 0 ? '#ef4444' : (warningCount > 0 ? '#f59e0b' : '#10b981')}; box-shadow: 0 0 10px ${expiredCount > 0 ? '#ef4444' : (warningCount > 0 ? '#f59e0b' : '#10b981')};"></div>
          <div>
            <h4 style="font-size: 14px; font-weight: 700; color: var(--text-main); margin-bottom: 2px;">Semáforo de Vigencias Legales</h4>
            <p style="font-size: 12px; color: var(--text-muted);">Monitoreo continuo de mandatos de venta, acuerdos de brokeraje y períodos de cola (Tail Periods).</p>
          </div>
        </div>
        <div class="alert-counts">
          <div class="traffic-pill red" onclick="window.appRouter.navigateTo('interlocutors', 'red')">
            <span class="dot"></span>
            <span>${expiredCount} Vencidos</span>
          </div>
          <div class="traffic-pill yellow" onclick="window.appRouter.navigateTo('interlocutors', 'yellow')">
            <span class="dot"></span>
            <span>${warningCount} Por Vencer (&lt;30d)</span>
          </div>
          <div class="traffic-pill green" onclick="window.appRouter.navigateTo('interlocutors', 'green')">
            <span class="dot"></span>
            <span>${validCount} Vigentes</span>
          </div>
        </div>
      </div>

      <!-- Métricas KPIs -->
      <div class="grid-4" style="margin-bottom: 28px;">
        <div class="kpi-card">
          <div class="kpi-header">
            <span class="kpi-title">Proyectos en Cartera</span>
            <div class="kpi-icon gold">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/></svg>
            </div>
          </div>
          <div class="kpi-value">${totalProjects}</div>
          <div class="kpi-subtext">
            <span style="color: var(--emerald-main); font-weight: 600;">${activeProjects} Activos</span> &bull; ${totalProjects - activeProjects} en otros estados
          </div>
        </div>

        <div class="kpi-card">
          <div class="kpi-header">
            <span class="kpi-title">Volumen Base (USD)</span>
            <div class="kpi-icon blue">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 100 4h4a2 2 0 110 4H8"/><path d="M12 18V6"/></svg>
            </div>
          </div>
          <div class="kpi-value">$${(totalBaseCapital / 1000000).toFixed(1)}M</div>
          <div class="kpi-subtext">Valor neto estimado pretendido por titulares</div>
        </div>

        <div class="kpi-card">
          <div class="kpi-header">
            <span class="kpi-title">Overprice Proyectado</span>
            <div class="kpi-icon emerald">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
            </div>
          </div>
          <div class="kpi-value">$${(totalOverprice / 1000000).toFixed(2)}M</div>
          <div class="kpi-subtext">Comisiones y sobreprecios protegidos por contrato</div>
        </div>

        <div class="kpi-card">
          <div class="kpi-header">
            <span class="kpi-title">Gestiones con Fondos</span>
            <div class="kpi-icon purple">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
            </div>
          </div>
          <div class="kpi-value">${deals.length}</div>
          <div class="kpi-subtext">Negociaciones y presentaciones activas</div>
        </div>
      </div>

      <!-- Grilla Central: Alertas Urgentes y Próximas Reuniones -->
      <div class="grid-2" style="margin-bottom: 28px;">
        <!-- Card 1: Alertas Críticas de Documentación -->
        <div class="card">
          <div class="card-header">
            <h3>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold-main)" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              Alertas de Vencimiento de Acuerdos
            </h3>
            <button class="btn btn-secondary btn-sm" onclick="window.appRouter.navigateTo('interlocutors')">Ver Todos</button>
          </div>
          <div class="card-body" style="padding: 0;">
            ${alertList.length === 0 ? `
              <div style="padding: 32px; text-align: center; color: var(--text-muted); font-size: 13px;">
                ✅ Toda la documentación de dueños y brokers se encuentra dentro de vigencia legal.
              </div>
            ` : `
              <div class="table-responsive">
                <table class="data-table">
                  <thead>
                    <tr>
                      <th>Titular / Intermediario</th>
                      <th>Contrato Firmado</th>
                      <th>Estado / Plazo</th>
                      <th>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${alertList.map(item => `
                      <tr>
                        <td>
                          <strong>${item.interlocutor.name}</strong><br>
                          <span style="font-size: 11px; color: var(--text-muted);">${item.interlocutor.company || 'Directo'}</span>
                        </td>
                        <td>
                          <span style="font-size: 12px;">${item.interlocutor.contractSigned}</span>
                        </td>
                        <td>
                          <span class="traffic-pill ${item.type}" style="display: inline-flex; font-size: 11px; padding: 2px 8px;">
                            ${item.label}
                          </span>
                        </td>
                        <td>
                          <a href="${item.interlocutor.driveDocUrl || 'https://drive.google.com'}" target="_blank" class="btn btn-drive btn-sm" style="padding: 4px 8px; font-size: 11px;">
                            Ver Drive
                          </a>
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            `}
          </div>
        </div>

        <!-- Card 2: Próximas Reuniones y Fechas de Control -->
        <div class="card">
          <div class="card-header">
            <h3>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--blue-main)" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              Próximas Reuniones & Fechas de Control
            </h3>
            <button class="btn btn-secondary btn-sm" onclick="window.appRouter.navigateTo('deals')">Ver Pipeline</button>
          </div>
          <div class="card-body">
            ${upcomingDeals.length === 0 ? `
              <div style="padding: 24px; text-align: center; color: var(--text-muted); font-size: 13px;">
                No hay reuniones programadas para los próximos días.
              </div>
            ` : `
              <div class="timeline">
                ${upcomingDeals.slice(0, 3).map(deal => `
                  <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
                        <span style="font-weight: 700; font-size: 13px; color: var(--gold-light);">${deal.targetName}</span>
                        <span style="font-size: 11px; background: var(--bg-card); padding: 2px 6px; border-radius: var(--radius-sm); border: 1px solid var(--border-color); color: var(--blue-main); font-weight: 600;">
                          ${deal.meetingDate ? `Reunión: ${deal.meetingDate}` : `Control: ${deal.controlDate}`}
                        </span>
                      </div>
                      <p style="font-size: 12px; color: var(--text-main); margin-bottom: 4px;">
                        <strong>Proyecto:</strong> ${deal.projectTitle}
                      </p>
                      <p style="font-size: 12px; color: var(--text-muted);">
                        ${deal.objective}
                      </p>
                    </div>
                  </div>
                `).join('')}
              </div>
            `}
          </div>
        </div>
      </div>
    `;
  }
}
