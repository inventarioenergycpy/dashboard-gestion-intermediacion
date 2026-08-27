/**
 * DASHBOARD DE GESTIÓN DE INTERMEDIACIÓN FINANCIERA
 * Almacenamiento Local Reactivo, Esquema Dinámico y Datos Semilla
 */

const STORAGE_KEY = 'antigravity_intermediacion_data_v1';
const SNAPSHOT_KEY = 'antigravity_snapshots_v1';

export const DEFAULT_USERS = [
  {
    id: 'user_javier',
    name: 'Javier',
    email: 'inventario.energycpy@gmail.com',
    role: 'Administrador & Consultor',
    isAdmin: true,
    avatar: 'J'
  },
  {
    id: 'user_daniel',
    name: 'Daniel',
    email: 'gonzalezmarcelo2105ypf@gmail.com',
    role: 'Consultor',
    isAdmin: false,
    avatar: 'D'
  }
];

export const DEFAULT_STATUSES = [
  { id: 'activo', label: 'Activo', color: '#10b981', description: 'En proceso de oferta o búsqueda activa de inversores' },
  { id: 'suspendido', label: 'Suspendido', color: '#94a3b8', description: 'Pausado temporalmente a solicitud del titular o consultor' },
  { id: 'bloqueado_por_gestion', label: 'Bloqueado por Gestión', color: '#f59e0b', description: 'En negociación avanzada o exclusividad temporal con un fondo' },
  { id: 'vendido', label: 'Vendido', color: '#a855f7', description: 'Transacción concluida exitosamente' }
];

export const DEFAULT_PROJECTS = [
  {
    id: 'proj_01',
    title: 'Parque Solar Fotovoltaico MATER 50 MW - Salta',
    sector: 'Energía Renovable',
    basePrice: 42000000,
    overpriceTarget: 2500000,
    currency: 'USD',
    status: 'activo',
    ownerId: 'inter_01',
    ownerName: 'Dr. Roberto Salcedo',
    ownerType: 'dueño_directo',
    description: 'Proyecto solar fotovoltaico Ready to Build con prioridad de despacho asignada por CAMMESA y contrato PPA privado en dólares a 15 años.',
    driveFolderUrl: 'https://drive.google.com/drive/u/0/folders/inventario-energycpy-solar-salta',
    createdAt: '2026-03-15'
  },
  {
    id: 'proj_02',
    title: 'Buque Factoría & Cuota Pesquera Merluza Negra - Patagonia',
    sector: 'Pesca Industrial',
    basePrice: 18500000,
    overpriceTarget: 1200000,
    currency: 'USD',
    status: 'bloqueado_por_gestion',
    ownerId: 'inter_02',
    ownerName: 'Naviera Austral S.A. (Lic. Gustavo Mendieta)',
    ownerType: 'consultora_mandato',
    description: 'Embarcación pesquera de altura con cuota individual transferible de captura (CITC) certificada y permisos de pesca internacional en caladeros del Atlántico Sur.',
    driveFolderUrl: 'https://drive.google.com/drive/u/0/folders/inventario-energycpy-pesca-patagonia',
    createdAt: '2026-04-10'
  },
  {
    id: 'proj_03',
    title: 'Parque Logístico & Hub Portuario Grano/Combustibles',
    sector: 'Real Estate / Logística',
    basePrice: 12000000,
    overpriceTarget: 900000,
    currency: 'USD',
    status: 'activo',
    ownerId: 'inter_03',
    ownerName: 'Ing. Carlos Valenzuela',
    ownerType: 'dueño_directo',
    description: 'Complejo de almacenamiento y distribución multimodal con conexión ferroviaria y acceso directo a terminal de barcazas sobre la hidrovía.',
    driveFolderUrl: 'https://drive.google.com/drive/u/0/folders/inventario-energycpy-logistico-puerto',
    createdAt: '2026-01-20'
  },
  {
    id: 'proj_04',
    title: 'Concesión Minera Salmueras de Litio - Salar de Arizaro',
    sector: 'Minería / Litio',
    basePrice: 65000000,
    overpriceTarget: 3500000,
    currency: 'USD',
    status: 'suspendido',
    ownerId: 'inter_04',
    ownerName: 'Mining Andes Holding (Broker Sell-side)',
    ownerType: 'broker_sellside',
    description: 'Propiedades mineras de exploración avanzada con alta concentración de salmueras de litio y potasio en la Puna Argentina.',
    driveFolderUrl: 'https://drive.google.com/drive/u/0/folders/inventario-energycpy-litio-arizaro',
    createdAt: '2026-02-05'
  }
];

