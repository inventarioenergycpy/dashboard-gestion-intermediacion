/**
 * DASHBOARD DE GESTIÓN DE INTERMEDIACIÓN FINANCIERA
 * Módulo de Configuración, Plantillas Excel Dinámicas, Importador y Respaldo de Datos
 */

import { store } from '../store.js';
import { TemplateManager } from './templateManager.js';
import { smartImporter } from './smartImporter.js';

export class SettingsModule {
  constructor() {
    this.container = document.getElementById('view-settings');
  }

  render() {
    if (!this.container) return;

    const statuses = store.getStatuses();
    const settings = store.getSettings();
    const users = store.getUsers();
    const snapshots = store.getSnapshots();

    this.container.innerHTML = `
      <div class="grid-2">

        <!-- Panel 1: Gestor de Plantillas Excel Adaptables y Carga Masiva Inteligente -->
        <div class="card full-width" style="grid-column: span 2; border: 1px solid var(--gold-main); background: linear-gradient(180deg, rgba(245, 158, 11, 0.05) 0%, var(--bg-surface) 100%);">
          <div class="card-header">
            <div style="display: flex; align-items: center; gap: 12px;">
              <div class="modal-icon-badge" style="background: rgba(245, 158, 11, 0.15); color: var(--gold-main);">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
              </div>
              <div>
                <h3 style="font-size: 16px; color: var(--gold-light); margin: 0;">
                  Gestor de Plantillas Excel Adaptables & Cargas Masivas / Parciales
                </h3>
                <p style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">
                  Descarga la plantilla estructurada auto-adaptable a futuras mejoras del sistema, o sube tu archivo Excel/CSV para visualizar el <strong>Diff de Cambios</strong>, alertas de reemplazo y resguardo automático.
                </p>
              </div>
            </div>
          </div>

          <div class="card-body">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
              
              <!-- Opción A: Descarga Dinámica -->
              <div style="background: var(--bg-main); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 18px;">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                  <span style="font-size: 20px;">📥</span>
                  <strong style="color: var(--text-main); font-size: 14px;">1. Descargar Plantilla Excel (.xlsx)</strong>
                </div>
                <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 16px;">
                  Generada en tiempo real a partir del esquema vivo. Contiene 4 hojas: <strong>Proyectos</strong>, <strong>Interlocutores/Fondos</strong>, <strong>Sub-Gestiones/Deals</strong> y <strong>Guía de Validación</strong>.
                </p>
                <button class="btn btn-primary full-width" id="btnDownloadDynamicTemplate" style="font-weight: 700;">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  Descargar Plantilla Excel Oficial
                </button>
              </div>

              <!-- Opción B: Carga y Diff -->
              <div style="background: var(--bg-main); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 18px;">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                  <span style="font-size: 20px;">📤</span>
                  <strong style="color: var(--text-main); font-size: 14px;">2. Cargar Excel / CSV (con Diff & Rollback)</strong>
                </div>
                <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 16px;">
                  Analiza el archivo, detecta altas y modificaciones, resalta datos existentes a sobrescribir y te permite aprobar cargas parciales.
                </p>
                <label class="btn btn-secondary full-width" style="cursor: pointer; text-align: center; display: inline-flex; align-items: center; justify-content: center; gap: 8px; border-color: var(--blue-main); color: var(--blue-main);">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                  Subir Archivo para Análisis
                  <input type="file" id="inpUploadSmartExcel" accept=".xlsx, .xls, .csv" style="display: none;">
                </label>
              </div>

            </div>
          </div>
        </div>

        <!-- Panel 2: Configuración de Estados de Proyectos -->
        <div class="card">
          <div class="card-header">
            <div>
              <h3>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold-main)" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
                Configuración de Estados de Proyectos
              </h3>
              <p style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">
                Personaliza los estados del ciclo de vida de los proyectos o añade nuevos.
              </p>
            </div>
            <button class="btn btn-primary btn-sm" id="btnNewStatus">
              + Agregar Estado
            </button>
          </div>

          <div class="card-body">
            <div class="table-responsive">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Estado</th>
                    <th>Color</th>
                    <th>Descripción</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  ${statuses.map(st => `
                    <tr>
                      <td>
                        <span class="status-badge" style="background: ${st.color}22; color: ${st.color}; border: 1px solid ${st.color}55;">
                          ${st.label}
                        </span>
                      </td>
                      <td>
                        <input type="color" class="status-color-picker" data-id="${st.id}" value="${st.color}" style="border: none; width: 28px; height: 28px; background: transparent; cursor: pointer; border-radius: var(--radius-sm);">
                      </td>
                      <td>
                        <span style="font-size: 12px; color: var(--text-muted);">${st.description || 'Sin descripción'}</span>
                      </td>
                      <td>
                        <button class="btn btn-danger btn-sm btn-delete-status" data-id="${st.id}" ${['activo', 'suspendido', 'bloqueado_por_gestion', 'vendido'].includes(st.id) && statuses.length <= 4 ? 'disabled title="Estado base requerido"' : ''}>
                          &times;
                        </button>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Panel 3: Parámetros del Sistema y Usuarios Autorizados -->
        <div class="card">
          <div class="card-header">
            <h3>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--blue-main)" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              Parámetros de Alerta & Seguridad
            </h3>
          </div>
          <div class="card-body">
            <div class="form-group">
              <label>Días de Anticipación para Alerta de Vencimiento</label>
              <input type="number" id="inpAlertDays" class="form-input" value="${settings.alertDaysWarning || 30}" min="1" max="180">
              <span style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">
                Los contratos que venzan en un plazo menor a esta cantidad de días se mostrarán en amarillo (🟡).
              </span>
            </div>

