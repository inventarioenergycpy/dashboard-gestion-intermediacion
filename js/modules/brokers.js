/**
 * DASHBOARD DE GESTIÓN DE INTERMEDIACIÓN FINANCIERA
 * Módulo de Directorio de Dueños Directos, Brokers y Fondos (Control de Vigencias)
 */

import { store } from '../store.js';

export class BrokersModule {
  constructor() {
    this.container = document.getElementById('view-interlocutors');
    this.typeFilter = 'all';
    this.statusTrafficFilter = 'all';
    this.searchTerm = '';
  }

  setTrafficFilter(traffic) {
    this.statusTrafficFilter = traffic || 'all';
    this.render();
  }

  render() {
    if (!this.container) return;

    const interlocutors = store.getInterlocutors();
    const settings = store.getSettings();
    const today = new Date();

    const filtered = interlocutors.filter(item => {
      const matchSearch = (item.name || '').toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                          (item.company || '').toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                          (item.contractSigned || '').toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchType = this.typeFilter === 'all' || item.type === this.typeFilter;

      let matchTraffic = true;
      if (this.statusTrafficFilter !== 'all' && item.expirationDate) {
        const exp = new Date(item.expirationDate);
        const diffTime = exp.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (this.statusTrafficFilter === 'red') {
          matchTraffic = diffDays < 0;
        } else if (this.statusTrafficFilter === 'yellow') {
          matchTraffic = diffDays >= 0 && diffDays <= (settings.alertDaysWarning || 30);
        } else if (this.statusTrafficFilter === 'green') {
          matchTraffic = diffDays > (settings.alertDaysWarning || 30);
        }
      }

      return matchSearch && matchType && matchTraffic;
    });

    this.container.innerHTML = `
      <div class="card">
        <div class="card-header">
          <div>
            <h3>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--purple-main)" stroke-width="2"><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
              Directorio de Dueños Directos, Brokers y Fondos
            </h3>
            <p style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">
              Supervisión de acuerdos firmados, fechas límites de renovación, períodos de cola (Tail Periods) y enlaces a Google Drive.
            </p>
          </div>
          <button class="btn btn-primary" id="btnNewInterlocutor">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Nuevo Contacto / Broker
          </button>
        </div>

        <div class="card-body">
          <!-- Filtros -->
          <div class="filter-bar">
            <div class="search-input-group">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" id="interlocutorSearchInput" placeholder="Buscar por nombre, empresa o contrato..." value="${this.searchTerm}">
            </div>

            <div class="filter-selects">
              <select id="interlocutorTypeFilter" class="form-select">
                <option value="all" ${this.typeFilter === 'all' ? 'selected' : ''}>Todos los Tipos</option>
                <option value="dueño_directo" ${this.typeFilter === 'dueño_directo' ? 'selected' : ''}>Dueño Directo (Sell-side N1)</option>
                <option value="consultora_mandato" ${this.typeFilter === 'consultora_mandato' ? 'selected' : ''}>Consultora con Mandato (Sell-side N2)</option>
                <option value="broker_sellside" ${this.typeFilter === 'broker_sellside' ? 'selected' : ''}>Broker Sell-side (Oportunidades)</option>
                <option value="broker_buyside" ${this.typeFilter === 'broker_buyside' ? 'selected' : ''}>Broker Buy-side (Vinculado a Fondos)</option>
                <option value="fondo_directo" ${this.typeFilter === 'fondo_directo' ? 'selected' : ''}>Fondo de Inversión Institucional</option>
              </select>

              <select id="interlocutorTrafficFilter" class="form-select">
                <option value="all" ${this.statusTrafficFilter === 'all' ? 'selected' : ''}>Todas las Vigencias</option>
                <option value="red" ${this.statusTrafficFilter === 'red' ? 'selected' : ''}>🔴 Vencidos</option>
                <option value="yellow" ${this.statusTrafficFilter === 'yellow' ? 'selected' : ''}>🟡 Por Vencer (&lt;30 días)</option>
                <option value="green" ${this.statusTrafficFilter === 'green' ? 'selected' : ''}>🟢 Vigentes</option>
              </select>
            </div>
          </div>

          <!-- Tabla de Contactos -->
          ${filtered.length === 0 ? `
            <div style="padding: 40px; text-align: center; color: var(--text-muted); font-size: 14px;">
              No se encontraron registros con los filtros actuales.
            </div>
          ` : `
            <div class="table-responsive">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Interlocutor / Empresa</th>
                    <th>Clasificación</th>
                    <th>Contrato Firmado</th>
                    <th>Vigencia & Vencimiento</th>
                    <th>Tail Period</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  ${filtered.map(item => {
                    let badgeClass = 'green';
                    let badgeText = 'Vigente';
                    
                    if (item.expirationDate) {
                      const exp = new Date(item.expirationDate);
                      const diffTime = exp.getTime() - today.getTime();
                      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                      if (diffDays < 0) {
                        badgeClass = 'red';
                        badgeText = `Vencido (${Math.abs(diffDays)}d)`;
                      } else if (diffDays <= (settings.alertDaysWarning || 30)) {
                        badgeClass = 'yellow';
                        badgeText = `Vence en ${diffDays}d`;
                      } else {
                        badgeClass = 'green';
                        badgeText = `Vigente (${diffDays}d)`;
                      }
                    }

                    return `
                      <tr>
                        <td>
                          <strong style="color: var(--text-main); font-size: 13px;">${item.name}</strong><br>
                          <span style="font-size: 11px; color: var(--text-muted);">${item.company || 'Particular'} &bull; ${item.email || ''}</span>
                        </td>
                        <td>
                          <span style="font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: var(--radius-sm); background: var(--bg-surface); border: 1px solid var(--border-color); text-transform: capitalize;">
                            ${(item.type || '').replace(/_/g, ' ')}
                          </span>
                        </td>
                        <td>
                          <span style="font-size: 12px; color: var(--gold-light); font-weight: 500;">${item.contractSigned || 'Sin contrato'}</span><br>
                          <span style="font-size: 11px; color: var(--text-muted);">Firmado: ${item.signatureDate || 'N/D'}</span>
                        </td>
                        <td>
                          <span class="traffic-pill ${badgeClass}" style="display: inline-flex; font-size: 11px; padding: 2px 8px; margin-bottom: 2px;">
                            <span class="dot"></span>
                            ${badgeText}
                          </span><br>
                          <span style="font-size: 11px; color: var(--text-muted);">Límite: ${item.expirationDate || 'Sin vencimiento'}</span>
                        </td>
                        <td>
                          <span style="font-size: 12px; font-weight: 600; color: var(--blue-main);">
                            ${item.tailPeriodMonths ? `${item.tailPeriodMonths} meses` : 'N/A'}
                          </span>
                        </td>
                        <td>
                          <div style="display: flex; align-items: center; gap: 6px;">
                            <a href="${item.driveDocUrl || 'https://drive.google.com'}" target="_blank" class="btn btn-drive btn-sm" title="Ver documento en Google Drive">
                              Drive
                            </a>
                            <button class="btn btn-secondary btn-sm btn-edit-inter" data-id="${item.id}" title="Editar">
                              Editar
                            </button>
                            <button class="btn btn-danger btn-sm btn-delete-inter" data-id="${item.id}" title="Eliminar">
                              &times;
                            </button>
                          </div>
                        </td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>
          `}
        </div>
      </div>
    `;

    this.attachEvents();
  }

  attachEvents() {
    const searchInput = document.getElementById('interlocutorSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchTerm = e.target.value;
        this.render();
      });
    }

    const typeFilter = document.getElementById('interlocutorTypeFilter');
    if (typeFilter) {
      typeFilter.addEventListener('change', (e) => {
        this.typeFilter = e.target.value;
        this.render();
      });
    }

    const trafficFilter = document.getElementById('interlocutorTrafficFilter');
    if (trafficFilter) {
      trafficFilter.addEventListener('change', (e) => {
        this.statusTrafficFilter = e.target.value;
        this.render();
      });
    }

    const newBtn = document.getElementById('btnNewInterlocutor');
    if (newBtn) {
      newBtn.addEventListener('click', () => {
        this.showInterlocutorModal();
      });
    }

    this.container.querySelectorAll('.btn-edit-inter').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        const item = store.getInterlocutor(id);
        if (item) this.showInterlocutorModal(item);
      });
    });

    this.container.querySelectorAll('.btn-delete-inter').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        if (confirm('¿Eliminar este interlocutor del directorio?')) {
          store.deleteInterlocutor(id);
          window.dispatchEvent(new CustomEvent('data-updated'));
        }
      });
    });
  }

  showInterlocutorModal(item = null) {
    const isEdit = !!item;

    const modalHTML = `
      <div class="modal-backdrop active" id="interModalBackdrop">
        <div class="modal-dialog modal-lg">
          <div class="modal-header">
            <h3>${isEdit ? 'Editar Contacto / Broker / Titular' : 'Nuevo Contacto / Broker / Titular'}</h3>
            <button class="btn-close-modal" id="btnCloseInterModal">&times;</button>
          </div>
          <div class="modal-body">
            <form id="interForm">
              <div class="form-grid-2">
                <div class="form-group">
                  <label>Nombre y Apellido *</label>
                  <input type="text" id="inpInterName" class="form-input" required value="${item ? item.name : ''}" placeholder="Ej. Dr. Roberto Salcedo">
                </div>

                <div class="form-group">
                  <label>Empresa / Organización</label>
                  <input type="text" id="inpInterCompany" class="form-input" value="${item ? item.company : ''}" placeholder="Ej. Salta Solar Energy S.A.">
                </div>
              </div>

              <div class="form-grid-2">
                <div class="form-group">
                  <label>Clasificación del Interlocutor *</label>
                  <select id="inpInterType" class="form-select">
                    <option value="dueño_directo" ${item && item.type === 'dueño_directo' ? 'selected' : ''}>Dueño Directo (Sell-side Nivel 1)</option>
                    <option value="consultora_mandato" ${item && item.type === 'consultora_mandato' ? 'selected' : ''}>Consultora con Mandato Directo (Sell-side Nivel 2)</option>
                    <option value="consultora_puente" ${item && item.type === 'consultora_puente' ? 'selected' : ''}>Consultora Puente / Cadena Larga (Sell-side Nivel 3)</option>
                    <option value="fondo_directo" ${item && item.type === 'fondo_directo' ? 'selected' : ''}>Fondo de Inversión Institucional (Buy-side Nivel 1)</option>
                    <option value="broker_buyside" ${item && item.type === 'broker_buyside' ? 'selected' : ''}>Broker Vinculado a Fondos (Buy-side Nivel 2/3)</option>
                    <option value="broker_sellside" ${item && item.type === 'broker_sellside' ? 'selected' : ''}>Broker que Presenta Oportunidades (Sell-side)</option>
                  </select>
                </div>

                <div class="form-group">
                  <label>Contrato Legal Firmado *</label>
                  <input type="text" id="inpInterContract" class="form-input" required value="${item ? item.contractSigned : 'Mandato de Intermediación con Overprice'}" placeholder="Ej. Mandato de Venta / Co-Brokering / NDA">
                </div>
              </div>

              <div class="form-grid-2">
                <div class="form-group">
                  <label>Fecha de Firma</label>
                  <input type="date" id="inpInterSigDate" class="form-input" value="${item ? item.signatureDate : new Date().toISOString().split('T')[0]}">
                </div>

                <div class="form-group">
                  <label>Fecha Límite de Vencimiento / Renovación *</label>
                  <input type="date" id="inpInterExpDate" class="form-input" required value="${item ? item.expirationDate : ''}">
                </div>
              </div>

              <div class="form-grid-2">
                <div class="form-group">
                  <label>Período de Cola / Tail Period (Meses)</label>
                  <input type="number" id="inpInterTail" class="form-input" value="${item ? item.tailPeriodMonths : 24}" placeholder="24">
                </div>

                <div class="form-group">
                  <label>Enlace al Documento Firmado en Google Drive</label>
                  <input type="url" id="inpInterDrive" class="form-input" value="${item ? item.driveDocUrl : 'https://drive.google.com/file/d/'}" placeholder="https://drive.google.com/file/d/...">
                </div>
              </div>

              <div class="form-grid-2">
                <div class="form-group">
                  <label>Correo Electrónico</label>
                  <input type="email" id="inpInterEmail" class="form-input" value="${item ? item.email : ''}" placeholder="contacto@empresa.com">
                </div>

                <div class="form-group">
                  <label>Teléfono / WhatsApp</label>
                  <input type="text" id="inpInterPhone" class="form-input" value="${item ? item.phone : ''}" placeholder="+54 9 11 ...">
                </div>
              </div>

              <div class="form-group full-width">
                <label>Notas, Cláusulas Especiales u Observaciones</label>
                <textarea id="inpInterNotes" class="form-textarea" rows="2" placeholder="Porcentaje pactado, honorario de introducción, cláusula penal acordada...">${item ? item.notes : ''}</textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" id="btnCancelInter">Cancelar</button>
            <button class="btn btn-primary" id="btnSaveInter">${isEdit ? 'Guardar Cambios' : 'Registrar Contacto'}</button>
          </div>
        </div>
      </div>
    `;

    const existing = document.getElementById('interModalBackdrop');
    if (existing) existing.remove();

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const backdrop = document.getElementById('interModalBackdrop');
    const closeBtn = document.getElementById('btnCloseInterModal');
    const cancelBtn = document.getElementById('btnCancelInter');
    const saveBtn = document.getElementById('btnSaveInter');

    const closeModal = () => backdrop.remove();
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);

    saveBtn.addEventListener('click', () => {
      const name = document.getElementById('inpInterName').value.trim();
      const company = document.getElementById('inpInterCompany').value.trim();
      const type = document.getElementById('inpInterType').value;
      const contractSigned = document.getElementById('inpInterContract').value.trim();
      const signatureDate = document.getElementById('inpInterSigDate').value;
      const expirationDate = document.getElementById('inpInterExpDate').value;
      const tailPeriodMonths = Number(document.getElementById('inpInterTail').value) || 0;
      const driveDocUrl = document.getElementById('inpInterDrive').value.trim();
      const email = document.getElementById('inpInterEmail').value.trim();
      const phone = document.getElementById('inpInterPhone').value.trim();
      const notes = document.getElementById('inpInterNotes').value.trim();

      if (!name || !contractSigned || !expirationDate) {
        alert('Por favor complete los campos obligatorios (*)');
        return;
      }

      const interData = {
        name,
        company,
        type,
        contractSigned,
        signatureDate,
        expirationDate,
        tailPeriodMonths,
        driveDocUrl: driveDocUrl || 'https://drive.google.com',
        email,
        phone,
        notes
      };

      if (isEdit) {
        store.updateInterlocutor(item.id, interData);
      } else {
        interData.id = 'inter_' + Date.now();
        store.addInterlocutor(interData);
      }

      closeModal();
      window.dispatchEvent(new CustomEvent('data-updated'));
    });
  }
}
