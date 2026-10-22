/**
 * DASHBOARD DE GESTIÓN DE INTERMEDIACIÓN FINANCIERA
 * Módulo de Gestión de Consultas del Showroom Web (Tickets Únicos ECPY)
 */

import { store } from '../store.js';

export class InquiriesModule {
  constructor() {
    this.container = document.getElementById('view-inquiries');
    this.statusFilter = 'all';
    this.consultantFilter = 'all';
    this.searchQuery = '';
    this.selectedInquiry = null;
  }

  render() {
    if (!this.container) return;

    const inquiries = store.getInquiries();

    // Contadores para KPIs
    const totalCount = inquiries.length;
    const pendingCount = inquiries.filter(i => (i.status || 'pendiente').toLowerCase() === 'pendiente').length;
    const answeredCount = inquiries.filter(i => (i.status || '').toLowerCase() === 'contestado').length;
    const deletedCount = inquiries.filter(i => (i.status || '').toLowerCase() === 'borrado').length;

    // Actualizar badge en sidebar si existe
    const sidebarBadge = document.getElementById('inquiriesPendingBadge');
    if (sidebarBadge) {
      sidebarBadge.innerText = pendingCount;
      sidebarBadge.style.display = pendingCount > 0 ? 'inline-block' : 'none';
    }

    // Filtrado
    const q = this.searchQuery.toLowerCase().trim();
    const filtered = inquiries.filter(item => {
      const status = (item.status || 'pendiente').toLowerCase();
      const consultantName = (item.assignedConsultantName || '').toLowerCase();

      const matchStatus = (this.statusFilter === 'all') || (status === this.statusFilter);
      const matchConsultant = (this.consultantFilter === 'all') || 
        (this.consultantFilter === 'javier' && consultantName.includes('javier')) ||
        (this.consultantFilter === 'daniel' && consultantName.includes('daniel'));

      const matchQuery = !q || 
        (item.id || '').toLowerCase().includes(q) ||
        (item.clientName || '').toLowerCase().includes(q) ||
        (item.clientCompany || '').toLowerCase().includes(q) ||
        (item.clientEmail || '').toLowerCase().includes(q) ||
        (item.clientPhone || '').toLowerCase().includes(q) ||
        (item.projectTopic || '').toLowerCase().includes(q) ||
        (item.clientMessage || '').toLowerCase().includes(q);

      return matchStatus && matchConsultant && matchQuery;
    });

    this.container.innerHTML = `
      <!-- KPI Cards Summary -->
      <div class="kpi-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 16px; margin-bottom: 24px;">
        
        <div class="kpi-card" style="padding: 16px 20px;">
          <div class="kpi-header">
            <span class="kpi-title">Total Consultas Showroom</span>
            <div class="kpi-icon blue">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </div>
          </div>
          <div class="kpi-value" style="font-size: 1.8rem; font-weight: 700; color: #f8fafc; margin-top: 6px;">${totalCount}</div>
          <div class="kpi-subtext" style="font-size: 0.78rem; color: var(--text-muted);">Tickets generados desde la web</div>
        </div>

        <div class="kpi-card" style="padding: 16px 20px; border-left: 4px solid #f59e0b;">
          <div class="kpi-header">
            <span class="kpi-title" style="color: #fbbf24;">Pendientes de Contacto</span>
            <div class="kpi-icon gold">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
          </div>
          <div class="kpi-value" style="font-size: 1.8rem; font-weight: 700; color: #fbbf24; margin-top: 6px;">${pendingCount}</div>
          <div class="kpi-subtext" style="font-size: 0.78rem; color: var(--text-muted);">Requieren llamada o dossier</div>
        </div>

        <div class="kpi-card" style="padding: 16px 20px; border-left: 4px solid #10b981;">
          <div class="kpi-header">
            <span class="kpi-title" style="color: #34d399;">Contestados / En Gestión</span>
            <div class="kpi-icon emerald">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
          </div>
          <div class="kpi-value" style="font-size: 1.8rem; font-weight: 700; color: #34d399; margin-top: 6px;">${answeredCount}</div>
          <div class="kpi-subtext" style="font-size: 0.78rem; color: var(--text-muted);">Atendidos por el consultor</div>
        </div>

        <div class="kpi-card" style="padding: 16px 20px; border-left: 4px solid #64748b;">
          <div class="kpi-header">
            <span class="kpi-title" style="color: #94a3b8;">Borrados / Archivados</span>
            <div class="kpi-icon purple">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </div>
          </div>
          <div class="kpi-value" style="font-size: 1.8rem; font-weight: 700; color: #94a3b8; margin-top: 6px;">${deletedCount}</div>
          <div class="kpi-subtext" style="font-size: 0.78rem; color: var(--text-muted);">Consultas descartadas</div>
        </div>

      </div>

      <!-- Main Card with Filter Bar & Table -->
      <div class="card">
        <div class="card-header" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px;">
          <div>
            <h3 style="display: flex; align-items: center; gap: 10px; margin: 0; font-size: 1.2rem; color: #fff;">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold-main)" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              Registro de Consultas y Tickets Únicos del Showroom Web
            </h3>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 4px; margin-bottom: 0;">
              Control de solicitudes de inversión, prospectos calificados y cambio de estado directo (Pendiente, Contestado, Borrado).
            </p>
          </div>

          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <button class="btn btn-secondary btn-sm" id="btnExportInquiriesCSV" title="Exportar listado a CSV / Excel">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Exportar CSV
            </button>
            <button class="btn btn-primary btn-sm" id="btnNewTestInquiry" title="Generar una consulta de prueba">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Simular Consulta
            </button>
          </div>
        </div>

        <!-- Filter Toolbar -->
        <div style="padding: 16px 20px; background: rgba(0, 0, 0, 0.2); border-bottom: 1px solid var(--border-color); display: flex; flex-wrap: wrap; gap: 12px; align-items: center; justify-content: space-between;">
          <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center; flex: 1 1 300px;">
            <!-- Text Search -->
            <div style="position: relative; min-width: 240px; flex: 1 1 auto;">
              <input type="text" id="inquiriesSearchInput" class="form-control" placeholder="Buscar por Ticket, Nombre, Empresa, Email o Proyecto..." value="${this.searchQuery}" style="width: 100%; padding: 8px 12px 8px 34px; border-radius: 6px; background: rgba(15, 23, 42, 0.6); border: 1px solid var(--border-color); color: #fff; font-size: 0.88rem;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="2" style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%);"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </div>

            <!-- Status Filter -->
            <div style="display: flex; align-items: center; gap: 6px;">
              <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600;">Estado:</label>
              <select id="inquiriesStatusSelect" class="form-control" style="padding: 7px 12px; border-radius: 6px; background: rgba(15, 23, 42, 0.6); border: 1px solid var(--border-color); color: #fff; font-size: 0.85rem;">
                <option value="all" ${this.statusFilter === 'all' ? 'selected' : ''}>Todos los Estados</option>
                <option value="pendiente" ${this.statusFilter === 'pendiente' ? 'selected' : ''}>🟡 Pendientes</option>
                <option value="contestado" ${this.statusFilter === 'contestado' ? 'selected' : ''}>🟢 Contestados</option>
                <option value="borrado" ${this.statusFilter === 'borrado' ? 'selected' : ''}>🔴 Borrados</option>
              </select>
            </div>

            <!-- Consultant Filter -->
            <div style="display: flex; align-items: center; gap: 6px;">
              <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600;">Consultor:</label>
              <select id="inquiriesConsultantSelect" class="form-control" style="padding: 7px 12px; border-radius: 6px; background: rgba(15, 23, 42, 0.6); border: 1px solid var(--border-color); color: #fff; font-size: 0.85rem;">
                <option value="all" ${this.consultantFilter === 'all' ? 'selected' : ''}>Todos los Consultores</option>
                <option value="javier" ${this.consultantFilter === 'javier' ? 'selected' : ''}>Javier Ignacio Diaz</option>
                <option value="daniel" ${this.consultantFilter === 'daniel' ? 'selected' : ''}>Daniel Gonzalez</option>
              </select>
            </div>
          </div>

          <div style="font-size: 0.85rem; color: var(--text-muted);">
            Mostrando <strong>${filtered.length}</strong> de <strong>${totalCount}</strong> tickets
          </div>
        </div>

        <!-- Inquiries Table -->
        <div class="table-responsive" style="overflow-x: auto;">
          <table class="data-table" style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.88rem;">
            <thead>
              <tr style="border-bottom: 1px solid var(--border-color); background: rgba(255, 255, 255, 0.02);">
                <th style="padding: 12px 16px; font-weight: 700; color: #94a3b8; width: 130px;">TICKET ÚNICO</th>
                <th style="padding: 12px 16px; font-weight: 700; color: #94a3b8; width: 140px;">FECHA Y HORA</th>
                <th style="padding: 12px 16px; font-weight: 700; color: #94a3b8;">INTERESADO / EMPRESA</th>
                <th style="padding: 12px 16px; font-weight: 700; color: #94a3b8;">PROYECTO SELECCIONADO</th>
                <th style="padding: 12px 16px; font-weight: 700; color: #94a3b8; width: 160px;">CONSULTOR</th>
                <th style="padding: 12px 16px; font-weight: 700; color: #94a3b8; width: 150px;">ESTADO</th>
                <th style="padding: 12px 16px; font-weight: 700; color: #94a3b8; text-align: right; width: 130px;">ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              ${filtered.length === 0 ? `
                <tr>
                  <td colspan="7" style="padding: 40px; text-align: center; color: var(--text-muted);">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom: 8px; opacity: 0.4;"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    <div>No se encontraron consultas con los filtros seleccionados.</div>
                  </td>
                </tr>
              ` : filtered.map(item => {
                const status = (item.status || 'pendiente').toLowerCase();
                let statusBadgeStyle = 'background: rgba(245, 158, 11, 0.15); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.4);';
                if (status === 'contestado') {
                  statusBadgeStyle = 'background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.4);';
                } else if (status === 'borrado') {
                  statusBadgeStyle = 'background: rgba(100, 116, 139, 0.15); color: #94a3b8; border: 1px solid rgba(100, 116, 139, 0.4);';
                }

                const isJavier = (item.assignedConsultantName || '').toLowerCase().includes('javier');

                return `
                  <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05); transition: background 0.2s ease;">
                    <td style="padding: 14px 16px; font-family: monospace; font-size: 0.85rem; font-weight: 700;">
                      <span style="background: rgba(226, 183, 20, 0.12); color: var(--gold-light, #fbbf24); padding: 4px 8px; border-radius: 4px; border: 1px solid rgba(226, 183, 20, 0.3);">
                        ${item.id}
                      </span>
                    </td>
                    <td style="padding: 14px 16px; font-size: 0.8rem; color: var(--text-muted); white-space: nowrap;">
                      ${item.dateFormatted || item.timestamp ? new Date(item.timestamp).toLocaleDateString('es-AR') : 'Reciente'}
                    </td>
                    <td style="padding: 14px 16px;">
                      <div style="font-weight: 600; color: #fff;">${item.clientName || 'Anónimo'}</div>
                      <div style="font-size: 0.78rem; color: var(--text-muted);">${item.clientCompany || 'Particular'}</div>
                      <div style="font-size: 0.78rem; color: #38bdf8; margin-top: 2px;">
                        <a href="mailto:${item.clientEmail}" style="color: #38bdf8; text-decoration: none;">${item.clientEmail}</a>
                        ${item.clientPhone ? ` &bull; <a href="https://wa.me/${(item.clientPhone || '').replace(/[^0-9]/g, '')}" target="_blank" style="color: #22c55e; text-decoration: none;">${item.clientPhone}</a>` : ''}
                      </div>
                    </td>
                    <td style="padding: 14px 16px; max-width: 280px;">
                      <div style="font-weight: 600; color: var(--gold-light, #fbbf24); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${item.projectTopic || ''}">
                        ${item.projectTopic || 'Consulta General'}
                      </div>
                      ${item.clientMessage ? `
                        <div style="font-size: 0.75rem; color: #94a3b8; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; margin-top: 2px;" title="${item.clientMessage}">
                          "${item.clientMessage}"
                        </div>
                      ` : ''}
                    </td>
                    <td style="padding: 14px 16px;">
                      <div style="display: flex; align-items: center; gap: 6px;">
                        <span style="width: 8px; height: 8px; border-radius: 50%; background: ${isJavier ? 'var(--blue-main, #38bdf8)' : 'var(--gold-main, #eab308)'};"></span>
                        <span style="font-weight: 600; font-size: 0.82rem; color: #f8fafc;">${item.assignedConsultantName || 'Equipo Directivo'}</span>
                      </div>
                    </td>
                    <td style="padding: 14px 16px;">
                      <!-- Selector Dinámico de Estado Directo (pendiente, contestado, borrado) -->
                      <select class="inquiry-status-changer" data-ticket-id="${item.id}" style="padding: 4px 8px; border-radius: 14px; font-size: 0.78rem; font-weight: 700; cursor: pointer; outline: none; ${statusBadgeStyle}">
                        <option value="pendiente" ${status === 'pendiente' ? 'selected' : ''}>🟡 Pendiente</option>
                        <option value="contestado" ${status === 'contestado' ? 'selected' : ''}>🟢 Contestado</option>
                        <option value="borrado" ${status === 'borrado' ? 'selected' : ''}>🔴 Borrado</option>
                      </select>
                    </td>
                    <td style="padding: 14px 16px; text-align: right; white-space: nowrap;">
                      <button type="button" class="btn btn-secondary btn-sm btn-view-inquiry" data-ticket-id="${item.id}" title="Ver detalle completo de la consulta" style="padding: 4px 8px;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                      </button>
                      <button type="button" class="btn btn-secondary btn-sm btn-delete-inquiry" data-ticket-id="${item.id}" title="Eliminar / Archivar" style="padding: 4px 8px; color: #ef4444;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                      </button>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Detail Modal HTML placeholder -->
      <div id="inquiryDetailModalOverlay" class="modal-overlay" style="display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.85); backdrop-filter: blur(6px); z-index: 10000; align-items: center; justify-content: center; padding: 20px;">
        <div id="inquiryDetailModalContent" style="background: var(--bg-surface, #0f172a); border: 1px solid var(--border-color, #334155); border-radius: 12px; width: 100%; max-width: 650px; max-height: 90vh; overflow-y: auto; padding: 24px; box-shadow: 0 25px 60px rgba(0,0,0,0.8);">
          <!-- Injected via JS -->
        </div>
      </div>
    `;

    this.attachEvents();
  }

  attachEvents() {
    // Search Input
    const searchInput = document.getElementById('inquiriesSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        this.render();
      });
    }

    // Status Filter
    const statusSelect = document.getElementById('inquiriesStatusSelect');
    if (statusSelect) {
      statusSelect.addEventListener('change', (e) => {
        this.statusFilter = e.target.value;
        this.render();
      });
    }

    // Consultant Filter
    const consultantSelect = document.getElementById('inquiriesConsultantSelect');
    if (consultantSelect) {
      consultantSelect.addEventListener('change', (e) => {
        this.consultantFilter = e.target.value;
        this.render();
      });
    }

    // Status Changers in Table
    document.querySelectorAll('.inquiry-status-changer').forEach(select => {
      select.addEventListener('change', (e) => {
        const ticketId = select.dataset.ticketId;
        const newStatus = select.value;
        store.updateInquiryStatus(ticketId, newStatus);
        this.showToast(`Estado del ticket ${ticketId} actualizado a "${newStatus}".`);
        this.render();
      });
    });

    // View Details Buttons
    document.querySelectorAll('.btn-view-inquiry').forEach(btn => {
      btn.addEventListener('click', () => {
        const ticketId = btn.dataset.ticketId;
        this.openDetailModal(ticketId);
      });
    });

    // Delete Buttons
    document.querySelectorAll('.btn-delete-inquiry').forEach(btn => {
      btn.addEventListener('click', () => {
        const ticketId = btn.dataset.ticketId;
        if (confirm(`¿Desea cambiar el estado del ticket ${ticketId} a "Borrado"?`)) {
          store.updateInquiryStatus(ticketId, 'borrado');
          this.showToast(`Ticket ${ticketId} marcado como borrado.`);
          this.render();
        }
      });
    });

    // Export CSV Button
    const btnExport = document.getElementById('btnExportInquiriesCSV');
    if (btnExport) {
      btnExport.addEventListener('click', () => this.exportCSV());
    }

    // New Test Inquiry Button
    const btnSimulate = document.getElementById('btnNewTestInquiry');
    if (btnSimulate) {
      btnSimulate.addEventListener('click', () => this.simulateInquiry());
    }
  }

  openDetailModal(ticketId) {
    const inquiries = store.getInquiries();
    const item = inquiries.find(i => i.id === ticketId);
    if (!item) return;

    const overlay = document.getElementById('inquiryDetailModalOverlay');
    const content = document.getElementById('inquiryDetailModalContent');
    if (!overlay || !content) return;

    const cleanPhone = (item.clientPhone || '').replace(/[^0-9]/g, '');

    content.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 14px;">
        <div>
          <span style="background: rgba(226, 183, 20, 0.15); color: var(--gold-light, #fbbf24); font-weight: 700; font-size: 0.8rem; padding: 4px 10px; border-radius: 12px; border: 1px solid rgba(226, 183, 20, 0.3);">
            ${item.id}
          </span>
          <h2 style="margin: 8px 0 0 0; font-size: 1.3rem; color: #fff;">Detalle de Consulta Showroom</h2>
          <span style="font-size: 0.8rem; color: var(--text-muted);">${item.dateFormatted || item.timestamp}</span>
        </div>
        <button type="button" id="btnCloseInquiryDetail" style="background: transparent; border: 1px solid var(--border-color); color: var(--text-muted); width: 32px; height: 32px; border-radius: 50%; font-size: 1.1rem; cursor: pointer;">
          &times;
        </button>
      </div>

      <!-- Datos del Inversor -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 20px; background: rgba(255,255,255,0.02); padding: 16px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05);">
        <div>
          <span style="font-size: 0.75rem; text-transform: uppercase; color: #94a3b8; font-weight: 700;">Interesado / Inversor</span>
          <div style="font-size: 0.95rem; font-weight: 700; color: #fff; margin-top: 2px;">${item.clientName}</div>
          <div style="font-size: 0.82rem; color: var(--text-muted);">${item.clientCompany || 'No especificada'}</div>
        </div>

        <div>
          <span style="font-size: 0.75rem; text-transform: uppercase; color: #94a3b8; font-weight: 700;">Contacto Directo</span>
          <div style="font-size: 0.85rem; color: #38bdf8; margin-top: 2px;">
            <a href="mailto:${item.clientEmail}" style="color: #38bdf8; text-decoration: underline;">${item.clientEmail}</a>
          </div>
          <div style="font-size: 0.85rem; color: #22c55e; margin-top: 2px;">
            <a href="https://wa.me/${cleanPhone}" target="_blank" style="color: #22c55e; text-decoration: underline;">${item.clientPhone}</a>
          </div>
        </div>
      </div>

      <!-- Proyecto de Interés -->
      <div style="margin-bottom: 20px;">
        <span style="font-size: 0.75rem; text-transform: uppercase; color: #94a3b8; font-weight: 700;">Proyecto o Temática Consultada</span>
        <div style="font-size: 1.05rem; font-weight: 700; color: var(--gold-light, #fbbf24); margin-top: 4px; padding: 10px 14px; background: rgba(226, 183, 20, 0.08); border-radius: 6px; border-left: 3px solid var(--gold-main, #eab308);">
          ${item.projectTopic}
        </div>
      </div>

      <!-- Mensaje Completo del Interesado -->
      <div style="margin-bottom: 20px;">
        <span style="font-size: 0.75rem; text-transform: uppercase; color: #94a3b8; font-weight: 700;">Mensaje / Requerimiento Específico</span>
        <div style="margin-top: 6px; padding: 14px; background: rgba(0,0,0,0.3); border-radius: 8px; border: 1px solid rgba(255,255,255,0.06); color: #cbd5e1; font-size: 0.9rem; line-height: 1.6; white-space: pre-wrap;">${item.clientMessage || 'El interesado no agregó un mensaje adicional; solicita contacto y ficha técnica.'}</div>
      </div>

      <!-- Consultor Asignado & Estado -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 24px;">
        <div style="background: rgba(255,255,255,0.02); padding: 12px 14px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05);">
          <span style="font-size: 0.75rem; text-transform: uppercase; color: #94a3b8; font-weight: 700;">Consultor Especialista Asignado</span>
          <div style="font-size: 0.92rem; font-weight: 700; color: #fff; margin-top: 2px;">${item.assignedConsultantName}</div>
          <div style="font-size: 0.78rem; color: var(--text-muted);">${item.assignedConsultantEmail}</div>
        </div>

        <div style="background: rgba(255,255,255,0.02); padding: 12px 14px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05);">
          <span style="font-size: 0.75rem; text-transform: uppercase; color: #94a3b8; font-weight: 700;">Cambiar Estado</span>
          <div style="margin-top: 6px;">
            <select id="modalStatusSelect" style="width: 100%; padding: 6px 10px; border-radius: 6px; background: rgba(15, 23, 42, 0.8); border: 1px solid var(--border-color); color: #fff; font-size: 0.85rem; font-weight: 600;">
              <option value="pendiente" ${item.status === 'pendiente' ? 'selected' : ''}>🟡 Pendiente</option>
              <option value="contestado" ${item.status === 'contestado' ? 'selected' : ''}>🟢 Contestado</option>
              <option value="borrado" ${item.status === 'borrado' ? 'selected' : ''}>🔴 Borrado</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Acciones de Respuesta Rápida -->
      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        ${cleanPhone ? `
          <a href="https://wa.me/${cleanPhone}?text=Hola%20${encodeURIComponent(item.clientName)}%2C%20le%20escribo%20de%20Energy%20CPY%20respecto%20a%20su%20consulta%20por%20${encodeURIComponent(item.projectTopic)}" target="_blank" class="btn btn-sm" style="background: #22c55e; color: #fff; display: inline-flex; align-items: center; gap: 6px; text-decoration: none;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            Contactar por WhatsApp
          </a>
        ` : ''}

        <a href="mailto:${item.clientEmail}?subject=Respuesta%20a%20su%20consulta%20en%20Showroom%20Energy%20CPY%20-%20${encodeURIComponent(item.projectTopic)}" class="btn btn-secondary btn-sm" style="display: inline-flex; align-items: center; gap: 6px; text-decoration: none;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          Responder por Email
        </a>

        <button type="button" id="btnMarkAnswered" class="btn btn-primary btn-sm" style="display: inline-flex; align-items: center; gap: 6px; margin-left: auto;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
          Marcar como Contestado
        </button>
      </div>
    `;

