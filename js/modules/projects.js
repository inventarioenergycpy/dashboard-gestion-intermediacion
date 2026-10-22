/**
 * DASHBOARD DE GESTIÓN DE INTERMEDIACIÓN FINANCIERA
 * Módulo de Gestión y Administración de Proyectos de Inversión
 */

import { store } from '../store.js';
import { TemplateManager } from './templateManager.js';
import { smartImporter } from './smartImporter.js';

export class ProjectsModule {
  constructor() {
    this.container = document.getElementById('view-projects');
    this.searchTerm = '';
    this.statusFilter = 'all';
    this.sectorFilter = 'all';
    this.currentOnePagerProjectId = null;
    this.currentOnePagerLang = 'es';
    window.projectsModuleInstance = this;
    this.initOnePagerGlobalEvents();
  }

  render() {
    if (!this.container) return;

    const projects = store.getProjects();
    const statuses = store.getStatuses();
    const interlocutors = store.getInterlocutors();
    
    // Obtener sectores únicos
    const sectors = [...new Set(projects.map(p => p.sector).filter(Boolean))];

    // Filtrar proyectos
    const filtered = projects.filter(p => {
      const matchSearch = (p.title || '').toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                          (p.description || '').toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                          (p.ownerName || '').toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchStatus = this.statusFilter === 'all' || p.status === this.statusFilter;
      const matchSector = this.sectorFilter === 'all' || p.sector === this.sectorFilter;
      return matchSearch && matchStatus && matchSector;
    });

    this.container.innerHTML = `
      <div class="card">
        <div class="card-header">
          <div>
            <h3>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold-main)" stroke-width="2"><path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/></svg>
              Cartera de Proyectos de Inversión
            </h3>
            <p style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">
              Administración de oportunidades de inversión, titulares, precios base y metas de overprice protegidas.
            </p>
          </div>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <button class="btn btn-secondary btn-sm" id="btnProjectsDownloadTemplate" title="Descargar plantilla Excel oficial">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Plantilla Excel
            </button>
            <label class="btn btn-secondary btn-sm" style="cursor: pointer; display: inline-flex; align-items: center; gap: 6px;" title="Cargar archivo Excel/CSV con Diff y validación">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              Importar Excel
              <input type="file" id="inpProjectsImportExcel" accept=".xlsx, .xls, .csv" style="display: none;">
            </label>
            <button class="btn btn-primary btn-sm" id="btnNewProject">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Nuevo Proyecto
            </button>
          </div>
        </div>

        <div class="card-body">
          <!-- Barra de Filtros -->
          <div class="filter-bar">
            <div class="search-input-group">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" id="projectSearchInput" placeholder="Buscar por nombre, sector o titular..." value="${this.searchTerm}">
            </div>

            <div class="filter-selects">
              <select id="projectStatusFilter" class="form-select">
                <option value="all">Todos los Estados</option>
                ${statuses.map(s => `<option value="${s.id}" ${this.statusFilter === s.id ? 'selected' : ''}>${s.label}</option>`).join('')}
              </select>

              <select id="projectSectorFilter" class="form-select">
                <option value="all">Todos los Sectores</option>
                ${sectors.map(sec => `<option value="${sec}" ${this.sectorFilter === sec ? 'selected' : ''}>${sec}</option>`).join('')}
              </select>
            </div>
          </div>

          <!-- Tabla de Proyectos -->
          ${filtered.length === 0 ? `
            <div style="padding: 40px; text-align: center; color: var(--text-muted); font-size: 14px;">
              No se encontraron proyectos con los filtros seleccionados.
            </div>
          ` : `
            <div class="table-responsive">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Proyecto</th>
                    <th>Sector</th>
                    <th>Titular / Origen</th>
                    <th>Precio Base</th>
                    <th>Overprice Proyectado</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  ${filtered.map(proj => {
                    const statusObj = statuses.find(s => s.id === proj.status) || { label: proj.status, color: '#94a3b8' };
                    return `
                      <tr>
                        <td style="max-width: 260px;">
                          <div style="font-weight: 700; color: var(--text-main); margin-bottom: 2px;">${proj.title}</div>
                          <div style="font-size: 11px; color: var(--text-muted); text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">
                            ${proj.description}
                          </div>
                        </td>
                        <td>
                          <span style="font-size: 12px; background: var(--bg-surface); padding: 3px 8px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
                            ${proj.sector}
                          </span>
                        </td>
                        <td>
                          <span style="font-weight: 600; font-size: 12px;">${proj.ownerName || 'Sin asignar'}</span><br>
                          <span style="font-size: 11px; color: var(--text-muted); text-transform: capitalize;">${(proj.ownerType || '').replace('_', ' ')}</span>
                        </td>
                        <td>
                          <strong style="color: var(--blue-main); font-size: 13px;">$${Number(proj.basePrice || 0).toLocaleString()} ${proj.currency}</strong>
                        </td>
                        <td>
                          <strong style="color: var(--emerald-main); font-size: 13px;">+$${Number(proj.overpriceTarget || 0).toLocaleString()} ${proj.currency}</strong>
                        </td>
                        <td>
                          <select class="form-select project-status-select" data-id="${proj.id}" style="padding: 3px 8px; font-size: 11px; font-weight: 600; color: ${statusObj.color}; border-color: ${statusObj.color};">
                            ${statuses.map(s => `<option value="${s.id}" ${s.id === proj.status ? 'selected' : ''}>${s.label}</option>`).join('')}
                          </select>
                        </td>
                        <td>
                          <div style="display: flex; align-items: center; gap: 6px;">
                            <button class="btn btn-sm btn-onepager-proj" data-id="${proj.id}" title="Ver Resumen Ejecutivo One-Pager (A4)" style="background: linear-gradient(135deg, var(--gold-main) 0%, #d97706 100%); color: #080d1a; font-weight: 700; border: none; display: inline-flex; align-items: center; gap: 4px; padding: 4px 8px; border-radius: 4px; cursor: pointer;">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                              One-Pager
                            </button>
                            <a href="${proj.driveFolderUrl || 'https://drive.google.com'}" target="_blank" class="btn btn-drive btn-sm" title="Abrir carpeta Google Drive">
                              Drive
                            </a>
                            <button class="btn btn-secondary btn-sm btn-edit-proj" data-id="${proj.id}" title="Editar Proyecto">
                              Editar
                            </button>
                            <button class="btn btn-danger btn-sm btn-delete-proj" data-id="${proj.id}" title="Eliminar">
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
    // Buscador
    const searchInput = document.getElementById('projectSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchTerm = e.target.value;
        this.render();
      });
    }

    // Filtro Estado
    const statusFilter = document.getElementById('projectStatusFilter');
    if (statusFilter) {
      statusFilter.addEventListener('change', (e) => {
        this.statusFilter = e.target.value;
        this.render();
      });
    }

    // Filtro Sector
    const sectorFilter = document.getElementById('projectSectorFilter');
    if (sectorFilter) {
      sectorFilter.addEventListener('change', (e) => {
        this.sectorFilter = e.target.value;
        this.render();
      });
    }

    // Descargar plantilla desde Proyectos
    const btnDownload = this.container.querySelector('#btnProjectsDownloadTemplate');
    if (btnDownload) {
      btnDownload.addEventListener('click', () => TemplateManager.downloadExcelTemplate());
    }

    // Importar Excel desde Proyectos
    const inpImport = this.container.querySelector('#inpProjectsImportExcel');
    if (inpImport) {
      inpImport.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          smartImporter.processFile(file);
          e.target.value = '';
        }
      });
    }

    // Botón Nuevo Proyecto
    const newBtn = document.getElementById('btnNewProject');
    if (newBtn) {
      newBtn.addEventListener('click', () => {
        this.showProjectModal();
      });
    }

    // Cambio rápido de estado
    this.container.querySelectorAll('.project-status-select').forEach(sel => {
      sel.addEventListener('change', (e) => {
        const id = e.target.dataset.id;
        const newStatus = e.target.value;
        store.updateProject(id, { status: newStatus });
        window.dispatchEvent(new CustomEvent('data-updated'));
      });
    });

    // Botón Ver One-Pager
    this.container.querySelectorAll('.btn-onepager-proj').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        this.openOnePager(id);
      });
    });

    // Botón Editar
    this.container.querySelectorAll('.btn-edit-proj').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        const proj = store.getProject(id);
        if (proj) {
          this.showProjectModal(proj);
        }
      });
    });

    // Botón Eliminar
    this.container.querySelectorAll('.btn-delete-proj').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        if (confirm('¿Estás seguro de eliminar este proyecto y todas sus gestiones asociadas?')) {
          store.deleteProject(id);
          window.dispatchEvent(new CustomEvent('data-updated'));
        }
      });
    });
  }

  showProjectModal(project = null) {
    const isEdit = !!project;
    const interlocutors = store.getInterlocutors();
    const statuses = store.getStatuses();

    const modalHTML = `
      <div class="modal-backdrop active" id="projectModalBackdrop">
        <div class="modal-dialog modal-lg">
          <div class="modal-header">
            <h3>${isEdit ? 'Editar Proyecto de Inversión' : 'Nuevo Proyecto de Inversión'}</h3>
            <button class="btn-close-modal" id="btnCloseProjectModal">&times;</button>
          </div>
          <div class="modal-body">
            <form id="projectForm">
              <div class="form-group full-width">
                <label>Nombre del Proyecto *</label>
                <input type="text" id="inpProjTitle" class="form-input" required value="${project ? project.title : ''}" placeholder="Ej. Parque Solar Fotovoltaico MATER 50 MW">
              </div>

              <div class="form-grid-2">
                <div class="form-group">
                  <label>Sector / Industria *</label>
                  <input type="text" id="inpProjSector" class="form-input" required value="${project ? project.sector : ''}" placeholder="Ej. Energía Renovable, Pesca, Logística">
                </div>

                <div class="form-group">
                  <label>Estado del Proyecto *</label>
                  <select id="inpProjStatus" class="form-select">
                    ${statuses.map(s => `<option value="${s.id}" ${project && project.status === s.id ? 'selected' : ''}>${s.label}</option>`).join('')}
                  </select>
                </div>
              </div>

              <div class="form-grid-2">
                <div class="form-group">
                  <label>Precio Neto Base Pretendido (USD) *</label>
                  <input type="number" id="inpProjBasePrice" class="form-input" required value="${project ? project.basePrice : ''}" placeholder="42000000">
                </div>

                <div class="form-group">
                  <label>Overprice / Honorario Proyectado (USD) *</label>
                  <input type="number" id="inpProjOverprice" class="form-input" required value="${project ? project.overpriceTarget : ''}" placeholder="2500000">
                </div>
              </div>

              <div class="form-grid-2">
                <div class="form-group">
                  <label>Titular / Originador Asociado *</label>
                  <select id="inpProjOwner" class="form-select">
                    <option value="">-- Seleccionar Interlocutor --</option>
                    ${interlocutors.map(i => `<option value="${i.id}" ${project && project.ownerId === i.id ? 'selected' : ''}>${i.name} (${i.company || 'Directo'}) - ${i.type}</option>`).join('')}
                  </select>
                </div>

                <div class="form-group">
                  <label>Carpeta Google Drive Oficial</label>
                  <input type="url" id="inpProjDrive" class="form-input" value="${project ? project.driveFolderUrl : 'https://drive.google.com/drive/u/0/folders/inventario-energycpy-'}" placeholder="https://drive.google.com/...">
                </div>
              </div>

              <div class="form-group full-width">
                <label>Descripción y Puntos Clave del Proyecto</label>
                <textarea id="inpProjDesc" class="form-textarea" rows="3" placeholder="Detalles de factibilidad, autorizaciones, contratos PPA o cuotas asociadas...">${project ? project.description : ''}</textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" id="btnCancelProject">Cancelar</button>
            <button class="btn btn-primary" id="btnSaveProject">${isEdit ? 'Guardar Cambios' : 'Crear Proyecto'}</button>
          </div>
        </div>
      </div>
    `;

    // Inyectar en body
    const existing = document.getElementById('projectModalBackdrop');
    if (existing) existing.remove();

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Eventos del modal
    const backdrop = document.getElementById('projectModalBackdrop');
    const closeBtn = document.getElementById('btnCloseProjectModal');
    const cancelBtn = document.getElementById('btnCancelProject');
    const saveBtn = document.getElementById('btnSaveProject');

    const closeModal = () => backdrop.remove();
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);

    saveBtn.addEventListener('click', () => {
      const title = document.getElementById('inpProjTitle').value.trim();
      const sector = document.getElementById('inpProjSector').value.trim();
      const status = document.getElementById('inpProjStatus').value;
      const basePrice = Number(document.getElementById('inpProjBasePrice').value) || 0;
      const overpriceTarget = Number(document.getElementById('inpProjOverprice').value) || 0;
      const ownerId = document.getElementById('inpProjOwner').value;
      const driveFolderUrl = document.getElementById('inpProjDrive').value.trim();
      const description = document.getElementById('inpProjDesc').value.trim();

      if (!title || !sector || !basePrice) {
        alert('Por favor complete los campos obligatorios (*)');
        return;
      }

      const ownerObj = interlocutors.find(i => i.id === ownerId);

      const projectData = {
        title,
        sector,
        status,
        basePrice,
        overpriceTarget,
        currency: 'USD',
        ownerId: ownerId || null,
        ownerName: ownerObj ? ownerObj.name : 'No asignado',
        ownerType: ownerObj ? ownerObj.type : 'dueño_directo',
        driveFolderUrl: driveFolderUrl || 'https://drive.google.com',
        description,
        createdAt: project ? project.createdAt : new Date().toISOString().split('T')[0]
      };

      if (isEdit) {
        store.updateProject(project.id, projectData);
      } else {
        projectData.id = 'proj_' + Date.now();
        store.addProject(projectData);
      }

      closeModal();
      window.dispatchEvent(new CustomEvent('data-updated'));
    });
  }

  // ==========================================================================
  // MÉTODOS DEL VISOR Y EXPORTADOR ONE-PAGER A4
  // ==========================================================================

  initOnePagerGlobalEvents() {
    if (this._onePagerEventsBound) return;
    this._onePagerEventsBound = true;

    document.addEventListener('DOMContentLoaded', () => {
      this._bindModalDOMElements();
    });
    // In case DOM is already loaded
    setTimeout(() => this._bindModalDOMElements(), 100);
  }

  _bindModalDOMElements() {
    const btnClose = document.getElementById('btnOnePagerClose');
    if (btnClose) {
      btnClose.onclick = () => this.closeOnePager();
    }
    const btnPrint = document.getElementById('btnOnePagerPrint');
    if (btnPrint) {
      btnPrint.onclick = () => this.printOnePager();
    }
    const btnEs = document.getElementById('btnOnePagerLangEs');
    if (btnEs) {
      btnEs.onclick = () => this.toggleOnePagerLang('es');
    }
    const btnEn = document.getElementById('btnOnePagerLangEn');
    if (btnEn) {
      btnEn.onclick = () => this.toggleOnePagerLang('en');
    }
    const modal = document.getElementById('onePagerModal');
    if (modal) {
      modal.onclick = (e) => {
        if (e.target === modal) this.closeOnePager();
      };
    }
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.closeOnePager();
    });
  }

  openOnePager(projectId, lang = 'es') {
    this.currentOnePagerProjectId = projectId;
    this.currentOnePagerLang = lang;

    const p = store.getProject(projectId);
    if (!p) {
      console.warn('Proyecto no encontrado:', projectId);
      return;
    }

    const modal = document.getElementById('onePagerModal');
    const container = document.getElementById('onePagerContent');
    if (!modal || !container) {
      console.warn('Elementos del modal One-Pager no encontrados en el DOM');
      return;
    }

    // Toggle active state on language buttons
    const btnEs = document.getElementById('btnOnePagerLangEs');
    const btnEn = document.getElementById('btnOnePagerLangEn');
    if (btnEs) btnEs.classList.toggle('active', lang === 'es');
    if (btnEn) btnEn.classList.toggle('active', lang === 'en');

    const isEn = (lang === 'en');
    const langData = (isEn && p.en) ? p.en : (p.es || {
      categoryTag: p.sector,
      title: p.title,
      location: 'Argentina',
      statusLabel: p.statusProgress || 'Activo en Cartera',
      description: p.description,
      thesis: p.description,
      highlights: [
        `Modalidad de Inversión: ${p.modality || 'Direct Deal'}`,
        `Horizonte de Recupero Estimado (ROI): ${p.roi || 'A convenir'}`,
        `Estado Operativo: ${p.statusProgress || 'En cartera'}`,
        `Estructuración y Mandato Protegido por ENERGY CPY`
      ],
      metrics: [
        { label: "Ticket Inversión", val: p.amountDisplay || `$${Number(p.basePrice || 0).toLocaleString()} USD`, color: "gold" },
        { label: "Modalidad", val: p.modality || "Direct Deal", color: "blue" },
        { label: "Plazo / ROI", val: p.roi || "A Definir", color: "emerald" },
        { label: "Gobernanza", val: "Bajo NDA / NCNDA", color: "rose" }
      ]
    });

    const CONSULTANTS = {
      javier: {
        name: "Javier Ignacio Díaz",
        role: "Director Ejecutivo & Consultor Principal",
        email: "areasostenible.consultorespyme@gmail.com",
        phone: "+54 9 351 2064791",
        wsp: "5493512064791",
        avatar: "J",
        specialty: "Energía Renovable, Minería, Agroindustria, Proyectos de Ingeniería y Foreign Desk"
      },
      daniel: {
        name: "Daniel González",
        role: "Consultor Senior & Negociaciones Estratégicas",
        email: "gonzalezmarcelo2105ypf@gmail.com",
        phone: "+54 9 2974 23-3028",
        wsp: "5492974233028",
        avatar: "D",
        specialty: "Petróleo & Gas, Refinerías, Hotelería, Pesca Industrial y Asesoramiento Financiero / REIT"
      }
    };

    const agentKey = p.assignedAgent || (p.ownerId === 'user_javier' ? 'javier' : 'daniel');
    const consultant = CONSULTANTS[agentKey] || CONSULTANTS.javier;

    const amountLabel = p.isPrivatePlacement
      ? (isEn ? "Exclusive Invitation Only" : "A Invitación Exclusiva")
      : (p.amountDisplay || `$${Number(p.basePrice || 0).toLocaleString()} USD`);

    const modalityLabel = p.modality || "Direct Deal";
    const roiLabel = p.roi || "N/A";
    const statusProg = p.statusProgress || (isEn ? "Active in Portfolio" : "Activo en Cartera");

    const highlightsHtml = (langData.highlights || []).map(h => `
      <li>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--gold-main)" stroke-width="2.5" style="flex-shrink:0; margin-top:3px;"><polyline points="20 6 9 17 4 12"/></svg>
        <span>${h}</span>
      </li>
    `).join('');

    const metricsHtml = (langData.metrics || []).map(m => {
      let colorStyle = 'var(--gold-main)';
      if (m.color === 'blue') colorStyle = 'var(--blue-main)';
      if (m.color === 'emerald') colorStyle = 'var(--emerald-main)';
      if (m.color === 'rose') colorStyle = 'var(--rose-main)';
      return `
        <div class="op-metric-box">
          <div class="op-metric-val" style="color: ${colorStyle};">${m.val}</div>
          <div class="op-metric-lbl">${m.label}</div>
        </div>
      `;
    }).join('');

    const refCode = `ECPY-${(p.id || 'PROJ').toUpperCase().replace(/[^A-Z0-9]/g, '-')}`;

    const wspSubject = isEn
      ? `Hello ${consultant.name}, I am contacting you regarding project: ${langData.title} (Ref: ${refCode}). Please provide further details.`
      : `Hola ${consultant.name}, me contacto por el proyecto: ${langData.title} (Ref: ${refCode}). Quisiera solicitar mayor información y condiciones.`;

    const mailSubject = isEn
      ? `Inquiry: ${langData.title} (${refCode})`
      : `Consulta de Inversión: ${langData.title} (${refCode})`;

    const mailBody = isEn
      ? `Dear ${consultant.name},

I am contacting you regarding the investment opportunity "${langData.title}" (Ref: ${refCode}).

Please let me know the procedure to access the full Dataroom under NDA.

Best regards.`
      : `Estimado ${consultant.name},

Me contacto con motivo del proyecto de inversión "${langData.title}" (Ref: ${refCode}).

Solicito el procedimiento para acceder al Dataroom oficial bajo acuerdo de confidencialidad.

Atentamente.`;

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(consultant.email)}&cc=${encodeURIComponent('inventario.energycpy@gmail.com,energycpy@gmail.com')}&su=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;

    container.innerHTML = `
      <!-- Header -->
      <div class="op-header">
        <div>
          <div class="op-brand-title">ENERGY CPY</div>
          <div class="op-brand-sub">Private Investment Advisory &bull; Deal Sourcing</div>
        </div>
        <div class="op-meta-box">
          <div class="op-ref-code">${refCode}</div>
          <div class="op-confidential-badge">${isEn ? 'Strictly Confidential &bull; Protected Deal' : 'Estricta Confidencialidad &bull; Trato Protegido'}</div>
        </div>
      </div>

      <!-- Title & Location -->
      <div class="op-title-section">
        <span class="op-tag-pill" style="background: rgba(245, 158, 11, 0.15); color: var(--gold-main); border: 1px solid rgba(245, 158, 11, 0.3);">
          ${langData.categoryTag || p.sector}
        </span>
        <h2 class="op-project-title">${langData.title || p.title}</h2>
        <div class="op-location">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline; margin-right:4px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
          ${langData.location || 'Argentina'}
        </div>
      </div>

      <!-- 4-item Deal Terms Bar -->
      <div class="op-deal-bar">
        <div class="op-deal-col">
          <span class="op-deal-lbl">${isEn ? 'Investment Ticket' : 'Ticket Inversión'}</span>
          <span class="op-deal-val" style="color: ${p.isPrivatePlacement ? 'var(--blue-main)' : 'var(--gold-main)'};">${amountLabel}</span>
        </div>
        <div class="op-deal-col">
          <span class="op-deal-lbl">${isEn ? 'Deal Modality' : 'Modalidad'}</span>
          <span class="op-deal-val" style="color: var(--blue-main);">${modalityLabel}</span>
        </div>
        <div class="op-deal-col">
          <span class="op-deal-lbl">${isEn ? 'Target Horizon / ROI' : 'Horizonte / ROI'}</span>
          <span class="op-deal-val" style="color: var(--emerald-main);">${roiLabel}</span>
        </div>
        <div class="op-deal-col">
          <span class="op-deal-lbl">${isEn ? 'Execution Status' : 'Estado de Gestión'}</span>
          <span class="op-deal-val" style="color: var(--text-main); font-size: 0.85rem;">${statusProg}</span>
        </div>
      </div>

      <!-- Body: Summary & Thesis -->
      <div class="op-body-grid">
        <div class="op-card-block">
          <div class="op-block-title">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            ${isEn ? 'Executive Overview' : 'Resumen Ejecutivo'}
          </div>
          <p class="op-desc-text">${langData.description || p.description}</p>
          ${langData.thesis ? `
            <div class="op-thesis-box">
              <strong>${isEn ? 'Strategic Thesis:' : 'Tesis Estratégica:'}</strong> ${langData.thesis}
            </div>
          ` : ''}
        </div>

        <div class="op-card-block">
          <div class="op-block-title">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
            ${isEn ? 'Core Highlights & Key Drivers' : 'Puntos Clave y Factores Críticos'}
          </div>
          <ul class="op-highlights-list">
            ${highlightsHtml}
          </ul>
        </div>
      </div>

      <!-- Metrics Grid -->
      <div class="op-metrics-grid">
        ${metricsHtml}
      </div>

      <!-- Consultant & Contact -->
      <div class="op-footer-box">
        <div class="op-consultant-info">
          <div class="op-consultant-avatar">${consultant.avatar}</div>
          <div>
            <div class="op-consultant-name">${consultant.name}</div>
            <div class="op-consultant-role">${consultant.role}</div>
            <div style="font-size: 10px; color: var(--text-muted);">${consultant.specialty}</div>
          </div>
        </div>
        <div class="op-consultant-links no-print">
          <a href="https://wa.me/${consultant.wsp}?text=${encodeURIComponent(wspSubject)}" target="_blank" class="btn btn-sm" style="background:#25D366; color:#080d1a; font-weight:700; border-radius:6px; padding:6px 12px; display:inline-flex; align-items:center; gap:6px; text-decoration:none;">
            WhatsApp
          </a>
          <a href="${gmailUrl}" target="_blank" class="btn btn-sm" style="background:var(--blue-main); color:#080d1a; font-weight:700; border-radius:6px; padding:6px 12px; display:inline-flex; align-items:center; gap:6px; text-decoration:none;">
            Gmail
          </a>
          <a href="${p.driveFolderUrl || 'https://drive.google.com'}" target="_blank" class="btn btn-sm btn-drive" style="background:var(--bg-card); color:var(--text-main); border:1px solid var(--border-color); border-radius:6px; padding:6px 12px; display:inline-flex; align-items:center; gap:6px; text-decoration:none;">
            Data Room
          </a>
        </div>
      </div>

      <div class="op-disclaimer" style="text-align: center; font-size: 10px; color: var(--text-muted); border-top: 1px solid var(--border-color); padding-top: 8px;">
        ${isEn 
          ? 'ENERGY CPY Argentina &bull; Private Placement & Sourcing Desk &bull; Strictly Confidential under NCNDA. All figures subject to final confirmation in formal Dataroom.' 
          : 'ENERGY CPY Argentina &bull; Mandato de Intermediación y Sourcing Privado &bull; Estricta Confidencialidad bajo NCNDA. Datos sujetos a confirmación formal en Dataroom.'}
      </div>
    `;

    modal.style.display = 'flex';
  }

  closeOnePager() {
    const modal = document.getElementById('onePagerModal');
    if (modal) modal.style.display = 'none';
  }

  printOnePager() {
    window.print();
  }

  toggleOnePagerLang(lang) {
    if (this.currentOnePagerProjectId) {
      this.openOnePager(this.currentOnePagerProjectId, lang);
    }
  }
}