            <div class="form-group" style="margin-top: 16px;">
              <label>Cuenta de Google Drive Oficial</label>
              <input type="email" class="form-input" readonly value="${settings.googleDriveEmail || 'inventario.energycpy@gmail.com'}" style="background: rgba(255,255,255,0.03); color: var(--text-muted);">
            </div>

            <div style="margin-top: 20px;">
              <label style="font-size: 12px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Usuarios Autorizados en el Sistema</label>
              <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 8px;">
                ${users.map(u => `
                  <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-md);">
                    <div>
                      <strong style="color: var(--text-main); font-size: 13px;">${u.name}</strong> (${u.email})
                    </div>
                    <span style="font-size: 11px; color: var(--gold-light); font-weight: 600;">${u.role}</span>
                  </div>
                `).join('')}
              </div>
            </div>

            <div style="margin-top: 20px;">
              <button class="btn btn-primary" id="btnSaveSystemSettings">Guardar Parámetros</button>
            </div>
          </div>
        </div>

        <!-- Panel 4: Historial de Snapshots & Puntos de Rollback -->
        <div class="card full-width" style="grid-column: span 2;">
          <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold-main)" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <div>
                <h3 style="margin: 0; font-size: 15px;">Historial de Snapshots y Puntos de Rollback</h3>
                <p style="font-size: 11px; color: var(--text-muted); margin: 2px 0 0 0;">Copias de seguridad automáticas previas a cada carga masiva o modificación.</p>
              </div>
            </div>
            <button class="btn btn-secondary btn-sm" id="btnCreateManualSnapshot">
              + Crear Snapshot Manual
            </button>
          </div>
          <div class="card-body">
            ${snapshots.length === 0 ? `
              <p style="font-size: 12px; color: var(--text-muted); text-align: center; padding: 20px;">No hay snapshots previos registrados aún.</p>
            ` : `
              <div class="table-responsive">
                <table class="data-table" style="font-size: 12px;">
                  <thead>
                    <tr>
                      <th>Fecha / Hora</th>
                      <th>Descripción</th>
                      <th>Usuario</th>
                      <th>Registros (P / I / D)</th>
                      <th>Acción de Rollback</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${snapshots.map(snap => `
                      <tr>
                        <td style="font-family: monospace; color: var(--text-main); white-space: nowrap;">
                          ${new Date(snap.timestamp).toLocaleString('es-AR')}
                        </td>
                        <td>
                          <strong style="color: var(--gold-light);">${snap.description}</strong>
                        </td>
                        <td>${snap.user}</td>
                        <td style="font-family: monospace;">
                          <span title="Proyectos" style="color: var(--blue-main);">${snap.stats.projectsCount}P</span> / 
                          <span title="Interlocutores" style="color: var(--gold-main);">${snap.stats.interlocutorsCount}I</span> / 
                          <span title="Deals" style="color: var(--emerald-main);">${snap.stats.dealsCount}D</span>
                        </td>
                        <td>
                          <div style="display: flex; gap: 8px;">
                            <button class="btn btn-secondary btn-sm btn-restore-snapshot" data-id="${snap.id}" style="font-size: 11px; border-color: var(--gold-main); color: var(--gold-main);">
                              Revertir a esta versión
                            </button>
                            <button class="btn btn-danger btn-sm btn-delete-snapshot" data-id="${snap.id}" title="Eliminar snapshot">
                              &times;
                            </button>
                          </div>
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            `}
          </div>
        </div>

        <!-- Panel 5: Copias de Seguridad JSON y Respaldo Total -->
        <div class="card full-width" style="grid-column: span 2;">
          <div class="card-header">
            <h3>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--emerald-main)" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Copia de Seguridad y Restauración de Base de Datos (JSON)
            </h3>
          </div>
          <div class="card-body">
            <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 16px;">
              Exporta la totalidad de los proyectos, acuerdos, sub-gestiones, minutas y configuraciones en formato JSON descargable, o restaura una copia de seguridad previa.
            </p>

            <div style="display: flex; align-items: center; gap: 14px; flex-wrap: wrap;">
              <button class="btn btn-primary" id="btnExportJSON">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Descargar Backup Completo (JSON)
              </button>

              <label class="btn btn-secondary" style="cursor: pointer;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                Importar Backup (JSON)
                <input type="file" id="inpImportJSON" accept=".json" style="display: none;">
              </label>

              <button class="btn btn-danger btn-sm" id="btnResetDefaults" style="margin-left: auto;">
                Restablecer Datos Semilla
              </button>
            </div>
          </div>
        </div>

      </div>
    `;

    this.attachEvents();
  }

  attachEvents() {
    // 1. Descargar Plantilla Dinámica Excel
    const btnDownloadTemplate = document.getElementById('btnDownloadDynamicTemplate');
    if (btnDownloadTemplate) {
      btnDownloadTemplate.addEventListener('click', () => {
        TemplateManager.downloadExcelTemplate();
      });
    }

    // 2. Subir Archivo Excel / CSV para Análisis y Diff
    const inpUploadSmartExcel = document.getElementById('inpUploadSmartExcel');
    if (inpUploadSmartExcel) {
      inpUploadSmartExcel.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          smartImporter.processFile(file);
          e.target.value = ''; // Resetear input
        }
      });
    }

    // 3. Crear Snapshot Manual
    const btnManualSnap = document.getElementById('btnCreateManualSnapshot');
    if (btnManualSnap) {
      btnManualSnap.addEventListener('click', () => {
        const desc = prompt('Descripción para este punto de restauración (Snapshot):', 'Respaldo manual');
        if (desc && desc.trim()) {
          store.createSnapshot(desc.trim());
          this.render();
          alert('Snapshot manual creado con éxito.');
        }
      });
    }

    // 4. Revertir a Snapshot
    this.container.querySelectorAll('.btn-restore-snapshot').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        if (confirm('¿Revertir todos los datos al estado de este snapshot? Se creará una copia de seguridad previa.')) {
          const ok = store.restoreSnapshot(id);
          if (ok) {
            alert('Base de datos revertida con éxito.');
            window.dispatchEvent(new CustomEvent('data-updated'));
          }
        }
      });
    });

    // 5. Eliminar Snapshot
    this.container.querySelectorAll('.btn-delete-snapshot').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        if (confirm('¿Eliminar este snapshot?')) {
          store.deleteSnapshot(id);
          this.render();
        }
      });
    });

    // 6. Cambio de color de estado
    this.container.querySelectorAll('.status-color-picker').forEach(picker => {
      picker.addEventListener('change', (e) => {
        const id = e.target.dataset.id;
        store.updateStatus(id, { color: e.target.value });
        window.dispatchEvent(new CustomEvent('data-updated'));
      });
    });

    // 7. Eliminar estado
    this.container.querySelectorAll('.btn-delete-status').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        if (confirm('¿Eliminar este estado?')) {
          store.deleteStatus(id);
          this.render();
          window.dispatchEvent(new CustomEvent('data-updated'));
        }
      });
    });

    // 8. Agregar nuevo estado
    const newStatusBtn = document.getElementById('btnNewStatus');
    if (newStatusBtn) {
      newStatusBtn.addEventListener('click', () => {
        const label = prompt('Nombre del nuevo estado (ej. "En Due Diligence", "Reservado"):');
        if (label && label.trim()) {
          const id = label.trim().toLowerCase().replace(/\s+/g, '_');
          store.addStatus({
            id,
            label: label.trim(),
            color: '#38bdf8',
            description: 'Estado personalizado creado por el usuario'
          });
          this.render();
          window.dispatchEvent(new CustomEvent('data-updated'));
        }
      });
    }

    // 9. Guardar Parámetros de Alerta
    const saveSysBtn = document.getElementById('btnSaveSystemSettings');
    if (saveSysBtn) {
      saveSysBtn.addEventListener('click', () => {
        const days = Number(document.getElementById('inpAlertDays').value) || 30;
        store.updateSettings({ alertDaysWarning: days });
        alert('Parámetros guardados con éxito.');
        window.dispatchEvent(new CustomEvent('data-updated'));
      });
    }

    // 10. Exportar JSON
    const exportBtn = document.getElementById('btnExportJSON');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        const jsonStr = store.exportBackupJSON();
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `backup_intermediacion_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
      });
    }

    // 11. Importar JSON
    const importInput = document.getElementById('inpImportJSON');
    if (importInput) {
      importInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const success = store.importBackupJSON(event.target.result);
            if (success) {
              alert('Copia de seguridad importada exitosamente.');
              window.dispatchEvent(new CustomEvent('data-updated'));
            } else {
              alert('Error al leer el archivo de copia de seguridad.');
            }
          };
          reader.readAsText(file);
        }
      });
    }

    // 12. Restablecer valores
    const resetBtn = document.getElementById('btnResetDefaults');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('¿Restablecer todos los datos a los valores de muestra iniciales? Se perderán las modificaciones locales no exportadas.')) {
          store.resetToDefaults();
          window.dispatchEvent(new CustomEvent('data-updated'));
        }
      });
    }
  }
}
