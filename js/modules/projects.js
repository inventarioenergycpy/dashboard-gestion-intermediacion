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
}
