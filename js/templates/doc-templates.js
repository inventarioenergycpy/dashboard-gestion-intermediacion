/**
 * DASHBOARD DE GESTIÓN DE INTERMEDIACIÓN FINANCIERA
 * Plantillas y Cláusulas Esenciales de la Estrategia Documental en 3 Capas
 */

export const DOC_TEMPLATES = {
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