export const DEFAULT_INTERLOCUTORS = [
  {
    id: 'inter_01',
    name: 'Dr. Roberto Salcedo',
    company: 'Salta Solar Energy S.A.',
    type: 'dueño_directo',
    email: 'rsalcedo@saltasolar.com',
    phone: '+54 9 387 452 8900',
    contractSigned: 'Mandato de Venta No Exclusivo con Overprice',
    signatureDate: '2026-03-15',
    expirationDate: '2026-09-15',
    tailPeriodMonths: 24,
    driveDocUrl: 'https://drive.google.com/file/d/mandato_salta_solar_salcedo',
    notes: 'Dueño directo muy receptivo. Autorizado overprice sobre USD 42M.'
  },
  {
    id: 'inter_02',
    name: 'Lic. Gustavo Mendieta',
    company: 'Naviera Austral S.A.',
    type: 'consultora_mandato',
    email: 'gmendieta@navieraaustral.com',
    phone: '+54 9 280 411 3450',
    contractSigned: 'Acuerdo de Co-Brokering + NCNDA',
    signatureDate: '2026-04-10',
    expirationDate: '2027-04-10',
    tailPeriodMonths: 18,
    driveDocUrl: 'https://drive.google.com/file/d/cobrokering_naviera_austral',
    notes: 'Consultora con mandato firmado del armador pesquero. Fee sharing 50/50 acordado.'
  },
  {
    id: 'inter_03',
    name: 'Ing. Carlos Valenzuela',
    company: 'Grupo Desarrollador Puerto',
    type: 'dueño_directo',
    email: 'cvalenzuela@grupopuerto.com.ar',
    phone: '+54 9 341 588 2300',
    contractSigned: 'Mandato de Intermediación con Overprice',
    signatureDate: '2026-01-20',
    expirationDate: '2026-08-30',
    tailPeriodMonths: 24,
    driveDocUrl: 'https://drive.google.com/file/d/mandato_valenzuela_puerto',
    notes: 'Requiere renovación urgente del mandato antes de fin de mes.'
  },
  {
    id: 'inter_04',
    name: 'Andes Minerals Brokers',
    company: 'Mining Andes Holding',
    type: 'broker_sellside',
    email: 'deals@andesminerals.com',
    phone: '+54 9 11 4099 8700',
    contractSigned: 'Inter-Broker Fee Agreement + NCNDA',
    signatureDate: '2026-02-05',
    expirationDate: '2027-02-05',
    tailPeriodMonths: 12,
    driveDocUrl: 'https://drive.google.com/file/d/ncnda_andes_minerals',
    notes: 'Broker intermedio con cadena de intermediarios. Proyecto suspendido temporalmente.'
  },
  {
    id: 'inter_05',
    name: 'Green Infrastructure Fund UK',
    company: 'Green Infra Partners Ltd (London)',
    type: 'fondo_directo',
    email: 'invest@greeninfra.co.uk',
    phone: '+44 20 7946 0912',
    contractSigned: 'NDA Bilateral con Cláusula de No Circunvención & Buy-side Fee',
    signatureDate: '2026-06-01',
    expirationDate: '2028-06-01',
    tailPeriodMonths: 24,
    driveDocUrl: 'https://drive.google.com/file/d/nda_green_infra_uk',
    notes: 'Fondo institucional de energía. Ticket objetivo: USD 30M a 100M en renovables.'
  },
  {
    id: 'inter_06',
    name: 'LatAm Energy Capital Advisors',
    company: 'LatAm Energy Advisory Corp',
    type: 'broker_buyside',
    email: 'contact@latamenergyadvisors.com',
    phone: '+1 305 555 0199',
    contractSigned: 'Master Fee Protection Agreement (MFPA) + NCNDA',
    signatureDate: '2026-02-14',
    expirationDate: '2028-02-14',
    tailPeriodMonths: 24,
    driveDocUrl: 'https://drive.google.com/file/d/mfpa_latam_energy_advisors',
    notes: 'Broker buy-side vinculado a fondos de inversión suizos y nórdicos.'
  }
];

