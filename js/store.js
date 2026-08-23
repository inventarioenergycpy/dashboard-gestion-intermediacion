/**
 * DASHBOARD DE GESTIÓN DE INTERMEDIACIÓN FINANCIERA
 * Almacenamiento Local Reactivo y Datos Semilla
 */

const STORAGE_KEY = 'antigravity_intermediacion_data_v1';

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
    type: 'dueño_directo', // dueño_directo | consultora_mandato | consultora_puente | broker_buyside | broker_sellside | fondo_directo
    email: 'rsalcedo@saltasolar.com',
    phone: '+54 9 387 452 8900',
    contractSigned: 'Mandato de Venta No Exclusivo con Overprice',
    signatureDate: '2026-03-15',
    expirationDate: '2026-09-15', // Alerta por vencer (< 30 días)
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
    expirationDate: '2026-08-30', // Vence en pocos días
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
    stage: 'Due Diligence', // Contacto Inicial | Teaser Enviado | NDA Firmado | En Análisis | Due Diligence | Oferta Vinculante | Cierre
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
      dealLogNotified: false, // Alerta: Falta enviar Carta de Registro
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

class Store {
  constructor() {
    this.data = this.loadData();
  }

  loadData() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
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
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
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
    // Eliminar sub-gestiones asociadas
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

  // Configuración
  getSettings() { return this.data.settings; }
  updateSettings(settings) {
    this.data.settings = { ...this.data.settings, ...settings };
    this.saveData();
  }

  // Backup & Restore
  exportBackupJSON() {
    return JSON.stringify(this.data, null, 2);
  }

  importBackupJSON(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && parsed.projects && parsed.interlocutors) {
        this.saveData(parsed);
        return true;
      }
    } catch (e) {
      console.error('Error importing backup JSON', e);
    }
    return false;
  }

  resetToDefaults() {
    localStorage.removeItem(STORAGE_KEY);
    this.data = this.loadData();
  }
}

export const store = new Store();
