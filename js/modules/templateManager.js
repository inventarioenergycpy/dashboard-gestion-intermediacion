/**
 * DASHBOARD DE GESTIÓN DE INTERMEDIACIÓN FINANCIERA
 * Módulo Generador Dinámico de Plantillas Excel y CSV
 * Adaptable automáticamente ante cualquier cambio de esquema futuro
 */

import { store } from '../store.js';

export class TemplateManager {
  /**
   * Genera y descarga el libro de trabajo Excel (.xlsx) con todas las hojas del sistema
   */
  static downloadExcelTemplate() {
    if (typeof XLSX === 'undefined') {
      alert('Error: La biblioteca de procesamiento Excel (SheetJS) no se ha cargado.');
      return;
    }

    const schema = store.getDynamicSchema();
    const wb = XLSX.utils.book_new();

    // 1. Hoja de Proyectos de Inversión (Lado Oferta)
    const projectsHeaders = schema.projects.fields.map(f => f.label);
    const currentProjects = store.getProjects();
    const projectsData = [
      projectsHeaders,
      ...currentProjects.map(p => schema.projects.fields.map(f => p[f.key] ?? ''))
    ];
    const wsProjects = XLSX.utils.aoa_to_sheet(projectsData);
    XLSX.utils.book_append_sheet(wb, wsProjects, '1_PROYECTOS_OFERTA');

    // 2. Hoja de Interlocutores, Fondos y Brokers
    const interlocutorsHeaders = schema.interlocutors.fields.map(f => f.label);
    const currentInterlocutors = store.getInterlocutors();
    const interlocutorsData = [
      interlocutorsHeaders,
      ...currentInterlocutors.map(i => schema.interlocutors.fields.map(f => i[f.key] ?? ''))
    ];
    const wsInterlocutors = XLSX.utils.aoa_to_sheet(interlocutorsData);
    XLSX.utils.book_append_sheet(wb, wsInterlocutors, '2_INTERLOCUTORES_FONDOS');

    // 3. Hoja de Sub-Gestiones y Deals (Pipeline)
    const dealsHeaders = schema.deals.fields.map(f => f.label);
    const currentDeals = store.getDeals();
    const dealsData = [
      dealsHeaders,
      ...currentDeals.map(d => {
        return schema.deals.fields.map(f => {
          if (['blindTeaserSent', 'ndaSigned', 'dealLogNotified', 'mandateValid', 'feeProtectionConfirmed'].includes(f.key)) {
            const val = d.checklist ? d.checklist[f.key] : d[f.key];
            return val === true ? 'SI' : 'NO';
          }
          return d[f.key] ?? '';
        });
      })
    ];
    const wsDeals = XLSX.utils.aoa_to_sheet(dealsData);
    XLSX.utils.book_append_sheet(wb, wsDeals, '3_SUBGESTIONES_DEALS');

    // 4. Hoja de Guía, Instrucciones y Catálogos Permitidos
    const instructionsData = [
      ['GUÍA DE CARGA Y ESPECIFICACIÓN DE CAMPOS - DASHBOARD DE INTERMEDIACIÓN FINANCIERA'],
      [''],
      ['REGLA FUNDAMENTAL: Las columnas se adaptan automáticamente al esquema del sistema. No modificar los nombres de las cabeceras.'],
      [''],
      ['1. HOJA "1_PROYECTOS_OFERTA":'],
      ['   - ID_Proyecto: Identificador único (ej. proj_01, proj_05).'],
      ['   - Estado: Valores permitidos -> activo | suspendido | bloqueado_por_gestion | vendido'],
      ['   - Tipo_Titular: dueño_directo | consultora_mandato | broker_sellside'],
      ['   - Precios y Overprice: Expresar en números enteros sin comas ni símbolos de moneda (ej. 45000000).'],
      [''],
      ['2. HOJA "2_INTERLOCUTORES_FONDOS" (Oferta y Demanda):'],
      ['   - ID_Interlocutor: Identificador único (ej. inter_01, FONDO-01).'],
      ['   - Tipo_Interlocutor: fondo_directo | broker_buyside | dueño_directo | consultora_mandato | consultora_puente | broker_sellside'],
      ['   - Fechas Contractuales: Formato YYYY-MM-DD (ej. 2026-06-01). Se evalúan plazos de vencimiento y períodos de cola.'],
      ['   - Tail_Period_Meses: Cantidad de meses de protección post-vencimiento (ej. 12, 18, 24).'],
      [''],
      ['3. HOJA "3_SUBGESTIONES_DEALS" (Pipeline y Protección 3 Capas):'],
      ['   - ID_Deal: Identificador único de la sub-gestión (ej. deal_01).'],
      ['   - ID_Proyecto_Asociado: Debe coincidir exactamente con el ID_Proyecto cargado en la Hoja 1.'],
      ['   - ID_Fondo_o_Broker_Asociado: Debe coincidir exactamente con el ID_Interlocutor cargado en la Hoja 2.'],
      ['   - Etapa_Pipeline: Contacto Inicial | Teaser Enviado | NDA Firmado | En Análisis | Due Diligence | Oferta Vinculante | Cierre'],
      ['   - Checklists Legales (Capa 1, 2 y 3): Completar con "SI" o "NO" (o TRUE / FALSE).'],
      ['   - NOTA OPERATIVA: Las fechas dinámicas de reuniones y seguimiento se gestionan directamente en la web.'],
      [''],
      ['4. CARGA PARCIAL Y REEMPLAZO DE DATOS:'],
      ['   - Puedes cargar solo una hoja, o solo las filas que desees agregar o modificar.'],
      ['   - Al subir el archivo, el sistema mostrará un DIFF VISUAL detallado con los datos que serán actualizados o reemplazados.']
    ];
    const wsInstructions = XLSX.utils.aoa_to_sheet(instructionsData);
    XLSX.utils.book_append_sheet(wb, wsInstructions, 'INSTRUCCIONES_Y_CATALOGOS');

    // Descarga del archivo
    const today = new Date().toISOString().split('T')[0];
    const fileName = `Plantilla_Intermediacion_Financiera_EnergyCPY_${today}.xlsx`;
    XLSX.writeFile(wb, fileName);
  }
}