    overlay.style.display = 'flex';

    // Close Modal Event
    const closeBtn = document.getElementById('btnCloseInquiryDetail');
    if (closeBtn) {
      closeBtn.onclick = () => { overlay.style.display = 'none'; };
    }
    overlay.onclick = (e) => {
      if (e.target === overlay) overlay.style.display = 'none';
    };

    // Modal Status Selector Change
    const modalStatus = document.getElementById('modalStatusSelect');
    if (modalStatus) {
      modalStatus.onchange = (e) => {
        store.updateInquiryStatus(item.id, e.target.value);
        this.showToast(`Estado de ${item.id} cambiado a "${e.target.value}".`);
        this.render();
      };
    }

    // Mark as Answered button
    const btnMark = document.getElementById('btnMarkAnswered');
    if (btnMark) {
      btnMark.onclick = () => {
        store.updateInquiryStatus(item.id, 'contestado');
        this.showToast(`Ticket ${item.id} marcado como "Contestado".`);
        overlay.style.display = 'none';
        this.render();
      };
    }
  }

  simulateInquiry() {
    const sampleProjects = [
      "Parque Solar Sol de los Cuatro Vientos 300 MW (USD 300M)",
      "Proyecto 6.6 Pesca Industrial Gran Escala Patagonia (USD 310M Venta)",
      "Oferta de Refineria y explotacion de pozos - La Pampa Argentina (USD 180M)",
      "Proyecto Pozo Salta — Infraestructura & Secado de Cuttings (USD 1.860M Flexible)",
      "Proyecto Minero Diente Verde Oro & Cobre (USD 60M)"
    ];
    const sampleNames = ["Carlos Benítez", "Mariana Rossi", "Andrés Villalba", "Lucas Méndez"];
    const sampleCompanies = ["Fondo Inversor Austral", "Soluciones Energéticas SA", "Patagonia Capital", "LatAm Infrastructure Partners"];

    const chosenProj = sampleProjects[Math.floor(Math.random() * sampleProjects.length)];
    const chosenName = sampleNames[Math.floor(Math.random() * sampleNames.length)];
    const chosenCompany = sampleCompanies[Math.floor(Math.random() * sampleCompanies.length)];
    const isJavier = chosenProj.includes("Solar") || chosenProj.includes("Minero");

    const newTicket = {
      id: "ECPY-" + Date.now().toString(36).toUpperCase(),
      timestamp: new Date().toISOString(),
      dateFormatted: new Date().toLocaleString('es-AR'),
      clientName: chosenName,
      clientCompany: chosenCompany,
      clientEmail: chosenName.toLowerCase().replace(' ', '.') + "@" + chosenCompany.toLowerCase().replace(/[^a-z]/g, '') + ".com",
      clientPhone: "+54 9 11 " + Math.floor(1000 + Math.random() * 9000) + "-" + Math.floor(1000 + Math.random() * 9000),
      projectTopic: chosenProj,
      clientMessage: "Solicito enviar ficha técnica, estructura de capital propuesta y disponibilidad para coordinar reunión ejecutiva.",
      assignedConsultantName: isJavier ? "Javier Ignacio Diaz" : "Daniel Gonzalez",
      assignedConsultantEmail: isJavier ? "areasostenible.consultorespyme@gmail.com" : "gonzalezmarcelo2105ypf@gmail.com",
      assignedConsultantPhone: isJavier ? "+54 9 351 2064791" : "+54 9 2974 23-3028",
      senderAccount: "inventario.energycpy@gmail.com",
      status: "pendiente"
    };

    store.addInquiry(newTicket);
    this.showToast(`Nueva consulta simulada generada: ${newTicket.id}`);
    this.render();
  }

  exportCSV() {
    const inquiries = store.getInquiries();
    if (!inquiries || inquiries.length === 0) {
      alert("No hay consultas registradas para exportar.");
      return;
    }

    const headers = ["Ticket ID", "Fecha", "Interesado", "Empresa", "Email", "Teléfono", "Proyecto", "Mensaje", "Consultor Asignado", "Estado"];
    const rows = inquiries.map(i => [
      i.id,
      i.dateFormatted || i.timestamp,
      `"${(i.clientName || '').replace(/"/g, '""')}"`,
      `"${(i.clientCompany || '').replace(/"/g, '""')}"`,
      i.clientEmail,
      i.clientPhone,
      `"${(i.projectTopic || '').replace(/"/g, '""')}"`,
      `"${(i.clientMessage || '').replace(/"/g, '""')}"`,
      `"${(i.assignedConsultantName || '').replace(/"/g, '""')}"`,
      i.status || 'pendiente'
    ]);

    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Consultas_Showroom_EnergyCPY_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  showToast(message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast success';
    toast.style.cssText = 'background: rgba(15, 23, 42, 0.95); border: 1px solid var(--gold-main); color: #fff; padding: 12px 18px; border-radius: 8px; margin-top: 10px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); font-size: 0.88rem; display: flex; align-items: center; gap: 8px;';
    toast.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold-main)" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> ${message}`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.4s ease';
      setTimeout(() => toast.remove(), 400);
    }, 3000);
  }
}
