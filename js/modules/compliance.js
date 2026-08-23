/**
 * DASHBOARD DE GESTIÓN DE INTERMEDIACIÓN FINANCIERA
 * Módulo de Matriz Legal & Estrategia Documental en 3 Capas
 */

import { DOC_TEMPLATES } from '../templates/doc-templates.js';

export class ComplianceModule {
  constructor() {
    this.container = document.getElementById('view-compliance');
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="card">
        <div class="card-header">
          <div>
            <h3>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--emerald-main)" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              Estrategia Documental para Intermediación Financiera en 3 Capas
            </h3>
            <p style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">
              Protocolo legal para evitar circunvenciones, asegurar el cobro de honorarios/overprice y mantener trazabilidad probatoria total.
            </p>
          </div>
          <a href="https://drive.google.com" target="_blank" class="btn btn-drive">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>
            Bóveda de Modelos en Google Drive
          </a>
        </div>

        <div class="card-body">
          <!-- Grilla de las 3 Capas -->
          <div class="grid-3" style="margin-bottom: 28px;">
            <div class="card" style="border: 1px solid rgba(56, 189, 248, 0.3); background: var(--bg-surface);">
              <div class="card-header" style="background: rgba(56, 189, 248, 0.1);">
                <h4 style="font-size: 14px; color: var(--blue-main);">1. Protección & Confidencialidad</h4>
              </div>
              <div class="card-body" style="font-size: 12px; color: var(--text-muted);">
                <p style="margin-bottom: 8px;"><strong>Momento:</strong> Antes de revelar datos sensibles, ubicaciones exactas o nombres de sociedades.</p>
                <ul style="padding-left: 18px; line-height: 1.6;">
                  <li><strong>NDA Bilateral</strong> con Fondos e Inversores Institucionales.</li>
                  <li><strong>NCNDA Bilateral Estricto</strong> con consultoras y brokers.</li>
                  <li><strong>Teaser Ciego (Blind Teaser)</strong> sin información deducible.</li>
                </ul>
              </div>
            </div>

            <div class="card" style="border: 1px solid rgba(245, 158, 11, 0.3); background: var(--bg-surface);">
              <div class="card-header" style="background: rgba(245, 158, 11, 0.1);">
                <h4 style="font-size: 14px; color: var(--gold-light);">2. Mandatos & Honorarios</h4>
              </div>
              <div class="card-body" style="font-size: 12px; color: var(--text-muted);">
                <p style="margin-bottom: 8px;"><strong>Momento:</strong> Antes de presentar formalmente a las partes o abrir el Info Memo.</p>
                <ul style="padding-left: 18px; line-height: 1.6;">
                  <li><strong>Mandato de Venta con Overprice</strong> y Tail Period (12-24 meses) con Dueño Directo.</li>
                  <li><strong>Acuerdo de Co-Brokering + Fee Sharing</strong> (50/50 o sobreprecio) con consultoras.</li>
                  <li><strong>MFPA</strong> con brokers externos del fondo.</li>
                </ul>
              </div>
            </div>

            <div class="card" style="border: 1px solid rgba(16, 185, 129, 0.3); background: var(--bg-surface);">
              <div class="card-header" style="background: rgba(16, 185, 129, 0.1);">
                <h4 style="font-size: 14px; color: var(--emerald-main);">3. Registro & Trazabilidad</h4>
              </div>
              <div class="card-body" style="font-size: 12px; color: var(--text-muted);">
                <p style="margin-bottom: 8px;"><strong>Momento:</strong> Al momento exacto de presentar un proyecto o inversor concreto.</p>
                <ul style="padding-left: 18px; line-height: 1.6;">
                  <li><strong>Carta de Registro (Deal Log)</strong> formal con acuse de recibo y fecha cierta.</li>
                  <li><strong>Anexo Económico por Operación</strong> (Deal Specific Addendum) fijando montos.</li>
                  <li><strong>Minutas de Reunión</strong> registradas en el Dashboard.</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Guía Interactiva de Plantillas y Cláusulas -->
          <div class="card" style="background: var(--bg-surface);">
            <div class="card-header">
              <h4 style="font-size: 15px; color: var(--text-main);">
                📖 Modelos de Contratos y Cláusulas Blindadas
              </h4>
              <span style="font-size: 12px; color: var(--text-muted);">Selecciona un documento para ver sus cláusulas clave</span>
            </div>
            <div class="card-body">
              <div class="grid-2">
                ${Object.values(DOC_TEMPLATES).map(tmpl => `
                  <div class="accordion-item" style="background: var(--bg-card);">
                    <div class="accordion-header" style="cursor: default;">
                      <div>
                        <strong style="color: var(--gold-light);">${tmpl.title}</strong><br>
                        <span style="font-size: 11px; color: var(--text-muted);">${tmpl.layer} &bull; ${tmpl.target}</span>
                      </div>
                    </div>
                    <div class="accordion-body">
                      <p style="margin-bottom: 12px; color: var(--text-main); font-size: 12px;">
                        ${tmpl.summary}
                      </p>
                      ${tmpl.clauses.map(c => `
                        <div style="background: var(--bg-input); padding: 10px; border-radius: var(--radius-sm); border: 1px solid var(--border-color); margin-bottom: 8px;">
                          <span style="font-size: 11px; font-weight: 700; color: var(--blue-main); text-transform: uppercase;">
                            ${c.name}
                          </span>
                          <p style="font-size: 12px; color: var(--text-muted); margin-top: 4px; font-family: monospace;">
                            "${c.text}"
                          </p>
                        </div>
                      `).join('')}
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
