/**
 * DASHBOARD DE GESTIÓN DE INTERMEDIACIÓN FINANCIERA
 * Standalone Single-Bundle for file:/// and http:// access
 */
(function() {
'use strict';


/* --- FILE: store.js --- */
/**
 * DASHBOARD DE GESTIÓN DE INTERMEDIACIÓN FINANCIERA
 * Almacenamiento Local Reactivo, Esquema Dinámico y Datos Semilla
 */

const STORAGE_KEY = 'antigravity_intermediacion_data_v1';
const SNAPSHOT_KEY = 'antigravity_snapshots_v1';
const DEFAULT_USERS = [
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
const DEFAULT_STATUSES = [
  { id: 'activo', label: 'Activo', color: '#10b981', description: 'En proceso de oferta o búsqueda activa de inversores' },
  { id: 'suspendido', label: 'Suspendido', color: '#94a3b8', description: 'Pausado temporalmente a solicitud del titular o consultor' },
  { id: 'bloqueado_por_gestion', label: 'Bloqueado por Gestión', color: '#f59e0b', description: 'En negociación avanzada o exclusividad temporal con un fondo' },
  { id: 'vendido', label: 'Vendido', color: '#a855f7', description: 'Transacción concluida exitosamente' }
];
const DEFAULT_PROJECTS = [
    {
      "id": "solar-cuatro-vientos",
      "title": "Parque Solar Sol de los Cuatro Vientos 300 MW",
      "sector": "Energía Solar & Renovable",
      "basePrice": 300000000,
      "overpriceTarget": 15000000,
      "currency": "USD",
      "status": "activo",
      "ownerId": "user_javier",
      "ownerName": "Javier Ignacio Díaz",
      "ownerType": "mandatario_exclusivo",
      "description": "Desarrollo solar fotovoltaico de gran escala (300 MW) en zona de radiación solar excepcional en Mendoza. Estructuración orientada a contratos PPA a largo plazo indexados en USD bajo el marco MATER / CAMMESA.",
      "modality": "Socio Inversor",
      "roi": "7 Años",
      "statusProgress": "Ingeniería avanzada y estudios de red listos para PPA MATER/CAMMESA",
      "driveFolderUrl": "https://drive.google.com/drive/u/0/folders/inventario-energycpy-solar-cuatro-vientos",
      "createdAt": "2026-10-21",
      "assignedAgent": "javier",
      "amountDisplay": "USD 300M",
      "isPrivatePlacement": false,
      "es": {
        "categoryTag": "Energía Solar Fotovoltaica",
        "title": "Parque Solar Sol de los Cuatro Vientos 300 MW",
        "location": "Mendoza, Argentina",
        "statusLabel": "USD 300M — Socio Inversor",
        "description": "Desarrollo solar fotovoltaico de gran escala (300 MW) en zona de radiación solar excepcional en Mendoza. Estructuración orientada a contratos PPA a largo plazo indexados en USD bajo el marco MATER / CAMMESA.",
        "thesis": "Proyecto utility-scale con factor de planta líder en el cono sur, nodo de evacuación en alta tensión reservado y modelo de sindicación para socio inversor de primer nivel.",
        "highlights": [
          "300 MW de potencia nominal con factor de capacidad líder mundial en Cuyo.",
          "Estructuración de contratos PPA indexados en USD a 15-20 años bajo marco MATER/CAMMESA.",
          "Búsqueda de socio inversor / equity partner con entrada estratégica y gobierno compartido.",
          "Prioridad de despacho y estudios de interconexión eléctrica en etapa avanzada.",
          "Elegible para beneficios fiscales y cambiarios bajo el régimen RIGI (Ley 27.742)."
        ],
        "metrics": [
          {
            "label": "Inversión Final",
            "val": "USD 300M",
            "color": "text-gold"
          },
          {
            "label": "Potencia Nominal",
            "val": "300 MW",
            "color": "text-cyan"
          },
          {
            "label": "ROI Estimado",
            "val": "7 Años",
            "color": "text-green"
          },
          {
            "label": "Modalidad",
            "val": "Socio Inversor",
            "color": "text-gold"
          }
        ]
      },
      "en": {
        "categoryTag": "Solar PV Energy",
        "title": "Sol de los Cuatro Vientos 300 MW Solar Park",
        "location": "Mendoza, Argentina",
        "statusLabel": "USD 300M — Equity Partner",
        "description": "Large-scale utility solar PV development (300 MW) located in Mendoza's premier solar irradiance belt. Designed for long-term USD-indexed PPAs under the MATER / CAMMESA framework.",
        "thesis": "World-class capacity factor, high-voltage grid interconnection in advanced permitting, and strategic co-equity structure for institutional investors.",
        "highlights": [
          "300 MW nominal capacity in Cuyo's premier solar corridor.",
          "USD-denominated 15-20 year PPA structure (MATER / CAMMESA).",
          "Equity partnership model with attractive risk-adjusted IRR.",
          "Interconnection priority and advanced environmental clearance.",
          "Eligible for RIGI investment incentive regime."
        ],
        "metrics": [
          {
            "label": "Final Ticket",
            "val": "USD 300M",
            "color": "text-gold"
          },
          {
            "label": "Nominal Power",
            "val": "300 MW",
            "color": "text-cyan"
          },
          {
            "label": "Estimated ROI",
            "val": "7 Years",
            "color": "text-green"
          },
          {
            "label": "Deal Type",
            "val": "Equity Partner",
            "color": "text-gold"
          }
        ]
      }
    },
    {
      "id": "solar-vaca-muerta",
      "title": "Parque Solar 30 MW Vaca Muerta",
      "sector": "Energía Solar & Renovable",
      "basePrice": 30000000,
      "overpriceTarget": 2000000,
      "currency": "USD",
      "status": "activo",
      "ownerId": "user_javier",
      "ownerName": "Javier Ignacio Díaz",
      "ownerType": "mandatario_exclusivo",
      "description": "Planta fotovoltaica de 30 MW emplazada en el corazón de la formación no convencional Vaca Muerta. Provisión directa de energía limpia y descarbonización para operaciones de operadoras petroleras y de servicios.",
      "modality": "Socio Inversor",
      "roi": "5 Años",
      "statusProgress": "Proyecto ejecutivo orientado a offtakers industriales de hidrocarburos en Añelo",
      "driveFolderUrl": "https://drive.google.com/drive/u/0/folders/inventario-energycpy-solar-vaca-muerta",
      "createdAt": "2026-10-21",
      "assignedAgent": "javier",
      "amountDisplay": "USD 30M",
      "isPrivatePlacement": false,
      "es": {
        "categoryTag": "Energía Solar & O&G",
        "title": "Parque Solar 30 MW Vaca Muerta",
        "location": "Añelo, Neuquén, Argentina",
        "statusLabel": "USD 30M — Socio Inversor",
        "description": "Planta fotovoltaica de 30 MW emplazada en el corazón de la formación no convencional Vaca Muerta. Provisión directa de energía limpia y descarbonización para operaciones de operadoras petroleras y de servicios.",
        "thesis": "Generación distribuida de alta demanda en boca de yacimiento, reemplazando costosa generación térmica diésel con PPA industrial privado en USD y payback acelerado a 5 años.",
        "highlights": [
          "30 MW dedicados al suministro de energía renovable en Añelo / Vaca Muerta.",
          "Offtakers corporativos de primer nivel en el sector de petróleo y gas.",
          "Retorno de inversión acelerado en 5 años por alta competitividad frente al diésel.",
          "Reducción directa de emisiones de Alcance 2 para metas ESG de operadoras.",
          "Opción de ampliación modular por etapas sucesivas."
        ],
        "metrics": [
          {
            "label": "Inversión Final",
            "val": "USD 30M",
            "color": "text-gold"
          },
          {
            "label": "Potencia",
            "val": "30 MW",
            "color": "text-cyan"
          },
          {
            "label": "ROI Estimado",
            "val": "5 Años",
            "color": "text-green"
          },
          {
            "label": "Modalidad",
            "val": "Socio Inversor",
            "color": "text-gold"
          }
        ]
      },
      "en": {
        "categoryTag": "Solar & O&G Decarbonization",
        "title": "30 MW Vaca Muerta Solar Park",
        "location": "Añelo, Neuquén, Argentina",
        "statusLabel": "USD 30M — Equity Partner",
        "description": "30 MW PV solar plant strategically positioned in Añelo, the core of Vaca Muerta shale play. Direct clean power supply to O&G operators replacing diesel generation.",
        "thesis": "Fast 5-year payback backed by private industrial USD offtake agreements and critical ESG impact for shale drilling clusters.",
        "highlights": [
          "30 MW dedicated to Vaca Muerta oilfield operations.",
          "Direct industrial USD PPA with tier-1 O&G operators.",
          "Accelerated 5-year payback substituting expensive diesel power.",
          "Direct Scope 2 carbon footprint abatement.",
          "Modular scalable architecture."
        ],
        "metrics": [
          {
            "label": "Final Ticket",
            "val": "USD 30M",
            "color": "text-gold"
          },
          {
            "label": "Capacity",
            "val": "30 MW",
            "color": "text-cyan"
          },
          {
            "label": "Est. ROI",
            "val": "5 Years",
            "color": "text-green"
          },
          {
            "label": "Deal Type",
            "val": "Equity Partner",
            "color": "text-gold"
          }
        ]
      }
    },
    {
      "id": "solar",
      "title": "Plantas Solares Llave en Mano con Financiamiento Asegurado",
      "sector": "Energía Solar & Renovable",
      "basePrice": 50000000,
      "overpriceTarget": 2500000,
      "currency": "USD",
      "status": "activo",
      "ownerId": "user_javier",
      "ownerName": "Javier Ignacio Díaz",
      "ownerType": "mandatario_exclusivo",
      "description": "Desarrollo estratégico de parques fotovoltaicos llave en mano con el 50% del CAPEX pre-financiado por fabricante líder global de paneles e inversores. Contratos PPA a 15-20 años indexados al USD.",
      "modality": "EPC Llave en Mano",
      "roi": "6 Años",
      "statusProgress": "Ready to Build con co-financiamiento asegurado por fabricante Tier 1",
      "driveFolderUrl": "https://drive.google.com/drive/u/0/folders/inventario-energycpy-solar",
      "createdAt": "2026-10-21",
      "assignedAgent": "javier",
      "amountDisplay": "USD 50M (50% Pre-Financiado)",
      "isPrivatePlacement": false,
      "es": {
        "categoryTag": "Energía Solar Fotovoltaica",
        "title": "Plantas Solares Llave en Mano con Financiamiento Asegurado",
        "location": "Cuyo y NOA, Argentina",
        "statusLabel": "Co-Financiado 50% CAPEX",
        "description": "Desarrollo estratégico de parques fotovoltaicos llave en mano con el 50% del CAPEX pre-financiado por fabricante líder global de paneles e inversores. Contratos PPA a 15-20 años indexados al USD.",
        "thesis": "Estructura de co-inversión que minimiza el capital inicial y maximiza la TIR mediante financiamiento directo del proveedor tecnológico internacional.",
        "highlights": [
          "50% del CAPEX pre-financiado directamente por fabricante global.",
          "Contratos PPA indexados al Dólar estadounidense a 15-20 años.",
          "Recurso solar excepcional en Cuyo y NOA con factor líder.",
          "Contrato EPC llave en mano con costos y plazos cerrados y garantizados.",
          "Garantía de rendimiento y mantenimiento integral bajo contratos O&M."
        ],
        "metrics": [
          {
            "label": "Co-Financiamiento",
            "val": "50% CAPEX",
            "color": "text-gold"
          },
          {
            "label": "Plazo PPA",
            "val": "15 - 20 Años",
            "color": "text-cyan"
          },
          {
            "label": "Mercado",
            "val": "MATER / CAMMESA",
            "color": "text-green"
          },
          {
            "label": "Modalidad",
            "val": "EPC Llave en Mano",
            "color": "text-gold"
          }
        ]
      },
      "en": {
        "categoryTag": "Photovoltaic Solar Energy",
        "title": "Turnkey Solar Plants with Secured Co-Financing",
        "location": "Cuyo & NOA Regions, Argentina",
        "statusLabel": "50% Co-Financed CAPEX",
        "description": "Strategic turnkey solar park developments with 50% of CAPEX pre-financed by a world-leading PV manufacturer. Long-term PPA contracts (15 to 20 years) indexed to USD.",
        "thesis": "Co-investment architecture minimizing upfront equity and maximizing equity IRR through vendor financing.",
        "highlights": [
          "50% of CAPEX pre-financed directly by top-tier global manufacturer.",
          "USD-indexed PPA contracts with 15 to 20 years duration.",
          "Exceptional solar irradiance in Cuyo & NOA regions.",
          "Turnkey EPC agreement with guaranteed fixed cost.",
          "Guaranteed performance metrics and preventative O&M."
        ],
        "metrics": [
          {
            "label": "Co-Financing",
            "val": "50% CAPEX",
            "color": "text-gold"
          },
          {
            "label": "PPA Term",
            "val": "15 - 20 Yrs USD",
            "color": "text-cyan"
          },
          {
            "label": "Target Market",
            "val": "MATER / CAMMESA",
            "color": "text-green"
          },
          {
            "label": "Delivery",
            "val": "Turnkey EPC",
            "color": "text-gold"
          }
        ]
      }
    },
    {
      "id": "hotel-casino-mendoza-3s",
      "title": "Hotel 3 Estrellas + Casino + Salón de Eventos",
      "sector": "Hotelería & Renta",
      "basePrice": 40000000,
      "overpriceTarget": 2500000,
      "currency": "USD",
      "status": "activo",
      "ownerId": "user_daniel",
      "ownerName": "Daniel González",
      "ownerType": "mandatario_exclusivo",
      "description": "Complejo hotelero de 3 estrellas en funcionamiento pleno con sala de casino equipada y habilitación provincial. Cuenta con salón de eventos corporativos y sociales con alta demanda turística internacional.",
      "modality": "Venta",
      "roi": "1 Año",
      "statusProgress": "Activo operativo en marcha con flujo consolidado y licencias de juego vigentes",
      "driveFolderUrl": "https://drive.google.com/drive/u/0/folders/inventario-energycpy-hotel-casino-mendoza-3s",
      "createdAt": "2026-10-21",
      "assignedAgent": "daniel",
      "amountDisplay": "USD 40M",
      "isPrivatePlacement": false,
      "es": {
        "categoryTag": "Hotelería & Casino",
        "title": "Hotel 3 Estrellas + Casino + Salón de Eventos",
        "location": "Mendoza, Argentina",
        "statusLabel": "USD 40M — Venta Directa",
        "description": "Complejo hotelero de 3 estrellas en funcionamiento pleno con sala de casino equipada y habilitación provincial. Cuenta con salón de eventos corporativos y sociales con alta demanda turística internacional.",
        "thesis": "Extraordinario cash flow operativo derivado del juego y turismo vitivinícola, generando un retorno de capital estimado en 1 año sobre el valor de venta del activo.",
        "highlights": [
          "Hotel de 3 estrellas operativo con sólida tasa de ocupación anual.",
          "Licencia y explotación activa de casino con alto flujo de caja en efectivo.",
          "Salón de eventos de gran capacidad para turismo MICE y convenciones.",
          "Retorno de inversión sin precedentes proyectado en 1 año.",
          "Venta del 100% del activo inmobiliario y paquete comercial sin pasivos."
        ],
        "metrics": [
          {
            "label": "Inversión Final",
            "val": "USD 40M",
            "color": "text-gold"
          },
          {
            "label": "Tipo Activo",
            "val": "Hotel 3★ + Casino",
            "color": "text-cyan"
          },
          {
            "label": "ROI Estimado",
            "val": "1 Año",
            "color": "text-green"
          },
          {
            "label": "Modalidad",
            "val": "Venta Directa",
            "color": "text-gold"
          }
        ]
      },
      "en": {
        "categoryTag": "Hospitality & Casino",
        "title": "3-Star Hotel + Casino + Event Convention Center",
        "location": "Mendoza, Argentina",
        "statusLabel": "USD 40M — Asset Sale",
        "description": "Operational 3-star hotel complex featuring an active licensed casino hall and convention center. Strong year-round occupancy supported by Mendoza's wine and gaming tourism.",
        "thesis": "Exceptional cash flow from gaming operations delivering a projected 1-year payback on enterprise asset value.",
        "highlights": [
          "Fully operational 3-star hotel with solid occupancy history.",
          "Active gaming casino license with high daily cash flow.",
          "Large convention hall catering to corporate and social events.",
          "Unprecedented 1-year projected payback.",
          "Clean title and corporate structure with zero debt."
        ],
        "metrics": [
          {
            "label": "Final Ticket",
            "val": "USD 40M",
            "color": "text-gold"
          },
          {
            "label": "Asset Type",
            "val": "Hotel 3★ + Casino",
            "color": "text-cyan"
          },
          {
            "label": "Est. ROI",
            "val": "1 Year",
            "color": "text-green"
          },
          {
            "label": "Deal Type",
            "val": "Direct Sale",
            "color": "text-gold"
          }
        ]
      }
    },
    {
      "id": "hotel-casino-mendoza-5s",
      "title": "Hotel 5 Estrellas (72 Habitaciones) + Casino + Cocheras",
      "sector": "Hotelería & Renta",
      "basePrice": 60000000,
      "overpriceTarget": 3500000,
      "currency": "USD",
      "status": "activo",
      "ownerId": "user_daniel",
      "ownerName": "Daniel González",
      "ownerType": "mandatario_exclusivo",
      "description": "Exclusivo hotel de 5 estrellas con 72 habitaciones de alta gama, casino privado en operación, restaurante gourmet, spa y estacionamiento subterráneo en la mejor ubicación de Mendoza.",
      "modality": "Venta",
      "roi": "1 Año",
      "statusProgress": "Hotel 5 estrellas de lujo en operación con sala de juego y cocheras",
      "driveFolderUrl": "https://drive.google.com/drive/u/0/folders/inventario-energycpy-hotel-casino-mendoza-5s",
      "createdAt": "2026-10-21",
      "assignedAgent": "daniel",
      "amountDisplay": "USD 60M",
      "isPrivatePlacement": false,
      "es": {
        "categoryTag": "Hotelería de Lujo & Casino",
        "title": "Hotel 5 Estrellas (72 Habitaciones) + Casino + Cocheras",
        "location": "Mendoza, Argentina",
        "statusLabel": "USD 60M — Venta Directa",
        "description": "Exclusivo hotel de 5 estrellas con 72 habitaciones de alta gama, casino privado en operación, restaurante gourmet, spa y estacionamiento subterráneo en la mejor ubicación de Mendoza.",
        "thesis": "Activo trophy de alta rentabilidad con tarifa promedio diaria (ADR) dolarizada, clientela internacional y un ROI extraordinario de 1 año traccionado por la sala de casino.",
        "highlights": [
          "72 habitaciones y suites de lujo totalmente equipadas con amenities de 5 estrellas.",
          "Casino de alta categoría en funcionamiento con licencias y equipamiento de última generación.",
          "Edificio icónico con cocheras subterráneas y salones ejecutivos.",
          "Retorno acelerado en 1 año respaldado por el flujo de caja del casino y hotelería.",
          "Operación llave en mano con personal calificado y marca consolidada."
        ],
        "metrics": [
          {
            "label": "Inversión Final",
            "val": "USD 60M",
            "color": "text-gold"
          },
          {
            "label": "Habitaciones",
            "val": "72 Suites 5★",
            "color": "text-cyan"
          },
          {
            "label": "ROI Estimado",
            "val": "1 Año",
            "color": "text-green"
          },
          {
            "label": "Modalidad",
            "val": "Venta Directa",
            "color": "text-gold"
          }
        ]
      },
      "en": {
        "categoryTag": "Luxury Hospitality & Casino",
        "title": "5-Star Hotel (72 Rooms) + Casino + Underground Parking",
        "location": "Mendoza, Argentina",
        "statusLabel": "USD 60M — Asset Sale",
        "description": "Premier 5-star boutique hotel featuring 72 luxury rooms, operational private casino, fine dining restaurant, luxury spa, and private parking in prime Mendoza.",
        "thesis": "Trophy asset with strong USD average daily rates and high-margin casino revenue driving a projected 1-year capital payback.",
        "highlights": [
          "72 luxury suites with complete 5-star amenities.",
          "High-end operational casino with modern gaming licenses.",
          "Prime architectural building with underground parking.",
          "Rapid 1-year payback backed by combined hotel and gaming cash flows.",
          "Turnkey management and established reputation."
        ],
        "metrics": [
          {
            "label": "Final Ticket",
            "val": "USD 60M",
            "color": "text-gold"
          },
          {
            "label": "Rooms",
            "val": "72 Suites 5★",
            "color": "text-cyan"
          },
          {
            "label": "Est. ROI",
            "val": "1 Year",
            "color": "text-green"
          },
          {
            "label": "Deal Type",
            "val": "Direct Sale",
            "color": "text-gold"
          }
        ]
      }
    },
    {
      "id": "hotel-lujo-bariloche",
      "title": "Venta Exclusiva a Invitación — Hotel de Lujo en Bariloche",
      "sector": "Hotelería & Renta",
      "basePrice": 0,
      "overpriceTarget": 0,
      "currency": "USD",
      "status": "activo",
      "ownerId": "user_daniel",
      "ownerName": "Daniel González",
      "ownerType": "mandatario_exclusivo",
      "description": "Emblemático hotel de ultra-lujo situado en un entorno natural privilegiado en Bariloche, Patagonia. Comercialización off-market reservada exclusivamente para inversores calificados bajo estricto acuerdo de confidencialidad (NDA).",
      "modality": "Venta Exclusiva a Invitación",
      "roi": "Confidencial",
      "statusProgress": "Operación off-market estrictamente confidencial disponible solo bajo NDA firmado",
      "driveFolderUrl": "https://drive.google.com/drive/u/0/folders/inventario-energycpy-hotel-lujo-bariloche",
      "createdAt": "2026-10-21",
      "assignedAgent": "daniel",
      "amountDisplay": "A Invitación Exclusiva",
      "isPrivatePlacement": true,
      "es": {
        "categoryTag": "Private Placement — Gran Lujo",
        "title": "Venta Exclusiva a Invitación — Hotel de Lujo en Bariloche",
        "location": "San Carlos de Bariloche, Patagonia, Argentina",
        "statusLabel": "🔒 Private Placement Off-Market",
        "description": "Emblemático hotel de ultra-lujo situado en un entorno natural privilegiado en Bariloche, Patagonia. Comercialización off-market reservada exclusivamente para inversores calificados bajo estricto acuerdo de confidencialidad (NDA).",
        "thesis": "Activo hotelero trofeo sin equivalentes en la Patagonia, con vistas directas al lago y clientela internacional de alto poder adquisitivo. Datos financieros y dossier disponibles únicamente a invitación.",
        "highlights": [
          "Venta off-market estrictamente confidencial (sin publicación de montos en web).",
          "Ubicación irrepetible con vistas panorámicas al lago y arquitectura patagónica.",
          "Instalaciones de máxima jerarquía hotelera internacional.",
          "Acceso al Data Room y estados contables supeditado a calificación previa y NDA.",
          "Acompañamiento personalizado directo con la dirección de Energy CPY."
        ],
        "metrics": [
          {
            "label": "Modalidad",
            "val": "Private Placement",
            "color": "text-gold"
          },
          {
            "label": "Categoría",
            "val": "Ultra Lujo",
            "color": "text-cyan"
          },
          {
            "label": "Acceso",
            "val": "Bajo NDA",
            "color": "text-green"
          },
          {
            "label": "Estado",
            "val": "Venta Exclusiva",
            "color": "text-gold"
          }
        ]
      },
      "en": {
        "categoryTag": "Private Placement — Ultra Luxury",
        "title": "Exclusive Invitation Sale — Luxury Hotel in Bariloche",
        "location": "Bariloche, Patagonia, Argentina",
        "statusLabel": "🔒 Private Placement Off-Market",
        "description": "Iconic ultra-luxury hotel situated in a prime natural setting in Bariloche, Patagonia. Off-market transaction available exclusively to qualified investors under non-disclosure agreement (NDA).",
        "thesis": "Irreplaceable trophy asset with direct lakefront views and elite international patronage. Financial dossier available strictly upon invitation.",
        "highlights": [
          "Strictly confidential off-market sale (no public financial figures).",
          "Irreplaceable lakefront location with signature Andean architecture.",
          "Highest tier of international hospitality standards.",
          "Data room access granted exclusively following investor verification and signed NDA.",
          "Direct confidential advisory with Energy CPY executives."
        ],
        "metrics": [
          {
            "label": "Deal Structure",
            "val": "Private Placement",
            "color": "text-gold"
          },
          {
            "label": "Category",
            "val": "Ultra Luxury",
            "color": "text-cyan"
          },
          {
            "label": "Access",
            "val": "Under NDA",
            "color": "text-green"
          },
          {
            "label": "Status",
            "val": "Exclusive Sale",
            "color": "text-gold"
          }
        ]
      }
    },
    {
      "id": "hotel-lujo-cordoba",
      "title": "Venta Exclusiva a Invitación — Hotel de Lujo en Córdoba",
      "sector": "Hotelería & Renta",
      "basePrice": 0,
      "overpriceTarget": 0,
      "currency": "USD",
      "status": "activo",
      "ownerId": "user_daniel",
      "ownerName": "Daniel González",
      "ownerType": "mandatario_exclusivo",
      "description": "Distinguido establecimiento hotelero de máxima jerarquía en la provincia de Córdoba. Operación off-market de colocación privada sin mención de estudios financieros públicos, orientada a grupos selectos.",
      "modality": "Venta Exclusiva a Invitación",
      "roi": "Confidencial",
      "statusProgress": "Operación off-market estrictamente confidencial disponible solo bajo NDA firmado",
      "driveFolderUrl": "https://drive.google.com/drive/u/0/folders/inventario-energycpy-hotel-lujo-cordoba",
      "createdAt": "2026-10-21",
      "assignedAgent": "daniel",
      "amountDisplay": "A Invitación Exclusiva",
      "isPrivatePlacement": true,
      "es": {
        "categoryTag": "Private Placement — Gran Lujo",
        "title": "Venta Exclusiva a Invitación — Hotel de Lujo en Córdoba",
        "location": "Córdoba, Argentina",
        "statusLabel": "🔒 Private Placement Off-Market",
        "description": "Distinguido establecimiento hotelero de máxima jerarquía en la provincia de Córdoba. Operación off-market de colocación privada sin mención de estudios financieros públicos, orientada a grupos selectos.",
        "thesis": "Patrimonio arquitectónico e inmobiliario de primer orden con posicionamiento líder en turismo corporativo y eventos de alta gama en el centro del país.",
        "highlights": [
          "Venta off-market de colocación privada mediante invitación.",
          "Instalaciones de primer nivel para congresos internacionales y hotelería premium.",
          "Historial de ocupación y marca consolidada en la región central.",
          "Entrega de memorias económicas y técnicas supeditada a firma de NDA formal.",
          "Atención directa y reservada por parte del consultor a cargo."
        ],
        "metrics": [
          {
            "label": "Modalidad",
            "val": "Private Placement",
            "color": "text-gold"
          },
          {
            "label": "Categoría",
            "val": "Gran Lujo",
            "color": "text-cyan"
          },
          {
            "label": "Acceso",
            "val": "Bajo NDA",
            "color": "text-green"
          },
          {
            "label": "Estado",
            "val": "Venta Exclusiva",
            "color": "text-gold"
          }
        ]
      },
      "en": {
        "categoryTag": "Private Placement — Ultra Luxury",
        "title": "Exclusive Invitation Sale — Luxury Hotel in Córdoba",
        "location": "Córdoba, Argentina",
        "statusLabel": "🔒 Private Placement Off-Market",
        "description": "Distinguished premier luxury hotel in Córdoba province. Private placement off-market transaction without public financial figures, tailored for select institutional groups.",
        "thesis": "Prime architectural and real estate asset leading in executive tourism and major corporate conventions in Central Argentina.",
        "highlights": [
          "Private placement off-market transaction by direct invitation.",
          "State-of-the-art facilities for international conventions and luxury lodging.",
          "Proven historical occupancy and distinguished regional brand.",
          "Economic and operational disclosures released exclusively upon signed NDA.",
          "Confidential engagement directly with senior partners."
        ],
        "metrics": [
          {
            "label": "Deal Structure",
            "val": "Private Placement",
            "color": "text-gold"
          },
          {
            "label": "Category",
            "val": "Grand Luxury",
            "color": "text-cyan"
          },
          {
            "label": "Access",
            "val": "Under NDA",
            "color": "text-green"
          },
          {
            "label": "Status",
            "val": "Exclusive Sale",
            "color": "text-gold"
          }
        ]
      }
    },
    {
      "id": "estancia-17000ha-riego",
      "title": "Estancia 17.000 Hectáreas con Riego en Zona Turística",
      "sector": "Agro, Campo & Industria",
      "basePrice": 60000000,
      "overpriceTarget": 3500000,
      "currency": "USD",
      "status": "activo",
      "ownerId": "user_javier",
      "ownerName": "Javier Ignacio Díaz",
      "ownerType": "mandatario_exclusivo",
      "description": "Extraordinario establecimiento agropecuario de 17.000 hectáreas con infraestructura completa de riego presurizado instalada. Emplazado en una comarca de alto valor paisajístico y turístico en la región centro del país.",
      "modality": "Venta",
      "roi": "2 Años",
      "statusProgress": "Establecimiento productivo en marcha con pivotes de riego y títulos perfectos",
      "driveFolderUrl": "https://drive.google.com/drive/u/0/folders/inventario-energycpy-estancia-17000ha-riego",
      "createdAt": "2026-10-21",
      "assignedAgent": "javier",
      "amountDisplay": "USD 60M",
      "isPrivatePlacement": false,
      "es": {
        "categoryTag": "Agroindustria & Tierras",
        "title": "Estancia 17.000 Hectáreas con Riego en Zona Turística",
        "location": "Región Centro, Argentina",
        "statusLabel": "USD 60M — Venta",
        "description": "Extraordinario establecimiento agropecuario de 17.000 hectáreas con infraestructura completa de riego presurizado instalada. Emplazado en una comarca de alto valor paisajístico y turístico en la región centro del país.",
        "thesis": "Combinación inusual de alta productividad agrícola bajo riego con formidable plusvalía inmobiliaria y turística, permitiendo un recupero acelerado en 2 años.",
        "highlights": [
          "17.000 hectáreas con aptitud mixta y módulos de riego de alta tecnología.",
          "Ubicación privilegiada en zona turística de rápida valorización territorial.",
          "Rápido recupero proyectado a 2 años mediante cultivos intensivos y desarrollos asociados.",
          "Infraestructura completa: casco, galpones, corrales, caminos internos y electrificación.",
          "Títulos de propiedad consolidados y posesión inmediata sin pasivos."
        ],
        "metrics": [
          {
            "label": "Inversión Final",
            "val": "USD 60M",
            "color": "text-gold"
          },
          {
            "label": "Superficie",
            "val": "17.000 Ha",
            "color": "text-cyan"
          },
          {
            "label": "ROI Estimado",
            "val": "2 Años",
            "color": "text-green"
          },
          {
            "label": "Modalidad",
            "val": "Venta Directa",
            "color": "text-gold"
          }
        ]
      },
      "en": {
        "categoryTag": "Agribusiness & Prime Land",
        "title": "17,000-Hectare Irrigated Ranch in Prime Tourist Area",
        "location": "Central Region, Argentina",
        "statusLabel": "USD 60M — Asset Sale",
        "description": "Exceptional 17,000-hectare agricultural estate equipped with extensive pressurized irrigation infrastructure, located in a scenic and high-growth tourist corridor in Central Argentina.",
        "thesis": "Unique synergy of intensive irrigated crop yields and real estate capital appreciation offering a 2-year estimated capital return.",
        "highlights": [
          "17,000 hectares combining crop irrigation and pastoral land.",
          "Strategic setting in a fast-appreciating tourism and lifestyle zone.",
          "Rapid projected 2-year payback from high-yield crops and land upside.",
          "Full operational infrastructure: main house, sheds, power, and road network.",
          "Clear titles and immediate handover with zero encumbrances."
        ],
        "metrics": [
          {
            "label": "Final Ticket",
            "val": "USD 60M",
            "color": "text-gold"
          },
          {
            "label": "Total Area",
            "val": "17,000 Ha",
            "color": "text-cyan"
          },
          {
            "label": "Est. ROI",
            "val": "2 Years",
            "color": "text-green"
          },
          {
            "label": "Deal Type",
            "val": "Direct Sale",
            "color": "text-gold"
          }
        ]
      }
    },
    {
      "id": "planta-avicola-avex",
      "title": "Planta Avícola + Red de Distribución Nacional (Avex)",
      "sector": "Agro, Campo & Industria",
      "basePrice": 5000000,
      "overpriceTarget": 500000,
      "currency": "USD",
      "status": "activo",
      "ownerId": "user_javier",
      "ownerName": "Javier Ignacio Díaz",
      "ownerType": "mandatario_exclusivo",
      "description": "Complejo agroindustrial avícola con habilitación SENASA para faena y despiece, complementado con red logística y comercial en las principales plazas del país. Búsqueda de socio inversor para reactivación y capital de trabajo.",
      "modality": "Socio Inversor",
      "roi": "7 Años",
      "statusProgress": "Planta frigorífica habilitada SENASA con red de distribución nacional estructurada",
      "driveFolderUrl": "https://drive.google.com/drive/u/0/folders/inventario-energycpy-planta-avicola-avex",
      "createdAt": "2026-10-21",
      "assignedAgent": "javier",
      "amountDisplay": "USD 5M",
      "isPrivatePlacement": false,
      "es": {
        "categoryTag": "Industria Frigorífica & Alimentos",
        "title": "Planta Avícola + Red de Distribución Nacional (Avex)",
        "location": "Río Cuarto, Córdoba, Argentina",
        "statusLabel": "USD 5M — Socio Inversor",
        "description": "Complejo agroindustrial avícola con habilitación SENASA para faena y despiece, complementado con red logística y comercial en las principales plazas del país. Búsqueda de socio inversor para reactivación y capital de trabajo.",
        "thesis": "Inversión de bajo ticket relativo (USD 5M) sobre activos tangibles de gran valor de reposición, generando un EBITDA sólido con retorno a 7 años.",
        "highlights": [
          "Planta de faena avícola con habilitaciones oficiales SENASA y capacidad instalada relevante.",
          "Red de comercialización y distribución nacional en canales mayoristas y minoristas.",
          "Socio inversor de USD 5M destinado a capital de giro y optimización de líneas de proceso.",
          "Retorno proyectado a 7 años respaldado por alta demanda de proteína animal.",
          "Excelente conectividad logística en el nudo de rutas de Río Cuarto, Córdoba."
        ],
        "metrics": [
          {
            "label": "Inversión Final",
            "val": "USD 5M",
            "color": "text-gold"
          },
          {
            "label": "Ubicación",
            "val": "Río Cuarto, Cba",
            "color": "text-cyan"
          },
          {
            "label": "ROI Estimado",
            "val": "7 Años",
            "color": "text-green"
          },
          {
            "label": "Modalidad",
            "val": "Socio Inversor",
            "color": "text-gold"
          }
        ]
      },
      "en": {
        "categoryTag": "Poultry & Food Processing",
        "title": "Poultry Processing Plant + National Distribution (Avex)",
        "location": "Río Cuarto, Córdoba, Argentina",
        "statusLabel": "USD 5M — Equity Partner",
        "description": "SENASA-certified poultry slaughter and processing facility with nationwide distribution channels. Seeking equity partner for operating capital and throughput reactivation.",
        "thesis": "Attractive entry ticket (USD 5M) securing substantial tangible industrial assets and predictable cash flows with 7-year capital recovery.",
        "highlights": [
          "Modern processing facility fully licensed by SENASA.",
          "Structured nationwide sales and refrigerated distribution network.",
          "USD 5M equity ticket targeted for working capital expansion.",
          "Solid 7-year projected ROI driven by steady protein market consumption.",
          "Prime logistic junction in Río Cuarto, central Argentina."
        ],
        "metrics": [
          {
            "label": "Final Ticket",
            "val": "USD 5M",
            "color": "text-gold"
          },
          {
            "label": "Location",
            "val": "Río Cuarto, Cba",
            "color": "text-cyan"
          },
          {
            "label": "Est. ROI",
            "val": "7 Years",
            "color": "text-green"
          },
          {
            "label": "Deal Type",
            "val": "Equity Partner",
            "color": "text-gold"
          }
        ]
      }
    },
    {
      "id": "mineria-diente-oro-verde",
      "title": "Yacimiento de Oro 'Diente Oro Verde'",
      "sector": "Minería",
      "basePrice": 60000000,
      "overpriceTarget": 3500000,
      "currency": "USD",
      "status": "activo",
      "ownerId": "user_javier",
      "ownerName": "Javier Ignacio Díaz",
      "ownerType": "mandatario_exclusivo",
      "description": "Propiedad minera de oro a certificar bajo código internacional canadiense NI 43-101. Posee importantes estructuras de vetas hidrotermales con leyes superficiales y en profundidad de alto interés comercial.",
      "modality": "Venta",
      "roi": "Activo Minero",
      "statusProgress": "Yacimiento aurífero a certificar bajo estándar internacional NI 43-101",
      "driveFolderUrl": "https://drive.google.com/drive/u/0/folders/inventario-energycpy-mineria-diente-oro-verde",
      "createdAt": "2026-10-21",
      "assignedAgent": "javier",
      "amountDisplay": "USD 60M",
      "isPrivatePlacement": false,
      "es": {
        "categoryTag": "Minería Metalífera — Oro",
        "title": "Yacimiento de Oro 'Diente Oro Verde'",
        "location": "San Luis, Argentina",
        "statusLabel": "USD 60M — Venta",
        "description": "Propiedad minera de oro a certificar bajo código internacional canadiense NI 43-101. Posee importantes estructuras de vetas hidrotermales con leyes superficiales y en profundidad de alto interés comercial.",
        "thesis": "Oportunidad de adquisición directa de un yacimiento aurífero en una provincia con tradición minera, ideal para empresas junior o intermedias con capacidad de exploración y cubicación.",
        "highlights": [
          "Yacimiento de oro con estudios previos y listo para certificación técnica NI 43-101.",
          "Estructuras mineralizadas continuas con potencial de explotación a cielo abierto y subterránea.",
          "Provincia con facilidades logísticas, red vial pavimentada y energía cercana.",
          "Venta del 100% de los derechos de explotación y mensura minera definitiva.",
          "Alto apalancamiento ante el ciclo alcista internacional del precio del oro."
        ],
        "metrics": [
          {
            "label": "Inversión Final",
            "val": "USD 60M",
            "color": "text-gold"
          },
          {
            "label": "Mineral",
            "val": "Oro (Au)",
            "color": "text-cyan"
          },
          {
            "label": "Estándar",
            "val": "A cert. NI 43-101",
            "color": "text-green"
          },
          {
            "label": "Modalidad",
            "val": "Venta Total",
            "color": "text-gold"
          }
        ]
      },
      "en": {
        "categoryTag": "Precious Metals — Gold",
        "title": "'Diente Oro Verde' Gold Deposit",
        "location": "San Luis, Argentina",
        "statusLabel": "USD 60M — Asset Sale",
        "description": "High-potential gold deposit prepared for international technical certification under NI 43-101 standard. Contains extensive hydrothermal vein structures with attractive grades.",
        "thesis": "Direct acquisition opportunity of a promising gold concession in a mining-friendly jurisdiction, perfectly positioned for junior or mid-tier exploration firms.",
        "highlights": [
          "Gold deposit ready for NI 43-101 technical report certification.",
          "Continuous mineralized structures suitable for open-pit and underground methods.",
          "Excellent regional infrastructure, paved access, and nearby grid power.",
          "100% ownership sale of granted mining concessions and survey titles.",
          "Direct exposure to the historic secular bull market in precious metals."
        ],
        "metrics": [
          {
            "label": "Final Ticket",
            "val": "USD 60M",
            "color": "text-gold"
          },
          {
            "label": "Commodity",
            "val": "Gold (Au)",
            "color": "text-cyan"
          },
          {
            "label": "Standard",
            "val": "NI 43-101 Path",
            "color": "text-green"
          },
          {
            "label": "Deal Type",
            "val": "100% Asset Sale",
            "color": "text-gold"
          }
        ]
      }
    },
    {
      "id": "mineria-marmol-san-luis",
      "title": "Canteras y Yacimiento de Mármol Ornamental",
      "sector": "Minería",
      "basePrice": 50000000,
      "overpriceTarget": 3000000,
      "currency": "USD",
      "status": "activo",
      "ownerId": "user_javier",
      "ownerName": "Javier Ignacio Díaz",
      "ownerType": "mandatario_exclusivo",
      "description": "Depósitos masivos de mármoles y rocas de aplicación de altísima calidad estética para la industria de la construcción y revestimientos premium. Reservas cubicadas listas para corte y extracción en bloques.",
      "modality": "Venta",
      "roi": "Activo Minero",
      "statusProgress": "Canteras con reservas cubicadas de roca de aplicación ornamental y bloques",
      "driveFolderUrl": "https://drive.google.com/drive/u/0/folders/inventario-energycpy-mineria-marmol-san-luis",
      "createdAt": "2026-10-21",
      "assignedAgent": "javier",
      "amountDisplay": "USD 50M",
      "isPrivatePlacement": false,
      "es": {
        "categoryTag": "Minería No Metalífera — Mármol",
        "title": "Canteras y Yacimiento de Mármol Ornamental",
        "location": "San Luis, Argentina",
        "statusLabel": "USD 50M — Venta",
        "description": "Depósitos masivos de mármoles y rocas de aplicación de altísima calidad estética para la industria de la construcción y revestimientos premium. Reservas cubicadas listas para corte y extracción en bloques.",
        "thesis": "Monopolio natural de variedades de mármol cotizadas en mercados de exportación (Europa, Medio Oriente y EE.UU.) con bajo costo de extracción y alto margen operativo.",
        "highlights": [
          "Yacimiento de mármol y travertino con frentes de cantera explorados y habilitados.",
          "Reservas masivas de bloques dimensionados para exportación y mercado interno.",
          "Bajo costo de explotación a cielo abierto con tecnología de corte con hilo diamantado.",
          "Títulos mineros consolidados sin litigios y permisos ambientales vigentes.",
          "Venta total del complejo extractivo por USD 50M."
        ],
        "metrics": [
          {
            "label": "Inversión Final",
            "val": "USD 50M",
            "color": "text-gold"
          },
          {
            "label": "Mineral",
            "val": "Mármol & Travertino",
            "color": "text-cyan"
          },
          {
            "label": "Destino",
            "val": "Exportación & Constr.",
            "color": "text-green"
          },
          {
            "label": "Modalidad",
            "val": "Venta Directa",
            "color": "text-gold"
          }
        ]
      },
      "en": {
        "categoryTag": "Industrial Minerals — Marble",
        "title": "Quarries & Ornamental Marble Deposit",
        "location": "San Luis, Argentina",
        "statusLabel": "USD 50M — Asset Sale",
        "description": "Extensive marble and dimensional stone deposits of superior aesthetic quality for luxury architecture and export markets. Large measured reserves ready for block quarrying.",
        "thesis": "Natural monopoly in prized marble varieties with competitive open-pit mining costs and high export margins to Europe and North America.",
        "highlights": [
          "Marble and travertine deposits with active and surveyed quarry faces.",
          "Massive measured reserves of dimensioned blocks for premium architecture.",
          "Cost-effective open-pit extraction using modern diamond-wire cutting.",
          "Clear mineral tenure with active environmental and provincial permits.",
          "Complete asset sale for USD 50M."
        ],
        "metrics": [
          {
            "label": "Final Ticket",
            "val": "USD 50M",
            "color": "text-gold"
          },
          {
            "label": "Commodity",
            "val": "Marble & Stone",
            "color": "text-cyan"
          },
          {
            "label": "Target",
            "val": "Export & Luxury",
            "color": "text-green"
          },
          {
            "label": "Deal Type",
            "val": "Direct Sale",
            "color": "text-gold"
          }
        ]
      }
    },
    {
      "id": "mineria-oro-san-juan",
      "title": "Yacimiento de Oro en Producción Inicial (28 ton/día)",
      "sector": "Minería",
      "basePrice": 150000000,
      "overpriceTarget": 8000000,
      "currency": "USD",
      "status": "activo",
      "ownerId": "user_javier",
      "ownerName": "Javier Ignacio Díaz",
      "ownerType": "mandatario_exclusivo",
      "description": "Mina de oro en producción operativa inicial a razón de 28 toneladas diarias procesadas. Convocatoria a socio inversor estratégico para inyectar entre USD 100M y USD 200M para escalamiento de planta y lixiviación.",
      "modality": "Socio Inversor",
      "roi": "En Producción",
      "statusProgress": "Yacimiento en producción inicial (28 t/d) buscando capital para ampliación de planta",
      "driveFolderUrl": "https://drive.google.com/drive/u/0/folders/inventario-energycpy-mineria-oro-san-juan",
      "createdAt": "2026-10-21",
      "assignedAgent": "javier",
      "amountDisplay": "USD 100M - 200M",
      "isPrivatePlacement": false,
      "es": {
        "categoryTag": "Minería de Oro — Producción",
        "title": "Yacimiento de Oro en Producción Inicial (28 ton/día)",
        "location": "San Juan, Argentina",
        "statusLabel": "USD 100M-200M — Socio Inversor",
        "description": "Mina de oro en producción operativa inicial a razón de 28 toneladas diarias procesadas. Convocatoria a socio inversor estratégico para inyectar entre USD 100M y USD 200M para escalamiento de planta y lixiviación.",
        "thesis": "Des-riesgo técnico comprobado al encontrarse ya en explotación activa en San Juan, la provincia minera por excelencia de Argentina. Rápido incremento de rentabilidad al multiplicar la escala.",
        "highlights": [
          "Operación aurífera activa con planta de procesamiento en marcha (28 ton/día).",
          "San Juan: Jurisdicción líder en estabilidad legal e institucional para minería.",
          "Estructuración de capital (USD 100M a 200M) para ampliación de capacidad de beneficio.",
          "Flujo de caja positivo inmediato y reservas en expansión continua.",
          "Modelo de socio inversor con participación societaria y derechos de offtake de oro."
        ],
        "metrics": [
          {
            "label": "Rango Inversión",
            "val": "USD 100M - 200M",
            "color": "text-gold"
          },
          {
            "label": "Producción Actual",
            "val": "28 Ton / Día",
            "color": "text-cyan"
          },
          {
            "label": "Provincia",
            "val": "San Juan",
            "color": "text-green"
          },
          {
            "label": "Modalidad",
            "val": "Socio Inversor",
            "color": "text-gold"
          }
        ]
      },
      "en": {
        "categoryTag": "Gold Mining — Operating",
        "title": "Gold Mine in Initial Production (28 tons/day)",
        "location": "San Juan, Argentina",
        "statusLabel": "USD 100M-200M — Equity Partner",
        "description": "Operating gold mine currently processing 28 tons/day. Seeking strategic equity partner to deploy USD 100M to 200M for plant expansion, milling, and leaching facilities.",
        "thesis": "De-risked operating asset in San Juan, Argentina's leading mining jurisdiction. Substantial economies of scale upon processing capacity expansion.",
        "highlights": [
          "Active gold mining operation with processing plant handling 28 tons/day.",
          "San Juan: Top-tier Argentine mining jurisdiction with solid legal backing.",
          "Capital call of USD 100M-200M to multiply milling and leaching throughput.",
          "Immediate positive operational cash flow with ongoing resource expansion.",
          "Equity partnership model with gold off-take and board participation."
        ],
        "metrics": [
          {
            "label": "Investment Range",
            "val": "USD 100M - 200M",
            "color": "text-gold"
          },
          {
            "label": "Current Output",
            "val": "28 Tons / Day",
            "color": "text-cyan"
          },
          {
            "label": "Jurisdiction",
            "val": "San Juan",
            "color": "text-green"
          },
          {
            "label": "Deal Type",
            "val": "Equity Partner",
            "color": "text-gold"
          }
        ]
      }
    },
    {
      "id": "mineria-litio-catamarca",
      "title": "Yacimiento de Litio — Estudios de Exploración OK",
      "sector": "Minería",
      "basePrice": 11000000,
      "overpriceTarget": 1000000,
      "currency": "USD",
      "status": "activo",
      "ownerId": "user_javier",
      "ownerName": "Javier Ignacio Díaz",
      "ownerType": "mandatario_exclusivo",
      "description": "Concesión minera de salmueras de litio en la puna de Catamarca (Triángulo del Litio). Campaña exploratoria inicial completada con éxito (geofísica y sondeos geoquímicos con excelentes relaciones Mg/Li).",
      "modality": "Venta",
      "roi": "Exploración OK",
      "statusProgress": "Estudios de exploración geoquímica y geofísica concluidos con dictamen favorable",
      "driveFolderUrl": "https://drive.google.com/drive/u/0/folders/inventario-energycpy-mineria-litio-catamarca",
      "createdAt": "2026-10-21",
      "assignedAgent": "javier",
      "amountDisplay": "USD 11M",
      "isPrivatePlacement": false,
      "es": {
        "categoryTag": "Minería de Litio — Salmueras",
        "title": "Yacimiento de Litio — Estudios de Exploración OK",
        "location": "Catamarca, Argentina",
        "statusLabel": "USD 11M — Venta",
        "description": "Concesión minera de salmueras de litio en la puna de Catamarca (Triángulo del Litio). Campaña exploratoria inicial completada con éxito (geofísica y sondeos geoquímicos con excelentes relaciones Mg/Li).",
        "thesis": "Entrada estratégica de bajo ticket (USD 11M) en un salar de alta ley, con saneamiento legal total y listo para perforación de pozos y estimación de recursos NI 43-101.",
        "highlights": [
          "Ubicación en el epicentro mundial de salmueras de litio en Catamarca.",
          "Estudios de exploración geoeléctrica y muestreos hidroquímicos concluidos (OK).",
          "Baja relación magnesio/litio favoreciendo procesos de precipitación química directa.",
          "Título de propiedad minera perfecto y canon al día.",
          "Venta total por USD 11M, ideal para fondos de recursos naturales o desarrolladores de baterías."
        ],
        "metrics": [
          {
            "label": "Inversión Final",
            "val": "USD 11M",
            "color": "text-gold"
          },
          {
            "label": "Mineral",
            "val": "Litio (Li)",
            "color": "text-cyan"
          },
          {
            "label": "Estado",
            "val": "Exploración OK",
            "color": "text-green"
          },
          {
            "label": "Modalidad",
            "val": "Venta Directa",
            "color": "text-gold"
          }
        ]
      },
      "en": {
        "categoryTag": "Critical Minerals — Lithium",
        "title": "Lithium Brine Deposit — Exploration OK",
        "location": "Catamarca, Argentina",
        "statusLabel": "USD 11M — Asset Sale",
        "description": "Lithium brine mining concession located in the Catamarca Puna within the global Lithium Triangle. Preliminary exploration campaign successfully completed with favorable Mg/Li ratios.",
        "thesis": "Low-entry ticket (USD 11M) in a premium salar basin with clean legal status, ready for resource drilling and NI 43-101 resource estimation.",
        "highlights": [
          "Located in the world-class Catamarca lithium brine basin.",
          "Geophysical and hydrogeochemical exploratory studies confirmed (OK).",
          "Favorable magnesium-to-lithium ratio enabling low processing OPEX.",
          "Clear legal title with mining cadastre fees in full standing.",
          "100% asset sale for USD 11M, ideal for battery metal developers."
        ],
        "metrics": [
          {
            "label": "Final Ticket",
            "val": "USD 11M",
            "color": "text-gold"
          },
          {
            "label": "Commodity",
            "val": "Lithium (Li)",
            "color": "text-cyan"
          },
          {
            "label": "Stage",
            "val": "Exploration OK",
            "color": "text-green"
          },
          {
            "label": "Deal Type",
            "val": "Direct Sale",
            "color": "text-gold"
          }
        ]
      }
    },
    {
      "id": "refipampa-medanito",
      "title": "Venta Refipampa y Yacimiento Medanito (500 Pozos)",
      "sector": "Petróleo, Gas & Infraestructura",
      "basePrice": 180000000,
      "overpriceTarget": 10000000,
      "currency": "USD",
      "status": "activo",
      "ownerId": "user_daniel",
      "ownerName": "Daniel González",
      "ownerType": "mandatario_exclusivo",
      "description": "Operación downstream y upstream integrada: refinería Refipampa procesando 750 m³/día con expansión proyectada a 3.000 m³/día y yacimiento Medanito con 500 pozos en producción activa. Data Room listo para auditoría inmediata.",
      "modality": "Venta",
      "roi": "En Producción",
      "statusProgress": "Refinería activa 750 m³/d (proy. 3.000 m³/d), 500 pozos en Medanito y Data Room listo",
      "driveFolderUrl": "https://drive.google.com/drive/u/0/folders/inventario-energycpy-refipampa-medanito",
      "createdAt": "2026-10-21",
      "assignedAgent": "daniel",
      "amountDisplay": "USD 180M",
      "isPrivatePlacement": false,
      "es": {
        "categoryTag": "Petróleo & Refinación Integrada",
        "title": "Venta Refipampa y Yacimiento Medanito (500 Pozos)",
        "location": "La Pampa / Cuenca Neuquina, Argentina",
        "statusLabel": "USD 180M — Venta Inmediata",
        "description": "Operación downstream y upstream integrada: refinería Refipampa procesando 750 m³/día con expansión proyectada a 3.000 m³/día y yacimiento Medanito con 500 pozos en producción activa. Data Room listo para auditoría inmediata.",
        "thesis": "Adquisición de un operador integrado con refinería propia, red de despacho y suministro asegurado de crudo liviano de Cuenca Neuquina por USD 180M.",
        "highlights": [
          "Refinería Refipampa operativa: 750 m³/día actual con proyecto a 3.000 m³/día.",
          "Yacimiento Medanito: 500 pozos productores con reservas y concesión vigente.",
          "Data Room completo y actualizado listo para Due Diligence de cierre rápido.",
          "Cadena de valor integrada desde boca de pozo hasta expendio de combustibles.",
          "Venta del paquete de control por USD 180M."
        ],
        "metrics": [
          {
            "label": "Inversión Final",
            "val": "USD 180M",
            "color": "text-gold"
          },
          {
            "label": "Refinería",
            "val": "750 a 3.000 m³/d",
            "color": "text-cyan"
          },
          {
            "label": "Pozos",
            "val": "500 Activos",
            "color": "text-green"
          },
          {
            "label": "Modalidad",
            "val": "Venta Total",
            "color": "text-gold"
          }
        ]
      },
      "en": {
        "categoryTag": "Integrated Oil & Refining",
        "title": "Refipampa Refinery & Medanito Field Sale (500 Wells)",
        "location": "La Pampa / Neuquina Basin, Argentina",
        "statusLabel": "USD 180M — Immediate Sale",
        "description": "Integrated upstream & downstream business: Refipampa refinery producing 750 m³/day with expansion plan to 3,000 m³/day, paired with Medanito field operating 500 producing wells. Complete Data Room ready for fast due diligence.",
        "thesis": "Turnkey acquisition of an integrated domestic energy player with dedicated refining capacity, logistics network, and secure crude supply.",
        "highlights": [
          "Refipampa operating refinery: 750 m³/day with expansion pipeline to 3,000 m³/day.",
          "Medanito oilfield: 500 active producing wells with established reserves.",
          "Fully populated and audited virtual Data Room ready for rapid closing.",
          "Integrated value chain from wellhead extraction to wholesale fuel delivery.",
          "100% controlling interest sale for USD 180M."
        ],
        "metrics": [
          {
            "label": "Final Ticket",
            "val": "USD 180M",
            "color": "text-gold"
          },
          {
            "label": "Refinery",
            "val": "750-3,000 m³/d",
            "color": "text-cyan"
          },
          {
            "label": "Wells",
            "val": "500 Active",
            "color": "text-green"
          },
          {
            "label": "Deal Type",
            "val": "Direct Sale",
            "color": "text-gold"
          }
        ]
      }
    },
    {
      "id": "refinor-salta",
      "title": "REFINOR — Complejo de Refinación y Poliductos NOA",
      "sector": "Petróleo, Gas & Infraestructura",
      "basePrice": 50000000,
      "overpriceTarget": 3000000,
      "currency": "USD",
      "status": "activo",
      "ownerId": "user_daniel",
      "ownerName": "Daniel González",
      "ownerType": "mandatario_exclusivo",
      "description": "Refinería estratégica en Campo Durán, Salta, con capacidad de procesamiento de 4.000 m³ diarios de crudo y condensados. Red troncal de poliductos y estaciones de carga asociadas para abastecimiento del NOA.",
      "modality": "Venta",
      "roi": "En Producción",
      "statusProgress": "Refinería activa en Campo Durán con capacidad de 4.000 m³/día y red de ductos",
      "driveFolderUrl": "https://drive.google.com/drive/u/0/folders/inventario-energycpy-refinor-salta",
      "createdAt": "2026-10-21",
      "assignedAgent": "daniel",
      "amountDisplay": "USD 50M",
      "isPrivatePlacement": false,
      "es": {
        "categoryTag": "Downstream & Poliductos",
        "title": "REFINOR — Complejo de Refinación y Poliductos NOA",
        "location": "Campo Durán, Salta, Argentina",
        "statusLabel": "USD 50M — Venta",
        "description": "Refinería estratégica en Campo Durán, Salta, con capacidad de procesamiento de 4.000 m³ diarios de crudo y condensados. Red troncal de poliductos y estaciones de carga asociadas para abastecimiento del NOA.",
        "thesis": "Adquisición a valuación de distress industrial (USD 50M) con gigantesca infraestructura instalada de destilación, ductos y logística regional insustituible.",
        "highlights": [
          "Capacidad instalada de refinación de 4.000 m³/día en el norte argentino.",
          "Red troncal propia de poliductos para transporte de combustibles y GLP.",
          "Posicionamiento estratégico en la frontera de gas y petróleo con Bolivia y Chile.",
          "Facilidades de almacenamiento masivo y despacho multimodal.",
          "Venta por USD 50M con enorme potencial de sinergia de crudos livianos."
        ],
        "metrics": [
          {
            "label": "Inversión Final",
            "val": "USD 50M",
            "color": "text-gold"
          },
          {
            "label": "Capacidad",
            "val": "4.000 m³/Día",
            "color": "text-cyan"
          },
          {
            "label": "Red",
            "val": "Poliductos NOA",
            "color": "text-green"
          },
          {
            "label": "Modalidad",
            "val": "Venta Directa",
            "color": "text-gold"
          }
        ]
      },
      "en": {
        "categoryTag": "Downstream & Pipelines",
        "title": "REFINOR — Refinery & Pipeline Complex NOA",
        "location": "Campo Durán, Salta, Argentina",
        "statusLabel": "USD 50M — Asset Sale",
        "description": "Strategic regional refinery in Campo Durán, Salta, with 4,000 m³/day processing capacity for crude and gas condensates. Features an extensive regional pipeline and fuel distribution network.",
        "thesis": "Opportunity to acquire critical energy infrastructure in Northern Argentina at an attractive valuation (USD 50M) with irreplaceable transport assets.",
        "highlights": [
          "Refining capacity of 4,000 m³/day in northern Argentina.",
          "Proprietary multi-product pipeline network for fuels and LPG.",
          "Strategic cross-border logistical hub near Bolivia and Chile.",
          "Extensive tank storage and multimodal rack distribution facilities.",
          "Attractive asset sale for USD 50M with major synergy upside."
        ],
        "metrics": [
          {
            "label": "Final Ticket",
            "val": "USD 50M",
            "color": "text-gold"
          },
          {
            "label": "Capacity",
            "val": "4,000 m³/Day",
            "color": "text-cyan"
          },
          {
            "label": "Logistics",
            "val": "NOA Pipelines",
            "color": "text-green"
          },
          {
            "label": "Deal Type",
            "val": "Direct Sale",
            "color": "text-gold"
          }
        ]
      }
    },
    {
      "id": "salta-garrido-25areas",
      "title": "Proyecto Salta - GARRIDO (25 Áreas de Explotación)",
      "sector": "Petróleo, Gas & Infraestructura",
      "basePrice": 1870000000,
      "overpriceTarget": 50000000,
      "currency": "USD",
      "status": "activo",
      "ownerId": "user_daniel",
      "ownerName": "Daniel González",
      "ownerType": "mandatario_exclusivo",
      "description": "Magno proyecto petrolero y gasífero que comprende 25 áreas de concesión adjudicadas por 20 años con opción de renovación en Salta. Búsqueda de socio inversor para plan maestro de USD 1.870M, con esquemas flexibles de participación por áreas o UTE.",
      "modality": "Socio Inversor",
      "roi": "20 Años Concesión",
      "statusProgress": "25 áreas hidrocarburíferas para explotación integral con concesión a 20 años renovable",
      "driveFolderUrl": "https://drive.google.com/drive/u/0/folders/inventario-energycpy-salta-garrido-25areas",
      "createdAt": "2026-10-21",
      "assignedAgent": "daniel",
      "amountDisplay": "USD 1.870M",
      "isPrivatePlacement": false,
      "es": {
        "categoryTag": "Upstream Hidrocarburos — 25 Áreas",
        "title": "Proyecto Salta - GARRIDO (25 Áreas de Explotación)",
        "location": "Cuenca Noroeste, Salta, Argentina",
        "statusLabel": "USD 1.870M — Socio Inversor / UTE",
        "description": "Magno proyecto petrolero y gasífero que comprende 25 áreas de concesión adjudicadas por 20 años con opción de renovación en Salta. Búsqueda de socio inversor para plan maestro de USD 1.870M, con esquemas flexibles de participación por áreas o UTE.",
        "thesis": "Consolidación de cuenca madura y bloques profundos con reservas de crudo liviano y gas natural, beneficiados por la reversión del Gasoducto Norte y exportaciones a Brasil.",
        "highlights": [
          "25 áreas de explotación hidrocarburífera con concesión legal a 20 años.",
          "Estructura de participación societaria flexible o UTE compartida por bloques.",
          "Reservas certificadas de crudo y gas con acceso a red troncal de transporte.",
          "Reversión del Gasoducto Norte que abre mercado premium de exportación a Brasil.",
          "Monto total de financiamiento: USD 1.870 Millones."
        ],
        "metrics": [
          {
            "label": "Inversión Total",
            "val": "USD 1.870M",
            "color": "text-gold"
          },
          {
            "label": "Concesiones",
            "val": "25 Áreas",
            "color": "text-cyan"
          },
          {
            "label": "Plazo",
            "val": "20 Años Renov.",
            "color": "text-green"
          },
          {
            "label": "Modalidad",
            "val": "Socio / UTE",
            "color": "text-gold"
          }
        ]
      },
      "en": {
        "categoryTag": "Upstream Oil & Gas — 25 Blocks",
        "title": "Salta - GARRIDO Project (25 Exploitation Blocks)",
        "location": "Northwest Basin, Salta, Argentina",
        "statusLabel": "USD 1,870M — Equity / JV Partner",
        "description": "Major hydrocarbon upstream development covering 25 licensed exploitation blocks for 20 renewable years in Salta. Seeking institutional partner for a USD 1.87B capex plan, open to block farm-outs or JV syndication.",
        "thesis": "Large-scale basin consolidation with proven sweet crude and natural gas reserves, strategically aligned with the Northern Gas Pipeline reversal towards Brazilian markets.",
        "highlights": [
          "25 oil and gas concession blocks with secure 20-year renewable licenses.",
          "Flexible corporate joint-venture models or shared block farm-ins.",
          "Certified crude and gas reserves with direct pipeline interconnection.",
          "Northern Pipeline reversal unlocking high-value export markets to Brazil.",
          "Total project capex: USD 1,870 Million."
        ],
        "metrics": [
          {
            "label": "Total Ticket",
            "val": "USD 1,870M",
            "color": "text-gold"
          },
          {
            "label": "Concessions",
            "val": "25 Blocks",
            "color": "text-cyan"
          },
          {
            "label": "Term",
            "val": "20 Yrs Renewable",
            "color": "text-green"
          },
          {
            "label": "Deal Type",
            "val": "JV / Farm-In",
            "color": "text-gold"
          }
        ]
      }
    },
    {
      "id": "palermo-aike-chubut",
      "title": "Desarrollo No Convencional Palermo Aike Chubut",
      "sector": "Petróleo, Gas & Infraestructura",
      "basePrice": 200000000,
      "overpriceTarget": 10000000,
      "currency": "USD",
      "status": "activo",
      "ownerId": "user_daniel",
      "ownerName": "Daniel González",
      "ownerType": "mandatario_exclusivo",
      "description": "Proyecto exploratorio y de desarrollo no convencional en la formación Palermo Aike, considerada la segunda mayor reserva de shale de Argentina después de Vaca Muerta. Presentado oficialmente por la provincia de Chubut.",
      "modality": "Socio Inversor",
      "roi": "Plan No Convencional",
      "statusProgress": "Proyecto oficial integral presentado por Chubut para exploración no convencional",
      "driveFolderUrl": "https://drive.google.com/drive/u/0/folders/inventario-energycpy-palermo-aike-chubut",
      "createdAt": "2026-10-21",
      "assignedAgent": "daniel",
      "amountDisplay": "A Estructurar con Socio",
      "isPrivatePlacement": false,
      "es": {
        "categoryTag": "Shale Oil & Gas — Palermo Aike",
        "title": "Desarrollo No Convencional Palermo Aike Chubut",
        "location": "Chubut / Cuenca Austral, Argentina",
        "statusLabel": "Socio Inversor — Plan Integral",
        "description": "Proyecto exploratorio y de desarrollo no convencional en la formación Palermo Aike, considerada la segunda mayor reserva de shale de Argentina después de Vaca Muerta. Presentado oficialmente por la provincia de Chubut.",
        "thesis": "Oportunidad pionera de ingresar en la frontera no convencional de la Patagonia sur con beneficios tributarios provinciales y elegibilidad para el régimen RIGI.",
        "highlights": [
          "Segunda roca generadora no convencional de mayor volumen de Argentina.",
          "Proyecto integral con respaldo institucional de la Gobernación de Chubut.",
          "Búsqueda de operadoras y consorcios inversores para pozos exploratorios horizontales.",
          "Infraestructura portuaria y de evacuación en el Atlántico Sur.",
          "Elegible para incentivos RIGI de libre disponibilidad de divisas."
        ],
        "metrics": [
          {
            "label": "Formación",
            "val": "Palermo Aike",
            "color": "text-gold"
          },
          {
            "label": "Recurso",
            "val": "Shale Oil & Gas",
            "color": "text-cyan"
          },
          {
            "label": "Provincia",
            "val": "Chubut",
            "color": "text-green"
          },
          {
            "label": "Modalidad",
            "val": "Socio Inversor",
            "color": "text-gold"
          }
        ]
      },
      "en": {
        "categoryTag": "Shale Play — Palermo Aike",
        "title": "Palermo Aike Unconventional Play Chubut",
        "location": "Chubut / Austral Basin, Argentina",
        "statusLabel": "Equity Partner — Master Plan",
        "description": "Unconventional exploration and development play targeting the Palermo Aike shale formation, recognized as Argentina's second-largest shale deposit after Vaca Muerta. Officially sponsored by Chubut Province.",
        "thesis": "Pioneering entry into Argentina's newest shale frontier with strong provincial incentives and full RIGI federal investment eligibility.",
        "highlights": [
          "Second-largest unconventional shale resource in Argentina.",
          "Comprehensive development package sponsored by the Chubut Government.",
          "Seeking operating and financial partners for horizontal drilling campaign.",
          "Proximity to deepwater Atlantic export terminals.",
          "Eligible for RIGI FX deregulation and tax stability benefits."
        ],
        "metrics": [
          {
            "label": "Formation",
            "val": "Palermo Aike",
            "color": "text-gold"
          },
          {
            "label": "Resource",
            "val": "Shale Oil & Gas",
            "color": "text-cyan"
          },
          {
            "label": "Province",
            "val": "Chubut",
            "color": "text-green"
          },
          {
            "label": "Deal Type",
            "val": "Equity Partner",
            "color": "text-gold"
          }
        ]
      }
    },
    {
      "id": "vacamuerta-3refinerias-puerto",
      "title": "Paquete 3 Refinerías en Vaca Muerta + Puerto de Aguas Profundas",
      "sector": "Petróleo, Gas & Infraestructura",
      "basePrice": 350000000,
      "overpriceTarget": 15000000,
      "currency": "USD",
      "status": "activo",
      "ownerId": "user_daniel",
      "ownerName": "Daniel González",
      "ownerType": "mandatario_exclusivo",
      "description": "Excepcional paquete accionario que incluye 3 unidades de negocio de refinación especializadas en Vaca Muerta y terminal marítima de aguas profundas con título de propiedad en Puerto Galván, Bahía Blanca. Reactivación llave en mano a 6 meses.",
      "modality": "Venta Llave en Mano",
      "roi": "Reactivación 6 Meses",
      "statusProgress": "3 refinerías y Puerto Galván con título propio; puesta a punto a 6 meses",
      "driveFolderUrl": "https://drive.google.com/drive/u/0/folders/inventario-energycpy-vacamuerta-3refinerias-puerto",
      "createdAt": "2026-10-21",
      "assignedAgent": "daniel",
      "amountDisplay": "USD 350M",
      "isPrivatePlacement": false,
      "es": {
        "categoryTag": "Infraestructura & Refinación Vaca Muerta",
        "title": "Paquete 3 Refinerías en Vaca Muerta + Puerto de Aguas Profundas",
        "location": "Cuenca Neuquina & Puerto Galván (Bahía Blanca), Argentina",
        "statusLabel": "USD 350M — Venta Llave en Mano",
        "description": "Excepcional paquete accionario que incluye 3 unidades de negocio de refinación especializadas en Vaca Muerta y terminal marítima de aguas profundas con título de propiedad en Puerto Galván, Bahía Blanca. Reactivación llave en mano a 6 meses.",
        "thesis": "Infraestructura estratégica de downstream y biocombustibles acoplada a logística portuaria privada de aguas profundas, eliminando cuellos de botella en la exportación de crudo.",
        "highlights": [
          "Refinería 1: Tratamiento de crudos livianos (1.400 m³/día; almacenaje 22.000 m³).",
          "Refinería 2: Refinación de naftas, hidrotratamiento e isomerización (1.040 m³/día; almacenaje 8.000 m³).",
          "Refinería 3: Producción de biocombustibles (130 ton/día; almacenaje 2.000 ton).",
          "Puerto Galván: Con título de propiedad privado en Bahía Blanca con muelle de aguas profundas.",
          "Modalidad llave en mano con 6 meses para reactivación total y acompañamiento estratégico por USD 350M."
        ],
        "metrics": [
          {
            "label": "Inversión Final",
            "val": "USD 350M",
            "color": "text-gold"
          },
          {
            "label": "Refinerías",
            "val": "3 Complejos",
            "color": "text-cyan"
          },
          {
            "label": "Puerto",
            "val": "Propiedad Galván",
            "color": "text-green"
          },
          {
            "label": "Modalidad",
            "val": "Llave en Mano",
            "color": "text-gold"
          }
        ]
      },
      "en": {
        "categoryTag": "Refining & Deepwater Port Hub",
        "title": "3 Vaca Muerta Refineries + Deepwater Port Complex",
        "location": "Neuquina Basin & Puerto Galván (Bahía Blanca), Argentina",
        "statusLabel": "USD 350M — Turnkey Asset Sale",
        "description": "Strategic equity package comprising 3 specialized refining business units in Vaca Muerta plus a private deepwater ocean terminal with freehold title in Puerto Galván, Bahía Blanca. Turnkey restart within 6 months.",
        "thesis": "Unmatched combination of midstream refining and private oceanfront port infrastructure debottlenecking export logistics for Vaca Muerta crude.",
        "highlights": [
          "Refinery 1: Light crude processing (1,400 m³/day; 22,000 m³ storage capacity).",
          "Refinery 2: Hydrotreating, reforming, and isomerization (1,040 m³/day; 8,000 m³ storage).",
          "Refinery 3: Biofuel manufacturing unit (130 tons/day; 2,000 tons storage).",
          "Deepwater Ocean Terminal: Freehold title in Puerto Galván, Bahía Blanca port.",
          "Turnkey delivery within 6 months with full engineering transition for USD 350M."
        ],
        "metrics": [
          {
            "label": "Final Ticket",
            "val": "USD 350M",
            "color": "text-gold"
          },
          {
            "label": "Refineries",
            "val": "3 Units",
            "color": "text-cyan"
          },
          {
            "label": "Deepwater Port",
            "val": "Freehold Title",
            "color": "text-green"
          },
          {
            "label": "Deal Type",
            "val": "Turnkey Sale",
            "color": "text-gold"
          }
        ]
      }
    },
    {
      "id": "vacamuerta-operadora-15concesiones",
      "title": "Operadora de Pozos Petroleros en Vaca Muerta (15 Concesiones)",
      "sector": "Petróleo, Gas & Infraestructura",
      "basePrice": 340000000,
      "overpriceTarget": 15000000,
      "currency": "USD",
      "status": "activo",
      "ownerId": "user_daniel",
      "ownerName": "Daniel González",
      "ownerType": "mandatario_exclusivo",
      "description": "Compañía operadora en marcha con 15 concesiones de explotación activas sobre una superficie de 3.000 km² en la Cuenca Neuquina. Bloque de 1.200 pozos y más de 500 empleados. Plan llave en mano de mejora con tecnología No Convencional.",
      "modality": "Socio Inversor",
      "roi": "En Producción",
      "statusProgress": "15 concesiones en 3.000 km², ~1.200 pozos, >500 empleados; inversión llave en mano",
      "driveFolderUrl": "https://drive.google.com/drive/u/0/folders/inventario-energycpy-vacamuerta-operadora-15concesiones",
      "createdAt": "2026-10-21",
      "assignedAgent": "daniel",
      "amountDisplay": "USD 340M",
      "isPrivatePlacement": false,
      "es": {
        "categoryTag": "Upstream Operadora — Vaca Muerta",
        "title": "Operadora de Pozos Petroleros en Vaca Muerta (15 Concesiones)",
        "location": "Cuenca Neuquina, Neuquén, Argentina",
        "statusLabel": "USD 340M — Socio Inversor",
        "description": "Compañía operadora en marcha con 15 concesiones de explotación activas sobre una superficie de 3.000 km² en la Cuenca Neuquina. Bloque de 1.200 pozos y más de 500 empleados. Plan llave en mano de mejora con tecnología No Convencional.",
        "thesis": "Empresa petrolera consolidada a escala corporativa con formidable masa crítica de pozos para reactivación y estimulación horizontal en tight y shale.",
        "highlights": [
          "15 concesiones de explotación hidrocarburífera en 3.000 km² de Cuenca Neuquina.",
          "Parque activo de aproximadamente 1.200 pozos en producción con base operativa propia.",
          "Estructura corporativa sólida con más de 500 colaboradores técnicos y operarios.",
          "Inversión de USD 340M estructurada para plan llave en mano con técnica No Convencional.",
          "Socio inversor con participación de control o co-gestión ejecutiva."
        ],
        "metrics": [
          {
            "label": "Inversión Final",
            "val": "USD 340M",
            "color": "text-gold"
          },
          {
            "label": "Superficie",
            "val": "3.000 km²",
            "color": "text-cyan"
          },
          {
            "label": "Pozos",
            "val": "1.200 Pozos",
            "color": "text-green"
          },
          {
            "label": "Modalidad",
            "val": "Socio Inversor",
            "color": "text-gold"
          }
        ]
      },
      "en": {
        "categoryTag": "Upstream Operator — Vaca Muerta",
        "title": "Oilfield Operator in Vaca Muerta (15 Concessions)",
        "location": "Neuquina Basin, Neuquén, Argentina",
        "statusLabel": "USD 340M — Equity Partner",
        "description": "Fully established independent oil & gas operator holding 15 exploitation licenses across 3,000 km² in the prolific Neuquina Basin. ~1,200 active wells and >500 staff. Turnkey unconventional well enhancement plan.",
        "thesis": "Corporate-scale platform company with massive well stock and extensive acreage ready for high-yield unconventional workover and horizontal re-stimulation.",
        "highlights": [
          "15 exploitation licenses covering 3,000 km² in prime Vaca Muerta play.",
          "Operational base managing approximately 1,200 active producing wells.",
          "Experienced workforce with more than 500 skilled petroleum engineers and crew.",
          "Turnkey capital plan of USD 340M deploying unconventional stimulation.",
          "Equity partnership with shared governance or controlling stake."
        ],
        "metrics": [
          {
            "label": "Final Ticket",
            "val": "USD 340M",
            "color": "text-gold"
          },
          {
            "label": "Acreage",
            "val": "3,000 km²",
            "color": "text-cyan"
          },
          {
            "label": "Well Stock",
            "val": "1,200 Wells",
            "color": "text-green"
          },
          {
            "label": "Deal Type",
            "val": "Equity Partner",
            "color": "text-gold"
          }
        ]
      }
    },
    {
      "id": "pozo-salta",
      "title": "Proyecto Pozo Salta — Infraestructura & Secado de Cuttings",
      "sector": "Petróleo, Gas & Infraestructura",
      "basePrice": 15000000,
      "overpriceTarget": 1000000,
      "currency": "USD",
      "status": "activo",
      "ownerId": "user_daniel",
      "ownerName": "Daniel González",
      "ownerType": "mandatario_exclusivo",
      "description": "Centro logístico y ambiental para tratamiento térmico y disposición de lodos y recortes de perforación (cuttings) con certificación ambiental en el NOA.",
      "modality": "Infraestructura & Servicios",
      "roi": "3 Años",
      "statusProgress": "Planta de tratamiento y secado de cuttings en zona hidrocarburífera de Salta",
      "driveFolderUrl": "https://drive.google.com/drive/u/0/folders/inventario-energycpy-pozo-salta",
      "createdAt": "2026-10-21",
      "assignedAgent": "daniel",
      "amountDisplay": "USD 15M CAPEX",
      "isPrivatePlacement": false,
      "es": {
        "categoryTag": "Servicios Petroleros & Cuttings",
        "title": "Proyecto Pozo Salta — Infraestructura & Secado de Cuttings",
        "location": "Cuenca Noroeste, Salta, Argentina",
        "statusLabel": "USD 15M CAPEX",
        "description": "Centro logístico y ambiental para tratamiento térmico y disposición de lodos y recortes de perforación (cuttings) con certificación ambiental en el NOA.",
        "thesis": "Servicio ambiental mandatorio para operadoras con tarifas indexadas y alta tasa de utilización de planta.",
        "highlights": [
          "USD 15M CAPEX con recupero a 3 años.",
          "Capacidad para 500 m³ diarios de cuttings.",
          "Contratos vigentes de servicio ambiental.",
          "Normativa ambiental estricta que asegura demanda inelástica.",
          "Ubicación en nudo neurálgico de perforación."
        ],
        "metrics": [
          {
            "label": "CAPEX Requerido",
            "val": "USD 15M",
            "color": "text-gold"
          },
          {
            "label": "Capacidad",
            "val": "500 m³/día",
            "color": "text-cyan"
          },
          {
            "label": "Recupero",
            "val": "3 Años",
            "color": "text-green"
          },
          {
            "label": "Servicio",
            "val": "Mandatorio",
            "color": "text-gold"
          }
        ]
      },
      "en": {
        "categoryTag": "Oilfield Environmental Services",
        "title": "Pozo Salta Project — Cuttings Drying & Treatment",
        "location": "Northwest Basin, Salta, Argentina",
        "statusLabel": "USD 15M CAPEX",
        "description": "Environmental and logistics hub for thermal treatment and recycling of drilling muds and cuttings serving Northwest Argentina oilfields.",
        "thesis": "Mandatory compliance service with recurring dollar-linked contracts and strong EBITDA margins.",
        "highlights": [
          "USD 15M CAPEX with 3-year payback.",
          "Processing capacity of 500 m³/day.",
          "Active long-term environmental service agreements.",
          "Inelastic demand driven by strict environmental regulations.",
          "Prime geographical hub near drilling clusters."
        ],
        "metrics": [
          {
            "label": "Required CAPEX",
            "val": "USD 15M",
            "color": "text-gold"
          },
          {
            "label": "Throughput",
            "val": "500 m³/day",
            "color": "text-cyan"
          },
          {
            "label": "Payback",
            "val": "3 Years",
            "color": "text-green"
          },
          {
            "label": "Compliance",
            "val": "Mandatory",
            "color": "text-gold"
          }
        ]
      }
    },
    {
      "id": "asesoramiento-inbound-funds",
      "title": "Gestión y Administración Integral de Grupos Inversores",
      "sector": "Asesoramiento Financiero",
      "basePrice": 0,
      "overpriceTarget": 0,
      "currency": "USD",
      "status": "activo",
      "ownerId": "user_daniel",
      "ownerName": "Daniel González",
      "ownerType": "mandatario_exclusivo",
      "description": "Acompañamiento integral para grupos inversores y fondos internacionales (FDI) que buscan estructurar y desplegar capital en activos estratégicos de la economía real argentina.",
      "modality": "Asset Management & Advisory",
      "roi": "Continuo",
      "statusProgress": "Servicio institucional integral con equipo multidisciplinario y cartelera curada",
      "driveFolderUrl": "https://drive.google.com/drive/u/0/folders/inventario-energycpy-asesoramiento-inbound-funds",
      "createdAt": "2026-10-21",
      "assignedAgent": "daniel",
      "amountDisplay": "Mandato Institucional",
      "isPrivatePlacement": false,
      "es": {
        "categoryTag": "Banca de Inversión & Mandatos",
        "title": "Gestión y Administración Integral de Grupos Inversores",
        "location": "Buenos Aires / Córdoba / Global",
        "statusLabel": "Servicio Institucional",
        "description": "Acompañamiento integral para grupos inversores y fondos internacionales (FDI) que buscan estructurar y desplegar capital en activos estratégicos de la economía real argentina.",
        "thesis": "Plataforma de aterrizaje seguro ('soft landing') que minimiza la fricción regulatoria, cambiaria y legal, asegurando la selección de proyectos con estricto estándar de debida diligencia.",
        "highlights": [
          "Cartelera activa de oportunidades de inversión auditadas y de alto rendimiento.",
          "Estructuración de vehículos societarios locales, cuentas fiduciarias y compliance cambiario.",
          "Equipo multidisciplinario: analistas financieros, ingenieros, abogados y escribanos.",
          "Gobierno corporativo y seguimiento de avance de proyectos en tiempo real.",
          "Asignación de consultor dedicado para interlocución con juntas directivas."
        ],
        "metrics": [
          {
            "label": "Servicio",
            "val": "Gestión Integral",
            "color": "text-gold"
          },
          {
            "label": "Alcance",
            "val": "Fondos Extranjeros",
            "color": "text-cyan"
          },
          {
            "label": "Equipo",
            "val": "Multidisciplinario",
            "color": "text-green"
          },
          {
            "label": "Modalidad",
            "val": "Mandato Privado",
            "color": "text-gold"
          }
        ]
      },
      "en": {
        "categoryTag": "Investment Banking & Advisory",
        "title": "Comprehensive Asset Management for Investment Groups",
        "location": "Buenos Aires / Córdoba / Global",
        "statusLabel": "Institutional Service",
        "description": "End-to-end advisory and management services for international private equity and foreign direct investment (FDI) groups allocating capital into real Argentine assets.",
        "thesis": "Turnkey soft-landing platform mitigating regulatory, FX, and legal complexity while delivering rigorously vetted investment-grade deals.",
        "highlights": [
          "Curated pipeline of audited, high-yield investment proposals across key sectors.",
          "Corporate vehicle structuring, fiduciary escrow administration, and FX compliance.",
          "Multidisciplinary team of financial modelers, engineers, and legal counsels.",
          "Corporate governance and real-time project milestone tracking.",
          "Dedicated partner assignment for board-level liaison."
        ],
        "metrics": [
          {
            "label": "Service",
            "val": "Asset Management",
            "color": "text-gold"
          },
          {
            "label": "Scope",
            "val": "Foreign Funds",
            "color": "text-cyan"
          },
          {
            "label": "Team",
            "val": "Multidisciplinary",
            "color": "text-green"
          },
          {
            "label": "Deal Type",
            "val": "Private Mandate",
            "color": "text-gold"
          }
        ]
      }
    },
    {
      "id": "asesoramiento-gobiernos",
      "title": "Financiamiento de Proyectos Gubernamentales e Infraestructura",
      "sector": "Asesoramiento Financiero",
      "basePrice": 0,
      "overpriceTarget": 0,
      "currency": "USD",
      "status": "activo",
      "ownerId": "user_daniel",
      "ownerName": "Daniel González",
      "ownerType": "mandatario_exclusivo",
      "description": "Diseño y estructuración de instrumentos de financiamiento para estados provinciales, municipios y entes autárquicos destinados a infraestructura energética, vial, hídrica y de transporte.",
      "modality": "Estructuración Financiera",
      "roi": "Estructural",
      "statusProgress": "Asesoría para entes públicos, provincias y municipios bajo marco RIGI / PPP",
      "driveFolderUrl": "https://drive.google.com/drive/u/0/folders/inventario-energycpy-asesoramiento-gobiernos",
      "createdAt": "2026-10-21",
      "assignedAgent": "daniel",
      "amountDisplay": "Estructuración a Medida",
      "isPrivatePlacement": false,
      "es": {
        "categoryTag": "Finanzas Públicas & Infraestructura",
        "title": "Financiamiento de Proyectos Gubernamentales e Infraestructura",
        "location": "Nación, Provincias y Municipios, Argentina",
        "statusLabel": "Advisory Estructurado",
        "description": "Diseño y estructuración de instrumentos de financiamiento para estados provinciales, municipios y entes autárquicos destinados a infraestructura energética, vial, hídrica y de transporte.",
        "thesis": "Monetización y apalancamiento de fondos públicos mediante bonos verdes, fideicomisos de garantía y esquemas PPP/RIGI para viabilizar obras de gran porte sin comprometer el balance fiscal.",
        "highlights": [
          "Estructuración de bonos verdes, títulos de deuda y fideicomisos de obra pública.",
          "Adecuación y estructuración de proyectos estratégicos al Régimen RIGI (Ley 27.742).",
          "Modelos de asociación público-privada (PPP) con repago por tarifas o peajes.",
          "Dictámenes de viabilidad económica, fiscal y financiera auditables.",
          "Vínculo con organismos multilaterales de crédito y bancos de desarrollo."
        ],
        "metrics": [
          {
            "label": "Servicio",
            "val": "Finanzas Públicas",
            "color": "text-gold"
          },
          {
            "label": "Instrumentos",
            "val": "Bonos & Fideicomisos",
            "color": "text-cyan"
          },
          {
            "label": "Marco",
            "val": "RIGI / PPP",
            "color": "text-green"
          },
          {
            "label": "Modalidad",
            "val": "Estructuración",
            "color": "text-gold"
          }
        ]
      },
      "en": {
        "categoryTag": "Public Finance & Infrastructure",
        "title": "Government Project Financing & Infrastructure Advisory",
        "location": "Federal, Provincial & Municipal, Argentina",
        "statusLabel": "Structured Advisory",
        "description": "Design and structuring of financing instruments for provincial governments, municipalities, and state utilities targeting energy, road, water, and transport infrastructure.",
        "thesis": "Public balance-sheet optimization via green bonds, infrastructure trusts, and PPP/RIGI mechanisms to fund large-scale developments.",
        "highlights": [
          "Green bond issuances, debt certificates, and public infrastructure trust funds.",
          "Project alignment with the federal RIGI framework (Law 27,742).",
          "Public-Private Partnership (PPP) modeling with user-toll or availability fee repayment.",
          "Auditable economic and fiscal feasibility appraisals.",
          "Direct structuring liaison with multilateral development banks."
        ],
        "metrics": [
          {
            "label": "Service",
            "val": "Public Finance",
            "color": "text-gold"
          },
          {
            "label": "Instruments",
            "val": "Bonds & Trusts",
            "color": "text-cyan"
          },
          {
            "label": "Framework",
            "val": "RIGI / PPP",
            "color": "text-green"
          },
          {
            "label": "Deal Type",
            "val": "Financial Advisory",
            "color": "text-gold"
          }
        ]
      }
    },
    {
      "id": "asesoramiento-real-estate",
      "title": "Gestión de Proyectos de Bienes Raíces & Construcción",
      "sector": "Asesoramiento Financiero",
      "basePrice": 0,
      "overpriceTarget": 0,
      "currency": "USD",
      "status": "activo",
      "ownerId": "user_daniel",
      "ownerName": "Daniel González",
      "ownerType": "mandatario_exclusivo",
      "description": "Estructuración integral de vehículos de inversión inmobiliaria de renta corporativa (REITs), parques industriales, loteos turísticos y naves logísticas 'triple A' con flujos dolarizados.",
      "modality": "Desarrollo & Advisory",
      "roi": "Renta / Plusvalía",
      "statusProgress": "Vehículos fiduciarios, parques logísticos, loteos y fondos REIT dolarizados",
      "driveFolderUrl": "https://drive.google.com/drive/u/0/folders/inventario-energycpy-asesoramiento-real-estate",
      "createdAt": "2026-10-21",
      "assignedAgent": "daniel",
      "amountDisplay": "Desarrollo Fiduciario",
      "isPrivatePlacement": false,
      "es": {
        "categoryTag": "Bienes Raíces & REITs",
        "title": "Gestión de Proyectos de Bienes Raíces & Construcción",
        "location": "Polos Corporativos e Industriales, Argentina",
        "statusLabel": "Estructuración Fiduciaria",
        "description": "Estructuración integral de vehículos de inversión inmobiliaria de renta corporativa (REITs), parques industriales, loteos turísticos y naves logísticas 'triple A' con flujos dolarizados.",
        "thesis": "Protección patrimonial y rentabilidad en USD mediante el apalancamiento de activos de tierra estratégicos desarrollados bajo contratos fiduciarios de estricta segregación patrimonial.",
        "highlights": [
          "Vehículos fiduciarios de inversión inmobiliaria (REITs) transparentes y dolarizados.",
          "Desarrollo de naves industriales, centros de distribución y polos logísticos.",
          "Modelado financiero de flujos de fondos, absorción comercial y retorno al inversor.",
          "Segregación patrimonial y seguridad jurídica respaldada en el CCCN (Ley 26.994).",
          "Comercialización de unidades de renta corporativa con inquilinos multinacionales."
        ],
        "metrics": [
          {
            "label": "Servicio",
            "val": "Real Estate Advisory",
            "color": "text-gold"
          },
          {
            "label": "Activos",
            "val": "Logística & Hotelería",
            "color": "text-cyan"
          },
          {
            "label": "Moneda",
            "val": "Flujos USD",
            "color": "text-green"
          },
          {
            "label": "Modalidad",
            "val": "Estructuración",
            "color": "text-gold"
          }
        ]
      },
      "en": {
        "categoryTag": "Real Estate & REIT Structuring",
        "title": "Real Estate & Construction Project Management",
        "location": "Corporate & Industrial Hubs, Argentina",
        "statusLabel": "Fiduciary Advisory",
        "description": "Comprehensive design and administration of commercial real estate investment trusts (REITs), industrial logistics parks, master-planned residential communities, and prime yield assets.",
        "thesis": "Wealth preservation and inflation-hedged USD cash yields leveraging prime land assets governed by bankruptcy-remote fiduciary trust contracts.",
        "highlights": [
          "USD-denominated transparent Real Estate Investment Trust (REIT) structures.",
          "Development of prime industrial warehouses, logistics parks, and lifestyle communities.",
          "Quantitative discounted cash flow modeling, absorption metrics, and IRR targets.",
          "Strict legal asset ring-fencing under Argentine Civil and Commercial Code (Law 26,994).",
          "Commercial leasing to multinational corporate tenants."
        ],
        "metrics": [
          {
            "label": "Service",
            "val": "REIT & RE Advisory",
            "color": "text-gold"
          },
          {
            "label": "Asset Class",
            "val": "Industrial / Yield",
            "color": "text-cyan"
          },
          {
            "label": "Currency",
            "val": "USD Yield",
            "color": "text-green"
          },
          {
            "label": "Deal Type",
            "val": "Fiduciary Vehicle",
            "color": "text-gold"
          }
        ]
      }
    },
    {
      "id": "reit-strategy",
      "title": "ENERGY CPY Argentina REIT Investment Strategy 2026",
      "sector": "Real Estate / REIT",
      "basePrice": 30000000,
      "overpriceTarget": 1500000,
      "currency": "USD",
      "status": "activo",
      "ownerId": "user_daniel",
      "ownerName": "Daniel González",
      "ownerType": "mandatario_exclusivo",
      "description": "Estrategia fiduciaria de inversión inmobiliaria de renta corporativa dolarizada (REIT) enfocada en oficinas premium y centros logísticos con contratos a largo plazo.",
      "modality": "Fondo Inmobiliario",
      "roi": "12% Anual USD",
      "statusProgress": "Estrategia REIT dolarizada en activos triple A",
      "driveFolderUrl": "https://drive.google.com/drive/u/0/folders/inventario-energycpy-reit-strategy",
      "createdAt": "2026-10-21",
      "assignedAgent": "daniel",
      "amountDisplay": "USD 30M Fondo",
      "isPrivatePlacement": false,
      "es": {
        "categoryTag": "Fondo Inmobiliario REIT",
        "title": "ENERGY CPY Argentina REIT Investment Strategy 2026",
        "location": "CABA & Corredor Norte, Argentina",
        "statusLabel": "USD 30M — Fondo Dolarizado",
        "description": "Estrategia fiduciaria de inversión inmobiliaria de renta corporativa dolarizada (REIT) enfocada en oficinas premium y centros logísticos con contratos a largo plazo.",
        "thesis": "Renta neta distribuible del 10% al 12% anual en USD combinada con plusvalía de capital en activos irreemplazables.",
        "highlights": [
          "Portafolio diversificado en activos inmobiliarios clase A+.",
          "Contratos de alquiler corporativo dolarizados a 5-10 años.",
          "Rendimiento anual neto proyectado del 10% al 12% en USD.",
          "Vehículo fiduciario independiente con estricto gobierno corporativo.",
          "Ticket de ingreso estructurado para inversores institucionales y privados."
        ],
        "metrics": [
          {
            "label": "Fondo Objetivo",
            "val": "USD 30M",
            "color": "text-gold"
          },
          {
            "label": "Rendimiento",
            "val": "10% - 12% USD",
            "color": "text-cyan"
          },
          {
            "label": "Contratos",
            "val": "5 - 10 Años",
            "color": "text-green"
          },
          {
            "label": "Tipo",
            "val": "REIT Dolarizado",
            "color": "text-gold"
          }
        ]
      },
      "en": {
        "categoryTag": "Real Estate Investment Trust",
        "title": "ENERGY CPY Argentina REIT Investment Strategy 2026",
        "location": "Buenos Aires Prime Corridor, Argentina",
        "statusLabel": "USD 30M — USD Fund",
        "description": "Fiduciary corporate yield real estate investment strategy (REIT) focused on prime offices and modern logistics hubs backed by long-term corporate leases.",
        "thesis": "Targeted net annual yield of 10% to 12% in USD combined with capital appreciation in trophy commercial assets.",
        "highlights": [
          "Diversified portfolio in prime Class A+ real estate.",
          "Long-term USD-indexed commercial leases (5-10 years).",
          "Projected net annual distribution of 10% to 12% in USD.",
          "Ring-fenced bankruptcy-remote trust with institutional governance.",
          "Structured entry tickets for qualified private and institutional capital."
        ],
        "metrics": [
          {
            "label": "Target Fund",
            "val": "USD 30M",
            "color": "text-gold"
          },
          {
            "label": "Yield",
            "val": "10% - 12% USD",
            "color": "text-cyan"
          },
          {
            "label": "Lease Term",
            "val": "5 - 10 Years",
            "color": "text-green"
          },
          {
            "label": "Asset Type",
            "val": "USD REIT",
            "color": "text-gold"
          }
        ]
      }
    },
    {
      "id": "pesca-gran-escala",
      "title": "Proyecto 6.6 — Pesca Industrial de Gran Escala en Patagonia",
      "sector": "Pesca Industrial",
      "basePrice": 260000000,
      "overpriceTarget": 12000000,
      "currency": "USD",
      "status": "activo",
      "ownerId": "user_daniel",
      "ownerName": "Daniel González",
      "ownerType": "mandatario_exclusivo",
      "description": "Modelo consolidado de alta rentabilidad para captura y exportación de especies marinas premium (Merluza Hubbsi y Langostino Rojo) con flota activa de 16 buques de gran calado y planta de congelado propia.",
      "modality": "Flota & Industria",
      "roi": "4 Años",
      "statusProgress": "Flota activa de 16 buques en ZEE y planta de congelado en tierra",
      "driveFolderUrl": "https://drive.google.com/drive/u/0/folders/inventario-energycpy-pesca-gran-escala",
      "createdAt": "2026-10-21",
      "assignedAgent": "daniel",
      "amountDisplay": "USD 260M CAPEX",
      "isPrivatePlacement": false,
      "es": {
        "categoryTag": "Pesca Industrial Gran Escala",
        "title": "Proyecto 6.6 — Pesca Industrial de Gran Escala en Patagonia",
        "location": "Zona Económica Exclusiva (ZEE) Argentina",
        "statusLabel": "USD 260M CAPEX",
        "description": "Modelo consolidado de alta rentabilidad para captura y exportación de especies marinas premium (Merluza Hubbsi y Langostino Rojo) con flota activa de 16 buques de gran calado y planta de congelado propia.",
        "thesis": "Activo estratégico con derechos consolidados de captura en aguas argentinas generando ingresos brutos proyectados de USD 600M anuales.",
        "highlights": [
          "USD 260 Millones en CAPEX requerido para operación de gran escala.",
          "USD 600 Millones/año en ingresos brutos proyectados por capturas.",
          "Flota activa de 16 buques altamente equipados para aguas patagónicas.",
          "Planta terrestre propia de procesado, empaque y congelado rápido.",
          "Track record comprobado con más de 25 años de operabilidad exitosa."
        ],
        "metrics": [
          {
            "label": "CAPEX Requerido",
            "val": "USD 260M",
            "color": "text-gold"
          },
          {
            "label": "Ingresos Proy.",
            "val": "USD 600M/año",
            "color": "text-cyan"
          },
          {
            "label": "Flota Activa",
            "val": "16 Buques",
            "color": "text-green"
          },
          {
            "label": "Mercado",
            "val": "Exportación 100%",
            "color": "text-gold"
          }
        ]
      },
      "en": {
        "categoryTag": "Industrial High-Seas Fishing",
        "title": "Project 6.6 — Large-Scale Industrial Fishing in Patagonia",
        "location": "Exclusive Economic Zone (EEZ) Argentina",
        "statusLabel": "USD 260M CAPEX",
        "description": "Established high-yield marine capture and processing enterprise targeting prime species (Argentine Hake and Red Shrimp) with an active fleet of 16 deep-sea vessels and onshore freezing facility.",
        "thesis": "Secured fishing quotas in Argentine South Atlantic waters delivering USD 600M/yr in projected gross export revenues.",
        "highlights": [
          "USD 260M CAPEX deployment for massive industrial scale.",
          "USD 600M/year projected gross revenues from high-value seafood.",
          "Active operational fleet of 16 deep-sea trawlers and jiggers.",
          "Proprietary onshore quick-freeze and processing facility.",
          "Over 25-year successful operating track record."
        ],
        "metrics": [
          {
            "label": "Required CAPEX",
            "val": "USD 260M",
            "color": "text-gold"
          },
          {
            "label": "Projected Rev.",
            "val": "USD 600M/yr",
            "color": "text-cyan"
          },
          {
            "label": "Active Fleet",
            "val": "16 Vessels",
            "color": "text-green"
          },
          {
            "label": "Target Market",
            "val": "100% Export",
            "color": "text-gold"
          }
        ]
      }
    },
    {
      "id": "pesca-integrado",
      "title": "Proyecto 6.7 — Ecosistema Pesquero Integrado Patagonia",
      "sector": "Pesca Industrial",
      "basePrice": 5500000,
      "overpriceTarget": 500000,
      "currency": "USD",
      "status": "activo",
      "ownerId": "user_daniel",
      "ownerName": "Daniel González",
      "ownerType": "mandatario_exclusivo",
      "description": "Desarrollo boutique modular que integra buques tangoneros costeros, procesamiento en planta y logística de frío para exportación directa a mercados asiáticos y europeos.",
      "modality": "Operación Boutique",
      "roi": "3 Años",
      "statusProgress": "Ecosistema pesquero integrado en Patagonia",
      "driveFolderUrl": "https://drive.google.com/drive/u/0/folders/inventario-energycpy-pesca-integrado",
      "createdAt": "2026-10-21",
      "assignedAgent": "daniel",
      "amountDisplay": "USD 5.5M CAPEX",
      "isPrivatePlacement": false,
      "es": {
        "categoryTag": "Pesca Industrial & Logística",
        "title": "Proyecto 6.7 — Ecosistema Pesquero Integrado Patagonia",
        "location": "Puerto Madryn & Rawson, Chubut, Argentina",
        "statusLabel": "USD 5.5M CAPEX",
        "description": "Desarrollo boutique modular que integra buques tangoneros costeros, procesamiento en planta y logística de frío para exportación directa a mercados asiáticos y europeos.",
        "thesis": "Alta rentabilidad operativa con bajo ticket de ingreso y ciclo de caja ágil basado en la captura del codiciado Langostino Patagónico.",
        "highlights": [
          "USD 5.5 Millones en CAPEX para puesta a punto y escalamiento.",
          "Enfocado en Langostino Salvaje de alto valor comercial.",
          "Contratos cerrados de exportación FOB Puerto Madryn.",
          "Estructura ágil con rápida rotación de capital de trabajo.",
          "Retorno proyectado de la inversión en 3 años."
        ],
        "metrics": [
          {
            "label": "CAPEX Requerido",
            "val": "USD 5.5M",
            "color": "text-gold"
          },
          {
            "label": "Producto",
            "val": "Langostino Salvaje",
            "color": "text-cyan"
          },
          {
            "label": "Recupero",
            "val": "3 Años",
            "color": "text-green"
          },
          {
            "label": "Destino",
            "val": "Europa / Asia",
            "color": "text-gold"
          }
        ]
      },
      "en": {
        "categoryTag": "Integrated Fishery & Cold Chain",
        "title": "Project 6.7 — Integrated Fishery Ecosystem Patagonia",
        "location": "Puerto Madryn & Rawson, Chubut, Argentina",
        "statusLabel": "USD 5.5M CAPEX",
        "description": "Modular boutique fishery combining coastal outrigger vessels, onshore rapid processing, and cold-chain logistics for direct export to Asian and European distributors.",
        "thesis": "High operating margin with accessible ticket size targeting wild-caught Argentine Red Shrimp.",
        "highlights": [
          "USD 5.5 Million CAPEX required for fleet upgrade and scaling.",
          "Focus on wild Patagonian Red Shrimp with strong export pricing.",
          "Secured FOB supply contracts from Puerto Madryn.",
          "Lean operating model with rapid working capital turnover.",
          "3-year estimated capital payback."
        ],
        "metrics": [
          {
            "label": "Required CAPEX",
            "val": "USD 5.5M",
            "color": "text-gold"
          },
          {
            "label": "Primary Target",
            "val": "Wild Red Shrimp",
            "color": "text-cyan"
          },
          {
            "label": "Payback",
            "val": "3 Years",
            "color": "text-green"
          },
          {
            "label": "Destination",
            "val": "Europe / Asia",
            "color": "text-gold"
          }
        ]
      }
    }
];
const DEFAULT_INTERLOCUTORS = [
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
const DEFAULT_DEALS = [
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
const DEFAULT_SETTINGS = {
  alertDaysWarning: 30,
  alertDaysCritical: 10,
  googleDriveEmail: 'inventario.energycpy@gmail.com',
  githubRepoUrl: 'https://github.com/inventarioenergycpy/dashboard-gestion-intermediacion'
};
const DATA_SCHEMA = {
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
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed.projects)) {
            let modified = false;
            // Purge any legacy dummy prototype IDs (proj_01..proj_05)
            const prevCount = parsed.projects.length;
            parsed.projects = parsed.projects.filter(p => !p.id || !p.id.startsWith('proj_0'));
            if (parsed.projects.length !== prevCount) modified = true;

            const existingMap = new Map(parsed.projects.map(p => [p.id, p]));
            DEFAULT_PROJECTS.forEach(dp => {
              const existing = existingMap.get(dp.id);
              if (!existing) {
                parsed.projects.push(dp);
                modified = true;
              } else if (!existing.basePrice || Number(existing.basePrice) < Number(dp.basePrice)) {
                existing.basePrice = dp.basePrice;
                existing.overpriceTarget = dp.overpriceTarget;
                modified = true;
              }
              // Auto-hydrate rich One-Pager master fields
              existing.assignedAgent = dp.assignedAgent;
              existing.amountDisplay = dp.amountDisplay;
              existing.isPrivatePlacement = dp.isPrivatePlacement;
              existing.es = dp.es;
              existing.en = dp.en;
              if (dp.modality && !existing.modality) existing.modality = dp.modality;
              if (dp.roi && !existing.roi) existing.roi = dp.roi;
              if (dp.statusProgress && !existing.statusProgress) existing.statusProgress = dp.statusProgress;
              modified = true;
            });

            if (modified || parsed.projects.length < DEFAULT_PROJECTS.length) {
              this.saveData(parsed);
            }
          }
          return parsed;
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

  // Configuración del Sistema
  getSettings() {
    return this.data.settings || DEFAULT_SETTINGS;
  }

  updateSettings(updated) {
    this.data.settings = { ...(this.data.settings || DEFAULT_SETTINGS), ...updated };
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
const store = new Store();


/* --- FILE: auth.js --- */
/**
 * DASHBOARD DE GESTIÓN DE INTERMEDIACIÓN FINANCIERA
 * Módulo de Autenticación y Control de Acceso por Perfil
 */
class AuthManager {
  constructor() {
    this.currentUser = store.getActiveUser();
  }

  init() {
    this.renderUserProfile();
    this.attachEventListeners();
    
    // Si no hay usuario activo, abrir modal de selección
    if (!this.currentUser) {
      this.showAuthModal();
    }
  }

  getCurrentUser() {
    return this.currentUser || store.getActiveUser();
  }

  isAdmin() {
    const user = this.getCurrentUser();
    return user && user.isAdmin;
  }

  renderUserProfile() {
    const user = this.getCurrentUser();
    const avatarEl = document.getElementById('userAvatar');
    const nameEl = document.getElementById('userName');
    const roleEl = document.getElementById('userRole');

    if (user && avatarEl && nameEl && roleEl) {
      avatarEl.textContent = user.avatar;
      nameEl.textContent = user.name;
      roleEl.innerHTML = `
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
        ${user.role}
      `;
    }
  }

  attachEventListeners() {
    const switchBtn = document.getElementById('btnSwitchUser');
    if (switchBtn) {
      switchBtn.addEventListener('click', () => {
        this.showAuthModal();
      });
    }

    // Botones del Modal de Autenticación
    const javierBtn = document.getElementById('btnAuthJavier');
    const danielBtn = document.getElementById('btnAuthDaniel');

    if (javierBtn) {
      javierBtn.addEventListener('click', () => {
        this.login('inventario.energycpy@gmail.com');
      });
    }

    if (danielBtn) {
      danielBtn.addEventListener('click', () => {
        this.login('gonzalezmarcelo2105ypf@gmail.com');
      });
    }
  }

  login(email) {
    const users = store.getUsers();
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (found) {
      this.currentUser = found;
      store.setActiveUser(found);
      this.renderUserProfile();
      this.hideAuthModal();
      
      // Notificación de bienvenida
      window.dispatchEvent(new CustomEvent('user-changed', { detail: found }));
    } else {
      alert('Acceso Denegado: Correo no autorizado en el sistema de intermediación.');
    }
  }

  showAuthModal() {
    const modal = document.getElementById('authModalOverlay');
    if (modal) {
      modal.style.display = 'flex';
    }
  }

  hideAuthModal() {
    const modal = document.getElementById('authModalOverlay');
    if (modal) {
      modal.style.display = 'none';
    }
  }
}
const auth = new AuthManager();


/* --- FILE: doc-templates.js --- */
/**
 * DASHBOARD DE GESTIÓN DE INTERMEDIACIÓN FINANCIERA
 * Plantillas y Cláusulas Esenciales de la Estrategia Documental en 3 Capas
 */
const DOC_TEMPLATES = {
  // Capa 1: Protección y Confidencialidad
  nda_bilateral: {
    id: 'nda_bilateral',
    title: 'NDA Bilateral con Reconocimiento de Intermediación',
    layer: 'Capa 1: Protección y Confidencialidad',
    target: 'Lado Demanda: Fondos de Inversión / Inversores Institucionales Directos',
    summary: 'Obliga a mantener confidencialidad absoluta sobre el cuaderno de venta (Info Memo), prohíbe el contacto directo con el titular del proyecto y reconoce la comisión de introducción (Buy-side fee).',
    clauses: [
      {
        name: 'Cláusula de Confidencialidad Estricta',
        text: 'La Parte Receptora se compromete a no divulgar, reproducir ni transferir a terceros ninguna Información Confidencial recibida en el marco de la evaluación del Proyecto, utilizándola única y exclusivamente para el análisis de una posible inversión o financiamiento.'
      },
      {
        name: 'Cláusula de No Circunvención y Prohibición de Contacto Directo',
        text: 'El Inversor reconoce expresamente que el Proyecto ha sido presentado por el Intermediario. En consecuencia, el Inversor se compromete a no entablar negociaciones, reuniones ni comunicaciones directas con los accionistas, directivos o representantes del Proyecto sin la presencia o autorización previa y por escrito del Intermediario.'
      },
      {
        name: 'Reconocimiento de Honorarios de Introducción (Buy-side Fee)',
        text: 'En caso de no acordarse una retribución a cargo de la parte vendedora, el Inversor reconoce y acepta abonar al Intermediario un honorario de éxito (Success Fee) del [X]% sobre el monto total desembolsado o estructurado en la transacción.'
      }
    ]
  },
  
  ncnda_broker: {
    id: 'ncnda_broker',
    title: 'NCNDA (Non-Circumvention, Non-Disclosure Agreement) entre Consultoras / Brokers',
    layer: 'Capa 1: Protección y Confidencialidad',
    target: 'Lado Oferta/Demanda: Consultoras con Mandato y Brokers Externos',
    summary: 'Pacto bilateral vinculante de no elusión y respeto recíproco de las carteras de proyectos e inversores.',
    clauses: [
      {
        name: 'No Circunvención Recíproca',
        text: 'Ninguna de las partes contactará ni intentará cerrar transacciones directas con los clientes, inversores, titulares o contactos presentados por la otra parte, reconociendo la titularidad exclusiva de la relación comercial por un período de [24/36] meses.'
      },
      {
        name: 'Indemnización por Incumplimiento (Cláusula Penal)',
        text: 'La violación de este pacto facultará a la parte perjudicada a reclamar como indemnización automática el equivalente al 100% de los honorarios brutos o sobreprecios generados en la transacción eludida.'
      }
    ]
  },

  // Capa 2: Mandatos y Reparto de Honorarios
  mandato_overprice_dueño: {
    id: 'mandato_overprice_dueño',
    title: 'Contrato de Intermediación / Mandato no Exclusivo con Overprice & Tail Period',
    layer: 'Capa 2: Mandatos y Reparto de Honorarios',
    target: 'Lado Oferta: Dueño Directo del Proyecto (Nivel 1)',
    summary: 'Legitima al consultor para ofrecer el proyecto, fija el precio neto base del dueño, asegura el cobro íntegro del overprice y activa la protección de contactos por 12 a 24 meses.',
    clauses: [
      {
        name: 'Definición Económica y Overprice',
        text: 'El Titular fija como retribución neta pretendida por la cesión o venta del Proyecto la suma de USD [Monto Neto Base]. Toda suma que exceda dicho importe ("Overprice") o comisión pactada corresponderá íntegramente al Consultor/Intermediario en concepto de honorarios profesionales de intermediación.'
      },
      {
        name: 'Período de Cola (Tail Period / Protección de Contactos)',
        text: 'Si durante la vigencia de este acuerdo o dentro de los [12 a 24] meses posteriores a su vencimiento, el Titular concreta total o parcialmente cualquier negocio, asociación o venta con inversores presentados formalmente por el Consultor, el Titular estará obligado a abonar la totalidad de los honorarios u overprice pactados.'
      },
      {
        name: 'Éxito y Forma de Cobro (Success Fee)',
        text: 'Los honorarios del Consultor se devengarán y serán exigibles al momento de la firma del contrato definitivo o del efectivo desembolso de fondos, retenidos directamente en la cuenta de custodia/escrow o cancelados en simultáneo.'
      }
    ]
  },

  cobrokering_fee_sharing: {
    id: 'cobrokering_fee_sharing',
    title: 'Acuerdo de Co-Brokering y Reparto de Honorarios (Fee Sharing)',
    layer: 'Capa 2: Mandatos y Reparto de Honorarios',
    target: 'Lado Oferta/Demanda: Consultora con Mandato Directo (Nivel 2)',
    summary: 'Regula la colaboración entre dos consultoras fijando el reparto 50/50 o la autorización expresa de sobreprecio.',
    clauses: [
      {
        name: 'Reparto de Honorarios (Fee Sharing)',
        text: 'Las partes acuerdan distribuir los honorarios totales brutos derivados de la intermediación en una proporción del [50]% para la Consultora Originadora y [50]% para la Consultora Receptora/Comercializadora.'
      },
      {
        name: 'Garantía de Mandato Vigente',
        text: 'La Consultora Originadora declara y garantiza bajo juramento que cuenta con mandato/autorización formal vigente y facultades suficientes otorgadas por el Titular del Proyecto.'
      }
    ]
  },

  mfpa_broker_fondo: {
    id: 'mfpa_broker_fondo',
    title: 'Master Fee Protection Agreement (MFPA)',
    layer: 'Capa 2: Mandatos y Reparto de Honorarios',
    target: 'Lado Demanda: Broker / Intermediario Externo del Fondo (Nivel 3)',
    summary: 'Contrato estándar internacional de protección de honorarios entre brokers.',
    clauses: [
      {
        name: 'Protección Irrevocable de Comisiones',
        text: 'Las comisiones devengadas serán abonadas de manera irrevocable e incondicional a las cuentas designadas por los intermediarios en cada desembolso parcial o total.'
      }
    ]
  },

  // Capa 3: Registro y Trazabilidad
  client_registration_sheet: {
    id: 'client_registration_sheet',
    title: 'Carta de Registro de Inversores / Deal Log Formal',
    layer: 'Capa 3: Registro y Trazabilidad',
    target: 'Operativo: Notificación fehaciente al Dueño o Mandatario',
    summary: 'Notificación por escrito con fecha cierta y acuse de recibo que fija la autoría de la presentación de un inversor o fondo específico para un proyecto.',
    clauses: [
      {
        name: 'Texto Modelo de Notificación Formal',
        text: 'Por la presente y en el marco del Contrato de Intermediación / Mandato suscrito el [Fecha], notificamos formalmente la presentación del Inversor / Fondo [Nombre de la Entidad] (representado por [Nombre del Interlocutor]) para evaluar el Proyecto [Nombre del Proyecto]. Queda expresamente registrado a los efectos de la protección de contactos y cómputo del Tail Period.'
      }
    ]
  },

  deal_specific_addendum: {
    id: 'deal_specific_addendum',
    title: 'Anexo Económico por Operación (Deal Specific Addendum)',
    layer: 'Capa 3: Registro y Trazabilidad',
    target: 'Operativo: Vinculación concreta a un proyecto bajo acuerdo marco',
    summary: 'Fija los porcentajes, importes de overprice y condiciones de cobro exactas para una transacción particular.',
    clauses: [
      {
        name: 'Condiciones Particulares de la Operación',
        text: 'Para la operación referida al Proyecto [Nombre], con precio neto fijado en USD [Monto], se estipula un Overprice de USD [Monto Overprice], distribuible según el porcentaje pactado.'
      }
    ]
  }
};


/* --- FILE: templateManager.js --- */
/**
 * DASHBOARD DE GESTIÓN DE INTERMEDIACIÓN FINANCIERA
 * Módulo Generador Dinámico de Plantillas Excel y CSV
 * Adaptable automáticamente ante cualquier cambio de esquema futuro
 */
class TemplateManager {
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


/* --- FILE: smartImporter.js --- */
/**
 * DASHBOARD DE GESTIÓN DE INTERMEDIACIÓN FINANCIERA
 * Módulo de Importación Inteligente con Diff Visual, Alertas de Reemplazo,
 * Cargas Parciales y Resguardo Automático con Rollback
 */
class SmartImporter {
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
const smartImporter = new SmartImporter();


/* --- FILE: dashboard.js --- */
/**
 * DASHBOARD DE GESTIÓN DE INTERMEDIACIÓN FINANCIERA
 * Módulo de Vista Principal (KPIs, Semáforo de Alertas y Próximas Reuniones)
 */
class DashboardModule {
  constructor() {
    this.container = document.getElementById('view-dashboard');
  }

  render() {
    if (!this.container) return;

    const projects = store.getProjects();
    const deals = store.getDeals();
    const interlocutors = store.getInterlocutors();
    const settings = store.getSettings();

    // 1. Cálculos de KPIs
    const totalProjects = projects.length;
    const activeProjects = projects.filter(p => p.status === 'activo').length;
    
    const totalBaseCapital = projects.reduce((acc, p) => acc + (Number(p.basePrice) || 0), 0);
    const totalOverprice = projects.reduce((acc, p) => acc + (Number(p.overpriceTarget) || 0), 0);
    
    // 2. Semáforo de Vencimientos de Documentación
    const today = new Date();
    let expiredCount = 0;
    let warningCount = 0;
    let validCount = 0;
    const alertList = [];

    interlocutors.forEach(inter => {
      if (inter.expirationDate) {
        const exp = new Date(inter.expirationDate);
        const diffTime = exp.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        let statusType = 'green';
        let statusLabel = 'Vigente';

        if (diffDays < 0) {
          statusType = 'red';
          statusLabel = `Vencido hace ${Math.abs(diffDays)} días`;
          expiredCount++;
        } else if (diffDays <= (settings.alertDaysWarning || 30)) {
          statusType = 'yellow';
          statusLabel = `Vence en ${diffDays} días`;
          warningCount++;
        } else {
          validCount++;
        }

        if (statusType === 'red' || statusType === 'yellow') {
          alertList.push({
            interlocutor: inter,
            days: diffDays,
            type: statusType,
            label: statusLabel
          });
        }
      }
    });

    // 3. Próximas Reuniones y Fechas de Control
    const upcomingDeals = [...deals]
      .filter(d => d.meetingDate || d.controlDate)
      .sort((a, b) => new Date(a.meetingDate || a.controlDate) - new Date(b.meetingDate || b.controlDate));

    // Renderizado HTML
    this.container.innerHTML = `
      <!-- Semáforo de Alertas y Vencimientos -->
      <div class="alert-strip">
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="width: 10px; height: 10px; border-radius: 50%; background: ${expiredCount > 0 ? '#ef4444' : (warningCount > 0 ? '#f59e0b' : '#10b981')}; box-shadow: 0 0 10px ${expiredCount > 0 ? '#ef4444' : (warningCount > 0 ? '#f59e0b' : '#10b981')};"></div>
          <div>
            <h4 style="font-size: 14px; font-weight: 700; color: var(--text-main); margin-bottom: 2px;">Semáforo de Vigencias Legales</h4>
            <p style="font-size: 12px; color: var(--text-muted);">Monitoreo continuo de mandatos de venta, acuerdos de brokeraje y períodos de cola (Tail Periods).</p>
          </div>
        </div>
        <div class="alert-counts">
          <div class="traffic-pill red" onclick="window.appRouter.navigateTo('interlocutors', 'red')">
            <span class="dot"></span>
            <span>${expiredCount} Vencidos</span>
          </div>
          <div class="traffic-pill yellow" onclick="window.appRouter.navigateTo('interlocutors', 'yellow')">
            <span class="dot"></span>
            <span>${warningCount} Por Vencer (&lt;30d)</span>
          </div>
          <div class="traffic-pill green" onclick="window.appRouter.navigateTo('interlocutors', 'green')">
            <span class="dot"></span>
            <span>${validCount} Vigentes</span>
          </div>
        </div>
      </div>

      <!-- Métricas KPIs -->
      <div class="grid-4" style="margin-bottom: 28px;">
        <div class="kpi-card">
          <div class="kpi-header">
            <span class="kpi-title">Proyectos en Cartera</span>
            <div class="kpi-icon gold">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/></svg>
            </div>
          </div>
          <div class="kpi-value">${totalProjects}</div>
          <div class="kpi-subtext">
            <span style="color: var(--emerald-main); font-weight: 600;">${activeProjects} Activos</span> &bull; ${totalProjects - activeProjects} en otros estados
          </div>
        </div>

        <div class="kpi-card">
          <div class="kpi-header">
            <span class="kpi-title">Volumen Base (USD)</span>
            <div class="kpi-icon blue">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 100 4h4a2 2 0 110 4H8"/><path d="M12 18V6"/></svg>
            </div>
          </div>
          <div class="kpi-value">$${(totalBaseCapital / 1000000).toFixed(1)}M</div>
          <div class="kpi-subtext">Valor neto estimado pretendido por titulares</div>
        </div>

        <div class="kpi-card">
          <div class="kpi-header">
            <span class="kpi-title">Overprice Proyectado</span>
            <div class="kpi-icon emerald">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
            </div>
          </div>
          <div class="kpi-value">$${(totalOverprice / 1000000).toFixed(2)}M</div>
          <div class="kpi-subtext">Comisiones y sobreprecios protegidos por contrato</div>
        </div>

        <div class="kpi-card">
          <div class="kpi-header">
            <span class="kpi-title">Gestiones con Fondos</span>
            <div class="kpi-icon purple">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
            </div>
          </div>
          <div class="kpi-value">${deals.length}</div>
          <div class="kpi-subtext">Negociaciones y presentaciones activas</div>
        </div>
      </div>

      <!-- Grilla Central: Alertas Urgentes y Próximas Reuniones -->
      <div class="grid-2" style="margin-bottom: 28px;">
        <!-- Card 1: Alertas Críticas de Documentación -->
        <div class="card">
          <div class="card-header">
            <h3>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold-main)" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              Alertas de Vencimiento de Acuerdos
            </h3>
            <button class="btn btn-secondary btn-sm" onclick="window.appRouter.navigateTo('interlocutors')">Ver Todos</button>
          </div>
          <div class="card-body" style="padding: 0;">
            ${alertList.length === 0 ? `
              <div style="padding: 32px; text-align: center; color: var(--text-muted); font-size: 13px;">
                ✅ Toda la documentación de dueños y brokers se encuentra dentro de vigencia legal.
              </div>
            ` : `
              <div class="table-responsive">
                <table class="data-table">
                  <thead>
                    <tr>
                      <th>Titular / Intermediario</th>
                      <th>Contrato Firmado</th>
                      <th>Estado / Plazo</th>
                      <th>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${alertList.map(item => `
                      <tr>
                        <td>
                          <strong>${item.interlocutor.name}</strong><br>
                          <span style="font-size: 11px; color: var(--text-muted);">${item.interlocutor.company || 'Directo'}</span>
                        </td>
                        <td>
                          <span style="font-size: 12px;">${item.interlocutor.contractSigned}</span>
                        </td>
                        <td>
                          <span class="traffic-pill ${item.type}" style="display: inline-flex; font-size: 11px; padding: 2px 8px;">
                            ${item.label}
                          </span>
                        </td>
                        <td>
                          <a href="${item.interlocutor.driveDocUrl || 'https://drive.google.com'}" target="_blank" class="btn btn-drive btn-sm" style="padding: 4px 8px; font-size: 11px;">
                            Ver Drive
                          </a>
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            `}
          </div>
        </div>

        <!-- Card 2: Próximas Reuniones y Fechas de Control -->
        <div class="card">
          <div class="card-header">
            <h3>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--blue-main)" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              Próximas Reuniones & Fechas de Control
            </h3>
            <button class="btn btn-secondary btn-sm" onclick="window.appRouter.navigateTo('deals')">Ver Pipeline</button>
          </div>
          <div class="card-body">
            ${upcomingDeals.length === 0 ? `
              <div style="padding: 24px; text-align: center; color: var(--text-muted); font-size: 13px;">
                No hay reuniones programadas para los próximos días.
              </div>
            ` : `
              <div class="timeline">
                ${upcomingDeals.slice(0, 3).map(deal => `
                  <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
                        <span style="font-weight: 700; font-size: 13px; color: var(--gold-light);">${deal.targetName}</span>
                        <span style="font-size: 11px; background: var(--bg-card); padding: 2px 6px; border-radius: var(--radius-sm); border: 1px solid var(--border-color); color: var(--blue-main); font-weight: 600;">
                          ${deal.meetingDate ? `Reunión: ${deal.meetingDate}` : `Control: ${deal.controlDate}`}
                        </span>
                      </div>
                      <p style="font-size: 12px; color: var(--text-main); margin-bottom: 4px;">
                        <strong>Proyecto:</strong> ${deal.projectTitle}
                      </p>
                      <p style="font-size: 12px; color: var(--text-muted);">
                        ${deal.objective}
                      </p>
                    </div>
                  </div>
                `).join('')}
              </div>
            `}
          </div>
        </div>
      </div>
    `;
  }
}


/* --- FILE: projects.js --- */
/**
 * DASHBOARD DE GESTIÓN DE INTERMEDIACIÓN FINANCIERA
 * Módulo de Gestión y Administración de Proyectos de Inversión
 */
class ProjectsModule {
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


/* --- FILE: deals.js --- */
/**
 * DASHBOARD DE GESTIÓN DE INTERMEDIACIÓN FINANCIERA
 * Módulo de Sub-Gestiones y Pipeline por Fondos / Inversores
 */
class DealsModule {
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
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <button class="btn btn-secondary btn-sm" id="btnDealsDownloadTemplate" title="Descargar plantilla Excel oficial">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Plantilla Excel
            </button>
            <label class="btn btn-secondary btn-sm" style="cursor: pointer; display: inline-flex; align-items: center; gap: 6px;" title="Cargar archivo Excel/CSV con Diff y validación">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              Importar Excel
              <input type="file" id="inpDealsImportExcel" accept=".xlsx, .xls, .csv" style="display: none;">
            </label>
            <button class="btn btn-primary btn-sm" id="btnNewDeal">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Nueva Sub-Gestión
            </button>
          </div>
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

    // Descargar plantilla desde Deals
    const btnDownload = this.container.querySelector('#btnDealsDownloadTemplate');
    if (btnDownload) {
      btnDownload.addEventListener('click', () => TemplateManager.downloadExcelTemplate());
    }

    // Importar Excel desde Deals
    const inpImport = this.container.querySelector('#inpDealsImportExcel');
    if (inpImport) {
      inpImport.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          smartImporter.processFile(file);
          e.target.value = '';
        }
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


/* --- FILE: brokers.js --- */
/**
 * DASHBOARD DE GESTIÓN DE INTERMEDIACIÓN FINANCIERA
 * Módulo de Directorio de Dueños Directos, Brokers y Fondos (Control de Vigencias)
 */
class BrokersModule {
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
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <button class="btn btn-secondary btn-sm" id="btnBrokersDownloadTemplate" title="Descargar plantilla Excel oficial">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Plantilla Excel
            </button>
            <label class="btn btn-secondary btn-sm" style="cursor: pointer; display: inline-flex; align-items: center; gap: 6px;" title="Cargar archivo Excel/CSV con Diff y validación">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              Importar Excel
              <input type="file" id="inpBrokersImportExcel" accept=".xlsx, .xls, .csv" style="display: none;">
            </label>
            <button class="btn btn-primary btn-sm" id="btnNewInterlocutor">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Nuevo Contacto / Broker
            </button>
          </div>
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


/* --- FILE: compliance.js --- */
/**
 * DASHBOARD DE GESTIÓN DE INTERMEDIACIÓN FINANCIERA
 * Módulo de Matriz Legal & Estrategia Documental en 3 Capas
 */
class ComplianceModule {
  constructor() {
    this.container = document.getElementById('view-compliance');
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="card">
        <div class="card-header">
          <div>
            <h3>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--emerald-main)" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              Estrategia Documental para Intermediación Financiera en 3 Capas
            </h3>
            <p style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">
              Protocolo legal para evitar circunvenciones, asegurar el cobro de honorarios/overprice y mantener trazabilidad probatoria total.
            </p>
          </div>
          <a href="https://drive.google.com" target="_blank" class="btn btn-drive">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>
            Bóveda de Modelos en Google Drive
          </a>
        </div>

        <div class="card-body">
          <!-- Grilla de las 3 Capas -->
          <div class="grid-3" style="margin-bottom: 28px;">
            <div class="card" style="border: 1px solid rgba(56, 189, 248, 0.3); background: var(--bg-surface);">
              <div class="card-header" style="background: rgba(56, 189, 248, 0.1);">
                <h4 style="font-size: 14px; color: var(--blue-main);">1. Protección & Confidencialidad</h4>
              </div>
              <div class="card-body" style="font-size: 12px; color: var(--text-muted);">
                <p style="margin-bottom: 8px;"><strong>Momento:</strong> Antes de revelar datos sensibles, ubicaciones exactas o nombres de sociedades.</p>
                <ul style="padding-left: 18px; line-height: 1.6;">
                  <li><strong>NDA Bilateral</strong> con Fondos e Inversores Institucionales.</li>
                  <li><strong>NCNDA Bilateral Estricto</strong> con consultoras y brokers.</li>
                  <li><strong>Teaser Ciego (Blind Teaser)</strong> sin información deducible.</li>
                </ul>
              </div>
            </div>

            <div class="card" style="border: 1px solid rgba(245, 158, 11, 0.3); background: var(--bg-surface);">
              <div class="card-header" style="background: rgba(245, 158, 11, 0.1);">
                <h4 style="font-size: 14px; color: var(--gold-light);">2. Mandatos & Honorarios</h4>
              </div>
              <div class="card-body" style="font-size: 12px; color: var(--text-muted);">
                <p style="margin-bottom: 8px;"><strong>Momento:</strong> Antes de presentar formalmente a las partes o abrir el Info Memo.</p>
                <ul style="padding-left: 18px; line-height: 1.6;">
                  <li><strong>Mandato de Venta con Overprice</strong> y Tail Period (12-24 meses) con Dueño Directo.</li>
                  <li><strong>Acuerdo de Co-Brokering + Fee Sharing</strong> (50/50 o sobreprecio) con consultoras.</li>
                  <li><strong>MFPA</strong> con brokers externos del fondo.</li>
                </ul>
              </div>
            </div>

            <div class="card" style="border: 1px solid rgba(16, 185, 129, 0.3); background: var(--bg-surface);">
              <div class="card-header" style="background: rgba(16, 185, 129, 0.1);">
                <h4 style="font-size: 14px; color: var(--emerald-main);">3. Registro & Trazabilidad</h4>
              </div>
              <div class="card-body" style="font-size: 12px; color: var(--text-muted);">
                <p style="margin-bottom: 8px;"><strong>Momento:</strong> Al momento exacto de presentar un proyecto o inversor concreto.</p>
                <ul style="padding-left: 18px; line-height: 1.6;">
                  <li><strong>Carta de Registro (Deal Log)</strong> formal con acuse de recibo y fecha cierta.</li>
                  <li><strong>Anexo Económico por Operación</strong> (Deal Specific Addendum) fijando montos.</li>
                  <li><strong>Minutas de Reunión</strong> registradas en el Dashboard.</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Guía Interactiva de Plantillas y Cláusulas -->
          <div class="card" style="background: var(--bg-surface);">
            <div class="card-header">
              <h4 style="font-size: 15px; color: var(--text-main);">
                📖 Modelos de Contratos y Cláusulas Blindadas
              </h4>
              <span style="font-size: 12px; color: var(--text-muted);">Selecciona un documento para ver sus cláusulas clave</span>
            </div>
            <div class="card-body">
              <div class="grid-2">
                ${Object.values(DOC_TEMPLATES).map(tmpl => `
                  <div class="accordion-item" style="background: var(--bg-card);">
                    <div class="accordion-header" style="cursor: default;">
                      <div>
                        <strong style="color: var(--gold-light);">${tmpl.title}</strong><br>
                        <span style="font-size: 11px; color: var(--text-muted);">${tmpl.layer} &bull; ${tmpl.target}</span>
                      </div>
                    </div>
                    <div class="accordion-body">
                      <p style="margin-bottom: 12px; color: var(--text-main); font-size: 12px;">
                        ${tmpl.summary}
                      </p>
                      ${tmpl.clauses.map(c => `
                        <div style="background: var(--bg-input); padding: 10px; border-radius: var(--radius-sm); border: 1px solid var(--border-color); margin-bottom: 8px;">
                          <span style="font-size: 11px; font-weight: 700; color: var(--blue-main); text-transform: uppercase;">
                            ${c.name}
                          </span>
                          <p style="font-size: 12px; color: var(--text-muted); margin-top: 4px; font-family: monospace;">
                            "${c.text}"
                          </p>
                        </div>
                      `).join('')}
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}


/* --- FILE: settings.js --- */
/**
 * DASHBOARD DE GESTIÓN DE INTERMEDIACIÓN FINANCIERA
 * Módulo de Configuración, Plantillas Excel Dinámicas, Importador y Respaldo de Datos
 */
class SettingsModule {
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


/* --- FILE: app.js --- */
/**
 * DASHBOARD DE GESTIÓN DE INTERMEDIACIÓN FINANCIERA
 * Aplicación Principal y Enrutador SPA
 */







class AppRouter {
  constructor() {
    this.currentView = 'dashboard';
    this.modules = {
      dashboard: new DashboardModule(),
      projects: new ProjectsModule(),
      deals: new DealsModule(),
      interlocutors: new BrokersModule(),
      compliance: new ComplianceModule(),
      settings: new SettingsModule()
    };
  }

  init() {
    auth.init();
    this.attachNavigationEvents();
    this.attachGlobalEvents();
    this.navigateTo('dashboard');
  }

  navigateTo(viewName, filterParam = null) {
    this.currentView = viewName;

    // Actualizar enlaces activos de navegación
    document.querySelectorAll('.nav-link').forEach(link => {
      if (link.dataset.view === viewName) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Actualizar secciones visibles
    document.querySelectorAll('.view-section').forEach(sec => {
      sec.classList.remove('active');
    });

    const targetSection = document.getElementById(`view-${viewName}`);
    if (targetSection) {
      targetSection.classList.add('active');
    }

    // Actualizar Título en Top Header
    const titles = {
      dashboard: { title: 'Dashboard Ejecutivo & Resumen', sub: 'Visión integral de cartera, semáforos de vigencia y KPIs financieros' },
      projects: { title: 'Gestión de Proyectos de Inversión', sub: 'Administración de oportunidades, precios base, overprice y estados' },
      deals: { title: 'Pipeline de Negociaciones por Fondos', sub: 'Sub-gestiones simultáneas, control de gatekeeper y minutas' },
      interlocutors: { title: 'Directorio de Dueños & Brokers', sub: 'Supervisión de mandatos, acuerdos de brokeraje y períodos de cola' },
      compliance: { title: 'Estrategia Documental en 3 Capas', sub: 'Matriz de protección legal, modelos de contratos y no circunvención' },
      settings: { title: 'Configuración del Sistema & Backups', sub: 'Estados de proyecto personalizados, días de alerta y copias JSON' }
    };

    const headerEl = document.querySelector('.header-title');
    if (headerEl && titles[viewName]) {
      headerEl.innerHTML = `
        <h2>${titles[viewName].title}</h2>
        <p>${titles[viewName].sub}</p>
      `;
    }

    // Renderizar Módulo correspondiente
    if (this.modules[viewName]) {
      if (viewName === 'interlocutors' && filterParam) {
        this.modules[viewName].setTrafficFilter(filterParam);
      } else {
        this.modules[viewName].render();
      }
    }

    // Cerrar sidebar en móviles si está abierto
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
      sidebar.classList.remove('open');
    }
  }

  attachNavigationEvents() {
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const view = link.dataset.view;
        if (view) {
          this.navigateTo(view);
        }
      });
    });

    // Toggle móvil
    const mobileBtn = document.getElementById('btnMobileMenu');
    const sidebar = document.querySelector('.sidebar');
    if (mobileBtn && sidebar) {
      mobileBtn.addEventListener('click', () => {
        sidebar.classList.toggle('open');
      });
    }
  }

  attachGlobalEvents() {
    window.addEventListener('data-updated', () => {
      if (this.modules[this.currentView]) {
        this.modules[this.currentView].render();
      }
    });

    window.addEventListener('user-changed', () => {
      if (this.modules[this.currentView]) {
        this.modules[this.currentView].render();
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.appRouter = new AppRouter();
  window.appRouter.init();
});

})();
