/**
 * DASHBOARD DE GESTIÓN DE INTERMEDIACIÓN FINANCIERA
 * Módulo de Sub-Gestiones y Pipeline por Fondos / Inversores
 */

import { store } from '../store.js';

export class DealsModule {
  constructor() {
    this.container = document.getElementById('view-deals');
    this.stageFilter = 'all';
    this.projectFilter = 'all';
  }

  render() {
    if (!this.container) return;

    const deals = store.getDeals();
    const projects = store.getProjects();
    const interlocutors = store.getInterlocutors();

    const stages = ['Contacto Inicial', 'Teaser Enviado', 'NDA Firmado', 'En Análisis', 'Due Diligence', 'Oferta Vinculante', 'Cierre'];

    const filtered = deals.filter(d => {
      const matchStage = this.stageFilter === 'all' || d.stage === this.stageFilter;
      const matchProject = this.projectFilter === 'all' || d.projectId === this.projectFilter;
      return matchStage && matchProject;
    });

    this.container.innerHTML = `
      <div class="card">
        <div class="card-header">
          <div>
            <h3>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--blue-main)" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
              Pipeline de Negociaciones y Sub-Gestiones por Fondo
            </h3>
            <p style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">
              Seguimiento multi-deal: presentaciones en paralelo de proyectos a Fondos e Inversores con control de gatekeeper legal.
            </p>
          </div>
          <button class="btn btn-primary" id="btnNewDeal">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Nueva Sub-Gestión
          </button>
        </div>

        <div class="card-body">
          <!-- Filtros de Sub-Gestiones -->
          <div class="filter-bar">
            <div class="filter-selects" style="width: 100%;">
              <select id="dealProjectFilter" class="form-select" style="min-width: 250px;">
                <option value="all">Todos los Proyectos</option>
                ${projects.map(p => `<option value="${p.id}" ${this.projectFilter === p.id ? 'selected' : ''}>${p.title}</option>`).join('')}
              </select>

              <select id="dealStageFilter" class="form-select">
                <option value="all">Todas las Etapas</option>
                ${stages.map(st => `<option value="${st}" ${this.stageFilter === st ? 'selected' : ''}>${st}</option>`).join('')}
              </select>
            </div>
          </div>

          <!-- Grilla de Tarjetas de Sub-Gestión -->
          ${filtered.length === 0 ? `
            <div style="padding: 40px; text-align: center; color: var(--text-muted); font-size: 14px;">
              No se encontraron gestiones activas con los filtros seleccionados.
            </div>
          ` : `
            <div style="display: flex; flex-direction: column; gap: 16px;">
              ${filtered.map(deal => {
                const checklist = deal.checklist || {};
                const missingLegal = !checklist.ndaSigned || !checklist.dealLogNotified || !checklist.mandateValid;
                
                return `
                  <div class="card" style="border: 1px solid ${missingLegal ? 'rgba(245, 158, 11, 0.4)' : 'rgba(16, 185, 129, 0.3)'}; background: var(--bg-surface);">
                    <div class="card-header" style="background: rgba(0,0,0,0.15);">
                      <div>
                        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 4px;">
                          <h4 style="font-size: 15px; font-weight: 700; color: var(--text-main);">${deal.targetName}</h4>
                          <span style="font-size: 11px; background: var(--bg-card); padding: 2px 8px; border-radius: var(--radius-sm); border: 1px solid var(--border-color); color: var(--gold-light);">
                            ${deal.targetType || 'Fondo de Inversión'}
                          </span>
                          <span style="font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: var(--radius-full); background: rgba(56, 189, 248, 0.15); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3);">
                            Etapa: ${deal.stage}
                          </span>
                        </div>
                        <p style="font-size: 12px; color: var(--text-muted);">
                          <strong>Proyecto:</strong> ${deal.projectTitle}
                        </p>
                      </div>
                      <div style="display: flex; align-items: center; gap: 8px;">
                        <a href="${deal.driveFolderUrl || 'https://drive.google.com'}" target="_blank" class="btn btn-drive btn-sm">
                          Drive Gestión
                        </a>
                        <button class="btn btn-secondary btn-sm btn-edit-deal" data-id="${deal.id}">
                          Editar
                        </button>
                        <button class="btn btn-danger btn-sm btn-delete-deal" data-id="${deal.id}">
                          &times;
                        </button>
                      </div>
                    </div>

                    <div class="card-body" style="padding: 16px 20px;">
                      <div class="grid-3" style="margin-bottom: 14px;">
                        <div>
                          <span style="font-size: 11px; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Objetivo de Negociación</span>
                          <p style="font-size: 12px; color: var(--text-main); margin-top: 2px;">${deal.objective}</p>
                        </div>
                        <div>
                          <span style="font-size: 11px; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Próxima Reunión / Hito</span>
                          <p style="font-size: 12px; color: var(--gold-light); font-weight: 600; margin-top: 2px;">
                            ${deal.meetingDate ? `📅 ${deal.meetingDate}` : 'Sin fecha fijada'}
                          </p>
                        </div>
                        <div>
                          <span style="font-size: 11px; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Fecha Límite de Control</span>
                          <p style="font-size: 12px; color: var(--blue-main); font-weight: 600; margin-top: 2px;">
                            ${deal.controlDate ? `⏰ ${deal.controlDate}` : 'Sin fecha'}
                          </p>
                        </div>
                      </div>

                      <!-- Checklist Gatekeeper Legal -->
                      <div class="compliance-box" style="margin-top: 8px;">
                        <div class="compliance-title">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                          Checklist de Protección Legal y Anti-Circunvención
                          ${missingLegal ? `
                            <span style="margin-left: auto; font-size: 11px; color: #fbbf24; font-weight: 600;">⚠️ Documentos pendientes para Data Room</span>
                          ` : `
                            <span style="margin-left: auto; font-size: 11px; color: #34d399; font-weight: 600;">✅ 100% Protegido Legalmente</span>
                          `}
                        </div>
                        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; font-size: 12px;">
                          <div style="display: flex; align-items: center; gap: 6px; color: ${checklist.ndaSigned ? '#34d399' : '#f87171'};">
                            ${checklist.ndaSigned ? '✅' : '❌'} <strong>NDA Bilateral Firmado</strong>
                          </div>
                          <div style="display: flex; align-items: center; gap: 6px; color: ${checklist.blindTeaserSent ? '#34d399' : '#94a3b8'};">
                            ${checklist.blindTeaserSent ? '✅' : '⚪'} Blind Teaser Enviado
                          </div>
                          <div style="display: flex; align-items: center; gap: 6px; color: ${checklist.infoMemoApproved ? '#34d399' : '#94a3b8'};">
                            ${checklist.infoMemoApproved ? '✅' : '⚪'} Info Memo / Cuaderno Venta
                          </div>
                          <div style="display: flex; align-items: center; gap: 6px; color: ${checklist.dealLogNotified ? '#34d399' : '#fbbf24'};">
                            ${checklist.dealLogNotified ? '✅' : '⚠️'} <strong>Carta de Registro Notificada</strong>
                          </div>
                          <div style="display: flex; align-items: center; gap: 6px; color: ${checklist.mandateValid ? '#34d399' : '#f87171'};">
                            ${checklist.mandateValid ? '✅' : '❌'} <strong>Mandato de Origen Vigente</strong>
                          </div>
                          <div style="display: flex; align-items: center; gap: 6px; color: ${checklist.feeProtectionConfirmed ? '#34d399' : '#94a3b8'};">
                            ${checklist.feeProtectionConfirmed ? '✅' : '⚪'} Anexo / MFPA de Honorarios
                          </div>
                        </div>
                      </div>

                      ${deal.observations ? `
                        <div style="margin-top: 10px; font-size: 12px; color: var(--text-muted); background: var(--bg-input); padding: 8px 12px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
                          <strong>Bitácora / Observaciones:</strong> ${deal.observations}
                        </div>
                      ` : ''}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          `}
        </div>
      </div>
    `;

    this.attachEvents();
  }

  attachEvents() {
    const projectFilter = document.getElementById('dealProjectFilter');
    if (projectFilter) {
      projectFilter.addEventListener('change', (e) => {
        this.projectFilter = e.target.value;
        this.render();
      });
    }

    const stageFilter = document.getElementById('dealStageFilter');
    if (stageFilter) {
      stageFilter.addEventListener('change', (e) => {
        this.stageFilter = e.target.value;
        this.render();
      });
    }

    const newBtn = document.getElementById('btnNewDeal');
    if (newBtn) {
      newBtn.addEventListener('click', () => {
        this.showDealModal();
      });
    }

    this.container.querySelectorAll('.btn-edit-deal').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        const deal = store.getDeal(id);
        if (deal) this.showDealModal(deal);
      });
    });

    this.container.querySelectorAll('.btn-delete-deal').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        if (confirm('¿Eliminar esta sub-gestión?')) {
          store.deleteDeal(id);
          window.dispatchEvent(new CustomEvent('data-updated'));
        }
      });
    });
  }

  showDealModal(deal = null) {
    const isEdit = !!deal;
    const projects = store.getProjects();
    const interlocutors = store.getInterlocutors();
    const stages = ['Contacto Inicial', 'Teaser Enviado', 'NDA Firmado', 'En Análisis', 'Due Diligence', 'Oferta Vinculante', 'Cierre'];

    const checklist = deal ? deal.checklist || {} : {
      ndaSigned: false,
      blindTeaserSent: false,
      infoMemoApproved: false,
      dealLogNotified: false,
      mandateValid: true,
      feeProtectionConfirmed: false
    };

    const modalHTML = `
      <div class="modal-backdrop active" id="dealModalBackdrop">
        <div class="modal-dialog modal-lg">
          <div class="modal-header">
            <h3>${isEdit ? 'Editar Sub-Gestión de Inversión' : 'Nueva Sub-Gestión / Presentación a Fondo'}</h3>
            <button class="btn-close-modal" id="btnCloseDealModal">&times;</button>
          </div>
          <div class="modal-body">
            <form id="dealForm">
              <div class="form-grid-2">
                <div class="form-group">
                  <label>Proyecto de Inversión *</label>
                  <select id="inpDealProject" class="form-select" required>
                    <option value="">-- Seleccionar Proyecto --</option>
                    ${projects.map(p => `<option value="${p.id}" ${deal && deal.projectId === p.id ? 'selected' : ''}>${p.title}</option>`).join('')}
                  </select>
                </div>

                <div class="form-group">
                  <label>Fondo o Broker Destinatario *</label>
                  <input type="text" id="inpDealTargetName" class="form-input" required value="${deal ? deal.targetName : ''}" placeholder="Ej. Green Infrastructure Fund UK">
                </div>
              </div>

              <div class="form-grid-2">
                <div class="form-group">
                  <label>Tipo de Interlocutor / Destinatario *</label>
                  <select id="inpDealTargetType" class="form-select">
                    <option value="Fondo Institucional Directo" ${deal && deal.targetType === 'Fondo Institucional Directo' ? 'selected' : ''}>Fondo Institucional Directo (Buy-side Nivel 1)</option>
                    <option value="Consultora Mandataria de Búsqueda" ${deal && deal.targetType === 'Consultora Mandataria de Búsqueda' ? 'selected' : ''}>Consultora Mandataria de Búsqueda (Buy-side Nivel 2)</option>
                    <option value="Broker Externo del Fondo" ${deal && deal.targetType === 'Broker Externo del Fondo' ? 'selected' : ''}>Broker Externo del Fondo (Buy-side Nivel 3)</option>
                    <option value="Inversor Privado / Family Office" ${deal && deal.targetType === 'Inversor Privado / Family Office' ? 'selected' : ''}>Inversor Privado / Family Office</option>
                  </select>
                </div>

                <div class="form-group">
                  <label>Etapa de la Negociación *</label>
                  <select id="inpDealStage" class="form-select">
                    ${stages.map(st => `<option value="${st}" ${deal && deal.stage === st ? 'selected' : ''}>${st}</option>`).join('')}
                  </select>
                </div>
              </div>

              <div class="form-grid-2">
                <div class="form-group">
                  <label>Fecha de Próxima Reunión</label>
                  <input type="date" id="inpDealMeetingDate" class="form-input" value="${deal ? deal.meetingDate : ''}">
                </div>

                <div class="form-group">
                  <label>Fecha Límite de Control / Seguimiento</label>
                  <input type="date" id="inpDealControlDate" class="form-input" value="${deal ? deal.controlDate : ''}">
                </div>
              </div>

              <div class="form-group full-width">
                <label>Objetivo Puntual de la Gestión *</label>
                <input type="text" id="inpDealObjective" class="form-input" required value="${deal ? deal.objective : ''}" placeholder="Ej. Presentación de Info Memo y confirmación de interés preliminar">
              </div>

              <!-- Gatekeeper Checkboxes -->
              <div class="compliance-box" style="margin-bottom: 16px;">
                <div class="compliance-title">
                  Verificación de Documentos Legales Obligatorios
                </div>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
                  <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; cursor: pointer;">
                    <input type="checkbox" id="chkNdaSigned" ${checklist.ndaSigned ? 'checked' : ''}>
                    NDA Bilateral Firmado con Fondo
                  </label>
                  <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; cursor: pointer;">
                    <input type="checkbox" id="chkBlindTeaser" ${checklist.blindTeaserSent ? 'checked' : ''}>
                    Blind Teaser Enviado
                  </label>
                  <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; cursor: pointer;">
                    <input type="checkbox" id="chkInfoMemo" ${checklist.infoMemoApproved ? 'checked' : ''}>
                    Cuaderno Venta / Info Memo Habilitado
                  </label>
                  <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; cursor: pointer;">
                    <input type="checkbox" id="chkDealLog" ${checklist.dealLogNotified ? 'checked' : ''}>
                    Carta de Registro Notificada (Deal Log)
                  </label>
                  <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; cursor: pointer;">
                    <input type="checkbox" id="chkMandateValid" ${checklist.mandateValid ? 'checked' : ''}>
                    Mandato de Venta / Overprice Vigente
                  </label>
                  <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; cursor: pointer;">
                    <input type="checkbox" id="chkFeeProtection" ${checklist.feeProtectionConfirmed ? 'checked' : ''}>
                    Anexo Económico / MFPA Confirmado
                  </label>
                </div>
              </div>

              <div class="form-grid-2">
                <div class="form-group">
                  <label>Carpeta Google Drive de la Gestión</label>
                  <input type="url" id="inpDealDrive" class="form-input" value="${deal ? deal.driveFolderUrl : 'https://drive.google.com/drive/u/0/folders/'}" placeholder="https://drive.google.com/...">
                </div>

                <div class="form-group">
                  <label>Fecha de Presentación Inicial</label>
                  <input type="date" id="inpDealPresDate" class="form-input" value="${deal ? deal.presentationDate : new Date().toISOString().split('T')[0]}">
                </div>
              </div>

              <div class="form-group full-width">
                <label>Bitácora de Negociaciones y Observaciones</label>
                <textarea id="inpDealObs" class="form-textarea" rows="3" placeholder="Comentarios de la última llamada, dudas planteadas por el inversor, ajustes solicitados...">${deal ? deal.observations : ''}</textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" id="btnCancelDeal">Cancelar</button>
            <button class="btn btn-primary" id="btnSaveDeal">${isEdit ? 'Guardar Cambios' : 'Registrar Sub-Gestión'}</button>
          </div>
        </div>
      </div>
    `;

    const existing = document.getElementById('dealModalBackdrop');
    if (existing) existing.remove();

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const backdrop = document.getElementById('dealModalBackdrop');
    const closeBtn = document.getElementById('btnCloseDealModal');
    const cancelBtn = document.getElementById('btnCancelDeal');
    const saveBtn = document.getElementById('btnSaveDeal');

    const closeModal = () => backdrop.remove();
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);

    saveBtn.addEventListener('click', () => {
      const projectId = document.getElementById('inpDealProject').value;
      const targetName = document.getElementById('inpDealTargetName').value.trim();
      const targetType = document.getElementById('inpDealTargetType').value;
      const stage = document.getElementById('inpDealStage').value;
      const meetingDate = document.getElementById('inpDealMeetingDate').value;
      const controlDate = document.getElementById('inpDealControlDate').value;
      const objective = document.getElementById('inpDealObjective').value.trim();
      const driveFolderUrl = document.getElementById('inpDealDrive').value.trim();
      const presentationDate = document.getElementById('inpDealPresDate').value;
      const observations = document.getElementById('inpDealObs').value.trim();

      const projObj = projects.find(p => p.id === projectId);

      if (!projectId || !targetName || !objective) {
        alert('Por favor complete los campos obligatorios (*)');
        return;
      }

      const dealData = {
        projectId,
        projectTitle: projObj ? projObj.title : 'Proyecto',
        targetName,
        targetType,
        stage,
        meetingDate,
        controlDate,
        objective,
        driveFolderUrl: driveFolderUrl || 'https://drive.google.com',
        presentationDate,
        observations,
        checklist: {
          ndaSigned: document.getElementById('chkNdaSigned').checked,
          blindTeaserSent: document.getElementById('chkBlindTeaser').checked,
          infoMemoApproved: document.getElementById('chkInfoMemo').checked,
          dealLogNotified: document.getElementById('chkDealLog').checked,
          mandateValid: document.getElementById('chkMandateValid').checked,
          feeProtectionConfirmed: document.getElementById('chkFeeProtection').checked
        },
        createdAt: deal ? deal.createdAt : new Date().toISOString().split('T')[0]
      };

      if (isEdit) {
        store.updateDeal(deal.id, dealData);
      } else {
        dealData.id = 'deal_' + Date.now();
        store.addDeal(dealData);
      }

      closeModal();
      window.dispatchEvent(new CustomEvent('data-updated'));
    });
  }
}