export const DEFAULT_DEALS = [
  {
    id: 'deal_01',
    projectId: 'proj_01',
    projectTitle: 'Parque Solar Fotovoltaico MATER 50 MW - Salta',
    interlocutorId: 'inter_05',
    targetName: 'Green Infrastructure Fund UK',
    targetType: 'Fondo Institucional Directo',
    objective: 'Presentación formal de Info Memo y validación del modelo financiero de PPA CAMMESA',
    presentationDate: '2026-06-15',
    controlDate: '2026-08-28',
    meetingDate: '2026-08-26',
    stage: 'Due Diligence',
    checklist: {
      ndaSigned: true,
      blindTeaserSent: true,
      infoMemoApproved: true,
      dealLogNotified: true,
      mandateValid: true,
      feeProtectionConfirmed: true
    },
    observations: 'Reunión agendada para el 26/08 para discutir estructura de deuda y WACC del 9.5%. Info Memo descargado desde Google Drive.',
    driveFolderUrl: 'https://drive.google.com/drive/u/0/folders/deal-solar-greeninfra-uk',
    createdAt: '2026-06-15'
  },
  {
    id: 'deal_02',
    projectId: 'proj_01',
    projectTitle: 'Parque Solar Fotovoltaico MATER 50 MW - Salta',
    interlocutorId: 'inter_06',
    targetName: 'LatAm Energy Capital Advisors',
    targetType: 'Broker Buy-side (Fondos Suizos)',
    objective: 'Evaluación de co-inversión para syndication bancaria internacional',
    presentationDate: '2026-07-02',
    controlDate: '2026-09-02',
    meetingDate: '2026-08-29',
    stage: 'En Análisis',
    checklist: {
      ndaSigned: true,
      blindTeaserSent: true,
      infoMemoApproved: true,
      dealLogNotified: false,
      mandateValid: true,
      feeProtectionConfirmed: true
    },
    observations: 'Revisando blind teaser y capa técnica. Pendiente emitir la Carta Formal de Registro de Inversores antes de abrir el Data Room.',
    driveFolderUrl: 'https://drive.google.com/drive/u/0/folders/deal-solar-latam-advisors',
    createdAt: '2026-07-02'
  },
  {
    id: 'deal_03',
    projectId: 'proj_02',
    projectTitle: 'Buque Factoría & Cuota Pesquera Merluza Negra - Patagonia',
    interlocutorId: 'inter_02',
    targetName: 'Fondo de Inversión Marítima Atlántico',
    targetType: 'Fondo Privado de Capital',
    objective: 'Cierre de contrato de compraventa y formalización de transferencia de cuota CITC',
    presentationDate: '2026-05-20',
    controlDate: '2026-08-25',
    meetingDate: '2026-08-24',
    stage: 'Oferta Vinculante',
    checklist: {
      ndaSigned: true,
      blindTeaserSent: true,
      infoMemoApproved: true,
      dealLogNotified: true,
      mandateValid: true,
      feeProtectionConfirmed: true
    },
    observations: 'LOI vinculante presentada por USD 19.7M. Overprice de USD 1.2M garantizado por escrow bancario.',
    driveFolderUrl: 'https://drive.google.com/drive/u/0/folders/deal-pesca-atlantico',
    createdAt: '2026-05-20'
  }
];

