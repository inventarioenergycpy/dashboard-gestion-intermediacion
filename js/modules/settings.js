/**
 * DASHBOARD DE GESTIÓN DE INTERMEDIACIÓN FINANCIERA
 * Módulo de Configuración, Administración de Estados y Respaldo de Datos
 */

import { store } from '../store.js';

export class SettingsModule {
  constructor() {
    this.container = document.getElementById('view-settings');
  }

  render() {
    if (!this.container) return;

    const statuses = store.getStatuses();
    const settings = store.getSettings();
    const users = store.getUsers();

    this.container.innerHTML = `
      <div class="grid-2">
        <!-- Panel 1: Configuración de Estados de Proyectos -->
        <div class="card">
          <div class="card-header">
            <div>
              <h3>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold-main)" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
                Configuración de Estados de Proyectos
              </h3>
              <p style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">
                Personaliza los estados del ciclo de vida de los proyectos, añade nuevos o modifica sus colores.
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

        <!-- Panel 2: Parámetros del Sistema y Usuarios Autorizados -->
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

        <!-- Panel 3: Copias de Seguridad y Respaldo Total -->
        <div class="card full-width" style="grid-column: span 2;">
          <div class="card-header">
            <h3>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--emerald-main)" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Copia de Seguridad y Restauración de Base de Datos
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
    // Cambio de color de estado
    this.container.querySelectorAll('.status-color-picker').forEach(picker => {
      picker.addEventListener('change', (e) => {
        const id = e.target.dataset.id;
        store.updateStatus(id, { color: e.target.value });
        window.dispatchEvent(new CustomEvent('data-updated'));
      });
    });

    // Eliminar estado
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

    // Agregar nuevo estado
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

    // Guardar Parámetros de Alerta
    const saveSysBtn = document.getElementById('btnSaveSystemSettings');
    if (saveSysBtn) {
      saveSysBtn.addEventListener('click', () => {
        const days = Number(document.getElementById('inpAlertDays').value) || 30;
        store.updateSettings({ alertDaysWarning: days });
        alert('Parámetros guardados con éxito.');
        window.dispatchEvent(new CustomEvent('data-updated'));
      });
    }

    // Exportar JSON
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

    // Importar JSON
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

    // Restablecer valores
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
