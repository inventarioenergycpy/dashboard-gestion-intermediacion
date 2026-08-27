/**
 * DASHBOARD DE GESTIÓN DE INTERMEDIACIÓN FINANCIERA
 * Módulo de Importación Inteligente con Diff Visual, Alertas de Reemplazo,
 * Cargas Parciales y Resguardo Automático con Rollback
 */

import { store } from '../store.js';

export class SmartImporter {
  constructor() {
    this.modal = document.getElementById('modalSmartImport');
    this.modalBody = document.getElementById('smartImportModalBody');
    this.statsSummary = document.getElementById('importStatsSummary');
    this.confirmBtn = document.getElementById('btnConfirmSmartImport');
    this.cancelBtn = document.getElementById('btnCancelSmartImport');
    this.closeBtn = document.getElementById('btnCloseSmartImportModal');
    
    this.currentDiff = null;
    this.initEvents();
  }

  initEvents() {
    if (this.closeBtn) this.closeBtn.addEventListener('click', () => this.closeModal());
    if (this.cancelBtn) this.cancelBtn.addEventListener('click', () => this.closeModal());
    if (this.confirmBtn) this.confirmBtn.addEventListener('click', () => this.executeImport());
  }

  openModal() {
    if (this.modal) {
      this.modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  }

  closeModal() {
    if (this.modal) {
      this.modal.style.display = 'none';
      document.body.style.overflow = '';
      this.currentDiff = null;
    }
  }

  /**
   * Procesa el archivo Excel/CSV subido por el usuario
   */
  processFile(file) {
    if (!file) return;

    if (typeof XLSX === 'undefined') {
      alert('Error: La biblioteca SheetJS no está disponible.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'binary', cellDates: true });
        const parsedData = this.parseWorkbook(workbook);
        const diffResult = this.runDiffEngine(parsedData);

        this.currentDiff = diffResult;
        this.renderDiffModal(diffResult);
        this.openModal();
      } catch (err) {
        console.error('Error al procesar el archivo Excel/CSV', err);
        alert('Error al leer el archivo. Asegúrate de que sea un archivo .xlsx o .csv válido basado en la plantilla oficial.');
      }
    };
    reader.readAsBinaryString(file);
  }

  /**
   * Parsea las hojas del libro de trabajo mapeándolas contra el esquema dinámico
   */
  parseWorkbook(wb) {
    const schema = store.getDynamicSchema();
    const result = {
      projects: [],
      interlocutors: [],
      deals: []
    };

    wb.SheetNames.forEach(sheetName => {
      const ws = wb.Sheets[sheetName];
      const rows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
      if (!rows || rows.length < 2) return;

      const headers = rows[0].map(h => String(h).trim());

      // Determinar qué entidad corresponde a esta hoja
      let targetEntity = null;
      if (sheetName.includes('PROYECTO') || headers.includes('ID_Proyecto') || headers.includes('Titulo_Proyecto')) {
        targetEntity = 'projects';
      } else if (sheetName.includes('INTERLOCUTOR') || sheetName.includes('FONDO') || headers.includes('ID_Interlocutor') || headers.includes('Empresa_o_Fondo')) {
        targetEntity = 'interlocutors';
      } else if (sheetName.includes('DEAL') || sheetName.includes('SUBGESTION') || headers.includes('ID_Deal') || headers.includes('ID_Proyecto_Asociado')) {
        targetEntity = 'deals';
      }

      if (!targetEntity) return;

      const entityFields = schema[targetEntity].fields;
      const dataRows = rows.slice(1);

      dataRows.forEach(row => {
        // Ignorar filas totalmente vacías o comentarios
        if (!row || row.length === 0 || !row.some(cell => cell !== '')) return;
        if (typeof row[0] === 'string' && (row[0].startsWith('#') || row[0].startsWith('GUÍA') || row[0].startsWith('REGLA'))) return;

        const record = {};
        entityFields.forEach(field => {
          const colIndex = headers.indexOf(field.label);
          if (colIndex !== -1 && row[colIndex] !== undefined) {
            let val = row[colIndex];
            
            // Normalización según tipo de dato
            if (field.type === 'number') {
              val = typeof val === 'number' ? val : parseFloat(String(val).replace(/[^0-9.-]/g, '')) || 0;
            } else if (field.type === 'boolean') {
              const strVal = String(val).trim().toUpperCase();
              val = ['SI', 'TRUE', '1', 'VERDADERO', 'S'].includes(strVal);
            } else if (field.type === 'date') {
              if (val instanceof Date) {
                val = val.toISOString().split('T')[0];
              } else if (typeof val === 'string' && val.trim()) {
                val = val.trim().substring(0, 10);
              } else {
                val = '';
              }
            } else {
              val = String(val).trim();
            }

            record[field.key] = val;
          }
        });

        // Validar que tenga al menos identificador o nombre clave
        if (record.id || record.title || record.company || record.objective) {
          result[targetEntity].push(record);
        }
      });
    });

    return result;
  }

  /**
   * Motor de Comparación y Detección de Cambios (Diff Engine)
   */
  runDiffEngine(parsedData) {
    const schema = store.getDynamicSchema();
    const result = {
      projects: { items: [], addCount: 0, updateCount: 0, unchangedCount: 0 },
      interlocutors: { items: [], addCount: 0, updateCount: 0, unchangedCount: 0 },
      deals: { items: [], addCount: 0, updateCount: 0, unchangedCount: 0 },
      totalAdd: 0,
      totalUpdate: 0,
      totalUnchanged: 0
    };

    ['projects', 'interlocutors', 'deals'].forEach(entityKey => {
      const existingItems = store[`get${entityKey.charAt(0).toUpperCase() + entityKey.slice(1)}`]();
      const newItems = parsedData[entityKey] || [];
      const entitySchema = schema[entityKey];

      newItems.forEach(item => {
        // Búsqueda de coincidencia existente por ID
        let match = existingItems.find(ex => ex.id === item.id);
        
        // Si no coincide por ID, buscar por clave secundaria unívoca
        if (!match) {
          if (entityKey === 'projects' && item.title) {
            match = existingItems.find(ex => ex.title.toLowerCase() === item.title.toLowerCase());
          } else if (entityKey === 'interlocutors' && (item.company || item.email)) {
            match = existingItems.find(ex => (item.email && ex.email === item.email) || (item.company && ex.company.toLowerCase() === item.company.toLowerCase()));
          } else if (entityKey === 'deals' && item.projectId && item.interlocutorId) {
            match = existingItems.find(ex => ex.projectId === item.projectId && ex.interlocutorId === item.interlocutorId);
          }
        }

        if (!match) {
          // Registro Nuevo (Alta)
          result[entityKey].items.push({
            action: 'ADD',
            id: item.id || `auto_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
            displayName: item.title || item.company || item.objective || item.id,
            newData: item,
            existingData: null,
            changes: []
          });
          result[entityKey].addCount++;
          result.totalAdd++;
        } else {
          // Registro Existente -> Evaluar cambios campo por campo
          const changes = [];
          entitySchema.fields.forEach(field => {
            if (field.key === 'id') return;
            const oldVal = match[field.key] !== undefined ? match[field.key] : (match.checklist ? match.checklist[field.key] : '');
            const newVal = item[field.key];

            // Comparar valores normalizados
            if (newVal !== undefined && newVal !== '' && String(oldVal) !== String(newVal)) {
              changes.push({
                key: field.key,
                label: field.label,
                oldValue: oldVal,
                newValue: newVal
              });
            }
          });

          if (changes.length > 0) {
            // Registro Modificado (Actualización con reemplazo)
            result[entityKey].items.push({
              action: 'UPDATE',
              id: match.id,
              displayName: match.title || match.company || match.objective || match.id,
              newData: { ...match, ...item, id: match.id },
              existingData: match,
              changes
            });
            result[entityKey].updateCount++;
            result.totalUpdate++;
          } else {
            // Sin Cambios
            result[entityKey].items.push({
              action: 'UNCHANGED',
              id: match.id,
              displayName: match.title || match.company || match.objective || match.id,
              newData: match,
              existingData: match,
              changes: []
            });
            result[entityKey].unchangedCount++;
            result.totalUnchanged++;
          }
        }
      });
    });

    return result;
  }

  /**
   * Renderiza la interfaz visual del Diff en el modal
   */
  renderDiffModal(diff) {
    if (!this.modalBody) return;

    const hasChanges = diff.totalAdd > 0 || diff.totalUpdate > 0;
    this.confirmBtn.disabled = !hasChanges;

    // Estadísticas
    this.statsSummary.innerHTML = `
      <span style="display: inline-flex; align-items: center; gap: 6px; font-weight: 600;">
        <span class="badge-tag" style="background: rgba(16, 185, 129, 0.2); color: var(--emerald-main);">+${diff.totalAdd} Nuevos</span>
        <span class="badge-tag" style="background: rgba(245, 158, 11, 0.2); color: var(--gold-main);">⚠️ ${diff.totalUpdate} Modificados</span>
        <span class="badge-tag" style="background: rgba(148, 163, 184, 0.15); color: var(--text-muted);">${diff.totalUnchanged} Sin Cambios</span>
      </span>
    `;

    if (!hasChanges && diff.totalUnchanged === 0) {
      this.modalBody.innerHTML = `
        <div style="text-align: center; padding: 40px 20px; color: var(--text-muted);">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin: 0 auto 12px; opacity: 0.5;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <h3 style="color: var(--text-main); font-size: 16px;">No se encontraron registros para procesar</h3>
          <p style="font-size: 13px; max-width: 480px; margin: 6px auto 0;">Verifica que el archivo contenga las hojas de la plantilla oficial y que las filas contengan datos válidos.</p>
        </div>
      `;
      return;
    }

    let html = `
      <div style="background: rgba(245, 158, 11, 0.08); border: 1px solid rgba(245, 158, 11, 0.25); border-radius: var(--radius-md); padding: 12px 16px; margin-bottom: 16px; display: flex; align-items: flex-start; gap: 12px;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold-main)" stroke-width="2" style="flex-shrink: 0; margin-top: 2px;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        <div>
          <strong style="color: var(--gold-light); font-size: 13px;">Resguardo Automático & Cargas Parciales Activas</strong>
          <p style="font-size: 12px; color: var(--text-muted); margin: 2px 0 0 0;">
            Antes de aplicar los cambios, el sistema generará un <strong>Snapshot de Respaldo</strong>. Puedes desmarcar las casillas para omitir cualquier registro que no desees importar.
          </p>
        </div>
      </div>
    `;

    const sections = [
      { key: 'projects', title: 'Proyectos de Inversión (Lado Oferta)', icon: '📁' },
      { key: 'interlocutors', title: 'Interlocutores, Fondos y Brokers (Oferta y Demanda)', icon: '👥' },
      { key: 'deals', title: 'Sub-Gestiones y Deals (Pipeline)', icon: '🤝' }
    ];

    sections.forEach(sec => {
      const group = diff[sec.key];
      if (group.items.length === 0) return;

      html += `
        <div class="diff-section-card" style="margin-bottom: 20px; background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); overflow: hidden;">
          <div style="background: rgba(255, 255, 255, 0.02); padding: 12px 16px; border-bottom: 1px solid var(--border-color); display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 16px;">${sec.icon}</span>
              <strong style="color: var(--text-main); font-size: 14px;">${sec.title}</strong>
              <span style="font-size: 11px; color: var(--text-muted);">(${group.items.length} detectados)</span>
            </div>
            <label style="font-size: 12px; color: var(--blue-main); cursor: pointer; display: flex; align-items: center; gap: 6px;">
              <input type="checkbox" class="toggle-section-checkbox" data-entity="${sec.key}" checked>
              Seleccionar Todos
            </label>
          </div>

          <div style="padding: 12px 16px; display: flex; flex-direction: column; gap: 10px;">
            ${group.items.map((item, idx) => `
              <div class="diff-row-card diff-action-${item.action.toLowerCase()}" style="background: var(--bg-main); border: 1px solid ${item.action === 'ADD' ? 'rgba(16, 185, 129, 0.3)' : item.action === 'UPDATE' ? 'rgba(245, 158, 11, 0.3)' : 'var(--border-color)'}; border-radius: var(--radius-md); padding: 10px 14px;">
                <div style="display: flex; align-items: center; justify-content: space-between; gap: 10px;">
                  <div style="display: flex; align-items: center; gap: 10px;">
                    <input type="checkbox" class="item-checkbox" data-entity="${sec.key}" data-index="${idx}" ${item.action !== 'UNCHANGED' ? 'checked' : ''}>
                    <span class="badge-tag" style="font-size: 10px; font-weight: 700; background: ${item.action === 'ADD' ? 'rgba(16, 185, 129, 0.2)' : item.action === 'UPDATE' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(148, 163, 184, 0.15)'}; color: ${item.action === 'ADD' ? 'var(--emerald-main)' : item.action === 'UPDATE' ? 'var(--gold-main)' : 'var(--text-muted)'};">
                      ${item.action === 'ADD' ? '+ NUEVO' : item.action === 'UPDATE' ? '⚠️ MODIFICADO' : 'SIN CAMBIOS'}
                    </span>
                    <strong style="font-size: 13px; color: var(--text-main);">${item.displayName}</strong>
                    <span style="font-size: 11px; color: var(--text-muted); font-family: monospace;">(${item.id})</span>
                  </div>
                </div>

                ${item.action === 'UPDATE' && item.changes.length > 0 ? `
                  <div style="margin-top: 10px; padding-top: 8px; border-top: 1px dashed rgba(245, 158, 11, 0.2);">
                    <div style="font-size: 11px; color: var(--gold-light); font-weight: 600; margin-bottom: 6px;">
                      ⚠️ Campos que serán sobrescritos:
                    </div>
                    <table class="diff-table" style="width: 100%; font-size: 11px; border-collapse: collapse;">
                      <thead>
                        <tr style="color: var(--text-muted); text-align: left;">
                          <th style="padding: 4px 6px; width: 30%;">Campo</th>
                          <th style="padding: 4px 6px; width: 35%; color: #f87171;">Valor Anterior (en BBDD)</th>
                          <th style="padding: 4px 6px; width: 35%; color: var(--emerald-main);">Nuevo Valor (desde Excel)</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${item.changes.map(ch => `
                          <tr style="border-top: 1px solid rgba(255,255,255,0.03);">
                            <td style="padding: 4px 6px; font-weight: 600; color: var(--text-main);">${ch.label}</td>
                            <td style="padding: 4px 6px; color: #fca5a5; font-family: monospace; background: rgba(239, 68, 68, 0.05);">${ch.oldValue !== '' ? ch.oldValue : '<em>(vacío)</em>'}</td>
                            <td style="padding: 4px 6px; color: #86efac; font-family: monospace; background: rgba(16, 185, 129, 0.05); font-weight: 600;">${ch.newValue}</td>
                          </tr>
                        `).join('')}
                      </tbody>
                    </table>
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>
        </div>
      `;
    });

    this.modalBody.innerHTML = html;
    this.attachModalEvents();
  }

  attachModalEvents() {
    // Checkbox de sección
    this.modalBody.querySelectorAll('.toggle-section-checkbox').forEach(toggle => {
      toggle.addEventListener('change', (e) => {
        const entity = e.target.dataset.entity;
        const checked = e.target.checked;
        this.modalBody.querySelectorAll(`.item-checkbox[data-entity="${entity}"]`).forEach(cb => {
          cb.checked = checked;
        });
        this.updateConfirmButtonState();
      });
    });

    // Checkbox individual
    this.modalBody.querySelectorAll('.item-checkbox').forEach(cb => {
      cb.addEventListener('change', () => this.updateConfirmButtonState());
    });
  }

  updateConfirmButtonState() {
    const selectedCount = this.modalBody.querySelectorAll('.item-checkbox:checked').length;
    this.confirmBtn.disabled = selectedCount === 0;
  }

  /**
   * Aplica los cambios aprobados por el usuario
   */
  executeImport() {
    if (!this.currentDiff) return;

    const approvedDiff = {
      projects: { toAdd: [], toUpdate: [] },
      interlocutors: { toAdd: [], toUpdate: [] },
      deals: { toAdd: [], toUpdate: [] },
      summary: ''
    };

    let totalApplied = 0;

    ['projects', 'interlocutors', 'deals'].forEach(entityKey => {
      const items = this.currentDiff[entityKey].items;
      items.forEach((item, idx) => {
        const checkbox = this.modalBody.querySelector(`.item-checkbox[data-entity="${entityKey}"][data-index="${idx}"]`);
        if (checkbox && checkbox.checked) {
          if (item.action === 'ADD') {
            approvedDiff[entityKey].toAdd.push(item.newData);
            totalApplied++;
          } else if (item.action === 'UPDATE') {
            approvedDiff[entityKey].toUpdate.push(item.newData);
            totalApplied++;
          }
        }
      });
    });

    if (totalApplied === 0) {
      alert('No has seleccionado ningún cambio para aplicar.');
      return;
    }

    approvedDiff.summary = `${totalApplied} registros importados/actualizados desde Excel`;

    const success = store.applyBatchDiff(approvedDiff);
    if (success) {
      this.closeModal();
      this.showToastSuccess(totalApplied);
      window.dispatchEvent(new CustomEvent('data-updated'));
    } else {
      alert('Hubo un error al aplicar los cambios a la base de datos.');
    }
  }

  /**
   * Muestra un Toast interactivo con opción de Rollback inmediato
   */
  showToastSuccess(count) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const snapshots = store.getSnapshots();
    const lastSnapshot = snapshots[0];

    const toast = document.createElement('div');
    toast.className = 'toast-notification toast-success';
    toast.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; gap: 16px; width: 100%;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--emerald-main)" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
          <div>
            <strong style="color: var(--text-main); font-size: 13px;">¡Carga masiva aplicada con éxito!</strong>
            <p style="font-size: 11px; color: var(--text-muted); margin: 2px 0 0 0;">Se actualizaron ${count} registros y se generó un snapshot de seguridad.</p>
          </div>
        </div>
        ${lastSnapshot ? `
          <button class="btn btn-sm btn-secondary btn-toast-rollback" style="border-color: var(--gold-main); color: var(--gold-main); font-size: 11px;">
            Deshacer / Rollback
          </button>
        ` : ''}
      </div>
    `;

    container.appendChild(toast);

    const rollbackBtn = toast.querySelector('.btn-toast-rollback');
    if (rollbackBtn && lastSnapshot) {
      rollbackBtn.addEventListener('click', () => {
        if (confirm(`¿Revertir todos los cambios y volver al snapshot anterior "${lastSnapshot.description}"?`)) {
          store.restoreSnapshot(lastSnapshot.id);
          toast.remove();
          alert('Reversión / Rollback ejecutada con éxito.');
          window.dispatchEvent(new CustomEvent('data-updated'));
        }
      });
    }

    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 400);
    }, 10000);
  }
}

export const smartImporter = new SmartImporter();