export const DEFAULT_SETTINGS = {
  alertDaysWarning: 30,
  alertDaysCritical: 10,
  googleDriveEmail: 'inventario.energycpy@gmail.com',
  githubRepoUrl: 'https://github.com/inventarioenergycpy/dashboard-gestion-intermediacion'
};

export const DATA_SCHEMA = {
  projects: {
    sheetName: 'PROYECTOS_OFERTA',
    title: 'Proyectos de Inversión (Lado Oferta / Sell-Side)',
    idField: 'id',
    nameField: 'title',
    fields: [
      { key: 'id', label: 'ID_Proyecto', type: 'string', required: true, example: 'proj_01', desc: 'Identificador único del proyecto (ej. proj_05)' },
      { key: 'title', label: 'Titulo_Proyecto', type: 'string', required: true, example: 'Parque Eólico Vientos del Sur 100 MW', desc: 'Nombre ejecutivo del proyecto' },
      { key: 'sector', label: 'Sector_Industria', type: 'string', required: true, example: 'Energía Renovable', desc: 'Energía Renovable, Pesca, Real Estate, Minería, etc.' },
      { key: 'basePrice', label: 'Precio_Base_USD', type: 'number', required: true, example: 45000000, desc: 'Precio neto base solicitado por el titular en USD' },
      { key: 'overpriceTarget', label: 'Overprice_Objetivo_USD', type: 'number', required: false, example: 2500000, desc: 'Sobreprecio u honorario proyectado para la consultora en USD' },
      { key: 'currency', label: 'Moneda', type: 'string', required: false, example: 'USD', desc: 'USD / EUR / ARS' },
      { key: 'status', label: 'Estado', type: 'string', required: true, example: 'activo', desc: 'activo | suspendido | bloqueado_por_gestion | vendido' },
      { key: 'ownerName', label: 'Nombre_Titular_o_Mandatario', type: 'string', required: false, example: 'Dr. Roberto Salcedo', desc: 'Nombre del dueño o consultora con mandato' },
      { key: 'ownerType', label: 'Tipo_Titular', type: 'string', required: false, example: 'dueño_directo', desc: 'dueño_directo | consultora_mandato | broker_sellside' },
      { key: 'description', label: 'Descripcion_Resumen', type: 'string', required: false, example: 'Proyecto Ready to Build con PPA a 15 años', desc: 'Descripción técnica resumida' },
      { key: 'driveFolderUrl', label: 'Enlace_Carpeta_Drive', type: 'string', required: false, example: 'https://drive.google.com/drive/folders/...', desc: 'URL de Google Drive oficial' },
      { key: 'createdAt', label: 'Fecha_Alta_Proyecto', type: 'date', isContractDate: true, required: false, example: '2026-03-15', desc: 'Fecha de ingreso al portfolio (YYYY-MM-DD)' }
    ]
  },
  interlocutors: {
    sheetName: 'INTERLOCUTORES_Y_FONDOS',
    title: 'Interlocutores, Fondos y Brokers (Oferta y Demanda)',
    idField: 'id',
    nameField: 'company',
    fields: [
      { key: 'id', label: 'ID_Interlocutor', type: 'string', required: true, example: 'inter_07', desc: 'Identificador único (ej. inter_07 o FONDO-01)' },
      { key: 'company', label: 'Empresa_o_Fondo', type: 'string', required: true, example: 'Green Infra Partners Ltd', desc: 'Razón social o nombre institucional del fondo o consultora' },
      { key: 'name', label: 'Nombre_Contacto_Principal', type: 'string', required: true, example: 'Mark Robinson', desc: 'Nombre y apellido del ejecutivo de cuenta o titular' },
      { key: 'type', label: 'Tipo_Interlocutor', type: 'string', required: true, example: 'fondo_directo', desc: 'fondo_directo | broker_buyside | dueño_directo | consultora_mandato | consultora_puente | broker_sellside' },
      { key: 'country', label: 'Pais_Origen', type: 'string', required: false, example: 'Reino Unido', desc: 'País de radicación o jurisdicción' },
      { key: 'email', label: 'Email_Contacto', type: 'string', required: false, example: 'invest@greeninfra.co.uk', desc: 'Correo electrónico institucional' },
      { key: 'phone', label: 'Telefono', type: 'string', required: false, example: '+44 20 7946 0912', desc: 'Teléfono con código de país' },
      { key: 'ticketTarget', label: 'Ticket_Inversion_Objetivo', type: 'string', required: false, example: 'USD 30M a 100M', desc: 'Rango de inversión buscado o capacidad financiera' },
      { key: 'sectorsTarget', label: 'Sectores_Interes', type: 'string', required: false, example: 'Solar, Eólica, Infraestructura', desc: 'Sectores económicos de foco' },
      { key: 'contractSigned', label: 'Contrato_o_Acuerdo_Firmado', type: 'string', required: false, example: 'NDA Bilateral con Cláusula de No Circunvención & Buy-side Fee', desc: 'Mandato / Co-Brokering / NDA Bilateral / NCNDA / MFPA' },
      { key: 'signatureDate', label: 'Fecha_Firma_Contrato', type: 'date', isContractDate: true, required: false, example: '2026-06-01', desc: 'Fecha de firma del acuerdo (YYYY-MM-DD)' },
      { key: 'expirationDate', label: 'Fecha_Vencimiento_Contrato', type: 'date', isContractDate: true, required: false, example: '2028-06-01', desc: 'Fecha de expiración contractual (YYYY-MM-DD)' },
      { key: 'tailPeriodMonths', label: 'Tail_Period_Meses', type: 'number', required: false, example: 24, desc: 'Período de protección post-vencimiento (meses: 12, 18, 24)' },
      { key: 'driveDocUrl', label: 'Enlace_Documento_Drive', type: 'string', required: false, example: 'https://drive.google.com/file/d/...', desc: 'Enlace a PDF firmado en Google Drive' },
      { key: 'notes', label: 'Notas_Estrategicas', type: 'string', required: false, example: 'Fondo institucional europeo. Ticket USD 30M-100M.', desc: 'Comentarios, mandatos o pautas de negociación' }
    ]
  },
  deals: {
    sheetName: 'SUBGESTIONES_Y_DEALS',
    title: 'Sub-Gestiones y Deals Activos (Pipeline de Inversión)',
    idField: 'id',
    nameField: 'objective',
    fields: [
      { key: 'id', label: 'ID_Deal', type: 'string', required: true, example: 'deal_04', desc: 'Identificador único del deal (ej. deal_04)' },
      { key: 'projectId', label: 'ID_Proyecto_Asociado', type: 'string', required: true, example: 'proj_01', desc: 'ID del proyecto de inversión vinculado (debe coincidir con Hoja Proyectos)' },
      { key: 'projectTitle', label: 'Titulo_Proyecto_Referencia', type: 'string', required: false, example: 'Parque Solar Fotovoltaico MATER 50 MW - Salta', desc: 'Nombre del proyecto para lectura humana' },
      { key: 'interlocutorId', label: 'ID_Fondo_o_Broker_Asociado', type: 'string', required: true, example: 'inter_05', desc: 'ID del fondo/broker vinculado (debe coincidir con Hoja Interlocutores)' },
      { key: 'targetName', label: 'Nombre_Fondo_o_Inversor', type: 'string', required: false, example: 'Green Infrastructure Fund UK', desc: 'Nombre del fondo/broker de destino' },
      { key: 'targetType', label: 'Tipo_Entidad_Destino', type: 'string', required: false, example: 'Fondo Institucional Directo', desc: 'Fondo Directo, Broker Buy-side, etc.' },
      { key: 'objective', label: 'Objetivo_de_la_Gestion', type: 'string', required: true, example: 'Presentación formal de Info Memo y validación PPA', desc: 'Propósito u objetivo de la presentación' },
      { key: 'stage', label: 'Etapa_Pipeline', type: 'string', required: true, example: 'Due Diligence', desc: 'Contacto Inicial | Teaser Enviado | NDA Firmado | En Análisis | Due Diligence | Oferta Vinculante | Cierre' },
      { key: 'presentationDate', label: 'Fecha_Presentacion_Formal', type: 'date', isContractDate: true, required: false, example: '2026-06-15', desc: 'Fecha de envío formal del Teaser / Deal Log (YYYY-MM-DD)' },
      { key: 'blindTeaserSent', label: 'Capa1_Blind_Teaser_Enviado', type: 'boolean', required: false, example: true, desc: 'SI / NO (o TRUE / FALSE)' },
      { key: 'ndaSigned', label: 'Capa1_NDA_Firmado', type: 'boolean', required: false, example: true, desc: 'SI / NO (o TRUE / FALSE)' },
      { key: 'dealLogNotified', label: 'Capa3_Deal_Log_Notificado', type: 'boolean', required: false, example: true, desc: 'SI / NO (o TRUE / FALSE) - Notificación formal fehaciente' },
      { key: 'mandateValid', label: 'Capa2_Mandato_Vigente', type: 'boolean', required: false, example: true, desc: 'SI / NO (o TRUE / FALSE)' },
      { key: 'feeProtectionConfirmed', label: 'Capa2_Overprice_Protegido', type: 'boolean', required: false, example: true, desc: 'SI / NO (o TRUE / FALSE)' },
      { key: 'driveFolderUrl', label: 'Enlace_Carpeta_Drive_Deal', type: 'string', required: false, example: 'https://drive.google.com/drive/folders/...', desc: 'Carpeta de la sub-gestión en Google Drive' },
      { key: 'observations', label: 'Observaciones_y_Minuta', type: 'string', required: false, example: 'Reunión acordada para discutir estructura de deuda y WACC 9.5%', desc: 'Notas de avance o acuerdos' }
    ]
  }
};

class Store {
  constructor() {
    this.data = this.loadData();
  }

  loadData() {
    try {
      if (typeof localStorage !== 'undefined') {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          return JSON.parse(saved);
        }
      }
    } catch (e) {
      console.warn('Error loading data from localStorage, using defaults', e);
    }

    const initial = {
      users: DEFAULT_USERS,
      statuses: DEFAULT_STATUSES,
      projects: DEFAULT_PROJECTS,
      interlocutors: DEFAULT_INTERLOCUTORS,
      deals: DEFAULT_DEALS,
      settings: DEFAULT_SETTINGS,
      activeUser: DEFAULT_USERS[0]
    };

    this.saveData(initial);
    return initial;
  }

  saveData(data = this.data) {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      }
      this.data = data;
    } catch (e) {
      console.error('Error saving data to localStorage', e);
    }
  }

  // Usuarios y Sesión
  getUsers() { return this.data.users; }
  getActiveUser() { return this.data.activeUser; }
  setActiveUser(user) {
    this.data.activeUser = user;
    this.saveData();
  }

  // Estados de Proyecto
  getStatuses() { return this.data.statuses; }
  getStatus(id) { return this.data.statuses.find(s => s.id === id); }
  addStatus(status) {
    this.data.statuses.push(status);
    this.saveData();
  }
  updateStatus(id, updated) {
    const idx = this.data.statuses.findIndex(s => s.id === id);
    if (idx !== -1) {
      this.data.statuses[idx] = { ...this.data.statuses[idx], ...updated };
      this.saveData();
    }
  }
  deleteStatus(id) {
    this.data.statuses = this.data.statuses.filter(s => s.id !== id);
    this.saveData();
  }

  // Proyectos
  getProjects() { return this.data.projects; }
  getProject(id) { return this.data.projects.find(p => p.id === id); }
  addProject(project) {
    this.data.projects.unshift(project);
    this.saveData();
  }
  updateProject(id, updated) {
    const idx = this.data.projects.findIndex(p => p.id === id);
    if (idx !== -1) {
      this.data.projects[idx] = { ...this.data.projects[idx], ...updated };
      this.saveData();
    }
  }
  deleteProject(id) {
    this.data.projects = this.data.projects.filter(p => p.id !== id);
    this.data.deals = this.data.deals.filter(d => d.projectId !== id);
    this.saveData();
  }

  // Interlocutores (Dueños, Brokers, Fondos)
  getInterlocutors() { return this.data.interlocutors; }
  getInterlocutor(id) { return this.data.interlocutors.find(i => i.id === id); }
  addInterlocutor(interlocutor) {
    this.data.interlocutors.unshift(interlocutor);
    this.saveData();
  }
  updateInterlocutor(id, updated) {
    const idx = this.data.interlocutors.findIndex(i => i.id === id);
    if (idx !== -1) {
      this.data.interlocutors[idx] = { ...this.data.interlocutors[idx], ...updated };
      this.saveData();
    }
  }
  deleteInterlocutor(id) {
    this.data.interlocutors = this.data.interlocutors.filter(i => i.id !== id);
    this.saveData();
  }

  // Sub-Gestiones (Deals)
  getDeals() { return this.data.deals; }
  getDealsByProject(projectId) { return this.data.deals.filter(d => d.projectId === projectId); }
  getDeal(id) { return this.data.deals.find(d => d.id === id); }
  addDeal(deal) {
    this.data.deals.unshift(deal);
    this.saveData();
  }
  updateDeal(id, updated) {
    const idx = this.data.deals.findIndex(d => d.id === id);
    if (idx !== -1) {
      this.data.deals[idx] = { ...this.data.deals[idx], ...updated };
      this.saveData();
    }
  }
  deleteDeal(id) {
    this.data.deals = this.data.deals.filter(d => d.id !== id);
    this.saveData();
  }

  // Schema Dinámico
  getDynamicSchema() {
    return DATA_SCHEMA;
  }

  // Snapshots & Rollback Engine
  getSnapshots() {
    try {
      if (typeof localStorage !== 'undefined') {
        const raw = localStorage.getItem(SNAPSHOT_KEY);
        return raw ? JSON.parse(raw) : [];
      }
    } catch (e) {
      console.warn('Error loading snapshots', e);
    }
    return [];
  }

  createSnapshot(description = 'Respaldo manual de base de datos') {
    try {
      const snapshots = this.getSnapshots();
      const newSnapshot = {
        id: 'snap_' + Date.now(),
        timestamp: new Date().toISOString(),
        description,
        user: this.getActiveUser()?.name || 'Sistema',
        stats: {
          projectsCount: this.data.projects.length,
          interlocutorsCount: this.data.interlocutors.length,
          dealsCount: this.data.deals.length
        },
        data: JSON.parse(JSON.stringify(this.data))
      };

      // Mantener los últimos 15 snapshots
      snapshots.unshift(newSnapshot);
      if (snapshots.length > 15) {
        snapshots.pop();
      }

      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(SNAPSHOT_KEY, JSON.stringify(snapshots));
      }
      return newSnapshot;
    } catch (e) {
      console.error('Error creating snapshot', e);
      return null;
    }
  }

  restoreSnapshot(snapshotId) {
    try {
      const snapshots = this.getSnapshots();
      const target = snapshots.find(s => s.id === snapshotId);
      if (target && target.data) {
        this.createSnapshot(`Respaldo automático previo a reversión al snapshot: ${target.description}`);
        this.saveData(target.data);
        return true;
      }
    } catch (e) {
      console.error('Error restoring snapshot', e);
    }
    return false;
  }

  deleteSnapshot(snapshotId) {
    try {
      let snapshots = this.getSnapshots();
      snapshots = snapshots.filter(s => s.id !== snapshotId);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(SNAPSHOT_KEY, JSON.stringify(snapshots));
      }
      return true;
    } catch (e) {
      console.error('Error deleting snapshot', e);
      return false;
    }
  }

  // Batch Diff Application (Impactar Cambios Seleccionados)
  applyBatchDiff(approvedDiff) {
    try {
      this.createSnapshot(`Carga Masiva Excel/CSV: ${approvedDiff.summary || 'Actualización de datos'}`);

      // Procesar Proyectos
      if (approvedDiff.projects) {
        if (approvedDiff.projects.toAdd && approvedDiff.projects.toAdd.length > 0) {
          approvedDiff.projects.toAdd.forEach(item => {
            const exists = this.data.projects.some(p => p.id === item.id);
            if (!exists) this.data.projects.unshift(item);
          });
        }
        if (approvedDiff.projects.toUpdate && approvedDiff.projects.toUpdate.length > 0) {
          approvedDiff.projects.toUpdate.forEach(item => {
            const idx = this.data.projects.findIndex(p => p.id === item.id);
            if (idx !== -1) {
              this.data.projects[idx] = { ...this.data.projects[idx], ...item };
            }
          });
        }
      }

      // Procesar Interlocutores
      if (approvedDiff.interlocutors) {
        if (approvedDiff.interlocutors.toAdd && approvedDiff.interlocutors.toAdd.length > 0) {
          approvedDiff.interlocutors.toAdd.forEach(item => {
            const exists = this.data.interlocutors.some(i => i.id === item.id);
            if (!exists) this.data.interlocutors.unshift(item);
          });
        }
        if (approvedDiff.interlocutors.toUpdate && approvedDiff.interlocutors.toUpdate.length > 0) {
          approvedDiff.interlocutors.toUpdate.forEach(item => {
            const idx = this.data.interlocutors.findIndex(i => i.id === item.id);
            if (idx !== -1) {
              this.data.interlocutors[idx] = { ...this.data.interlocutors[idx], ...item };
            }
          });
        }
      }

      // Procesar Deals
      if (approvedDiff.deals) {
        if (approvedDiff.deals.toAdd && approvedDiff.deals.toAdd.length > 0) {
          approvedDiff.deals.toAdd.forEach(item => {
            const exists = this.data.deals.some(d => d.id === item.id);
            if (!exists) this.data.deals.unshift(item);
          });
        }
        if (approvedDiff.deals.toUpdate && approvedDiff.deals.toUpdate.length > 0) {
          approvedDiff.deals.toUpdate.forEach(item => {
            const idx = this.data.deals.findIndex(d => d.id === item.id);
            if (idx !== -1) {
              this.data.deals[idx] = { ...this.data.deals[idx], ...item };
            }
          });
        }
      }

      this.saveData(this.data);
      return true;
    } catch (e) {
      console.error('Error applying batch diff', e);
      return false;
    }
  }

  // Backup & Restore
  exportBackupJSON() {
    return JSON.stringify(this.data, null, 2);
  }

  importBackupJSON(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && parsed.projects && parsed.interlocutors) {
        this.createSnapshot('Respaldo previo a restauración de Backup JSON');
        this.saveData(parsed);
        return true;
      }
    } catch (e) {
      console.error('Error importing backup JSON', e);
    }
    return false;
  }

  resetToDefaults() {
    this.createSnapshot('Respaldo previo a restablecer valores semilla');
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
    this.data = this.loadData();
  }
}

export const store = new Store();
