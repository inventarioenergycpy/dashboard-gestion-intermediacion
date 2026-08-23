# 💼 Dashboard de Gestión de Proyectos e Intermediación Financiera

Plataforma web ejecutiva diseñada para la gestión, administración y supervisión de proyectos de inversión, seguimiento de sub-gestiones con Fondos de Inversión / Brokers y aplicación estricta de la **Estrategia Documental de Protección Legal en 3 Capas**.

[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-brightgreen)](https://inventarioenergycpy.github.io/dashboard-gestion-intermediacion/)
[![Version](https://img.shields.io/badge/Versi%C3%B3n-1.0.0-gold)](https://github.com/inventarioenergycpy/dashboard-gestion-intermediacion)

---

## 👥 Usuarios Autorizados y Roles

El acceso está restringido exclusivamente a las siguientes cuentas:

| Consultor | Correo Electrónico | Perfil / Rol | Permisos |
| :--- | :--- | :--- | :--- |
| **Javier** | `inventario.energycpy@gmail.com` | **Administrador & Consultor** | Control total, configuración de estados, administración de alertas y exportación de backups. |
| **Daniel** | `gonzalezmarcelo2105ypf@gmail.com` | **Consultor** | Gestión de cartera, carga de sub-gestiones, minutas de reunión y control documental. |

---

## ⚖️ Estrategia Documental en 3 Capas (Núcleo del Sistema)

Para evitar circunvenciones (*circumvention*) y asegurar el cobro de comisiones y *overprice*, el sistema implementa un motor de verificación en 3 fases:

1. **Capa 1: Protección y Confidencialidad (Antes de revelar datos sensibles)**:
   - **NDA Bilateral con Inversor / Fondo**: No circunvención y reconocimiento de honorarios de introducción (*Buy-side fee*).
   - **NCNDA Bilateral con Brokers**: Pacto recíproco de no elusión y penalización.
   - **Teaser Ciego (*Blind Teaser*)**: Resumen sin datos deducibles.

2. **Capa 2: Mandatos y Reparto de Honorarios (Antes de presentar a las partes)**:
   - **Mandato de Venta con Overprice (Dueño Directo)**: Fija el precio neto base, legitima el sobreprecio y activa la protección de contactos (*Tail Period* de 12 a 24 meses).
   - **Acuerdo de Co-Brokering + Fee Sharing (Consultora con Mandato)**: Reparto 50/50 o sobreprecio con garantía de mandato.
   - **Master Fee Protection Agreement (MFPA)**: Contrato con brokers externos.

3. **Capa 3: Registro y Trazabilidad (Al presentar una operación)**:
   - **Carta de Registro de Inversores (*Deal Log*)**: Notificación fehaciente con fecha cierta que fija la autoría de la presentación.
   - **Anexo Económico por Operación (*Deal Specific Addendum*)**: Fija los importes exactos del negocio puntual.
   - **Minutas y Bitácora**: Registro cronológico de hitos y acuerdos.

---

## 🚀 Características Principales del Dashboard

- **Semáforo de Vigencias Legales**: Alerta automática sobre contratos vencidos (🔴), próximos a vencer en < 30 días (🟡) y vigentes (🟢).
- **Gestión Multi-Deal por Proyecto**: Un mismo proyecto puede presentarse a múltiples Fondos en simultáneo, cada uno con su propio objetivo, fecha de control y checklist legal.
- **Checklist Gatekeeper Legal**: Bloqueo o advertencia visual si falta el NDA o la Carta de Registro antes de abrir el *Data Room*.
- **Configurador Dinámico de Estados**: Personalización de colores y agregado de nuevos estados para los proyectos.
- **Integración con Google Drive**: Enlaces directos a las carpetas oficiales de `inventario.energycpy@gmail.com`.
- **Copia de Seguridad JSON**: Exportación e importación completa de la base de datos para resguardo preventivo.

---

## 📂 Estructura del Repositorio

```text
dashboard-gestion-intermediacion/
├── index.html                  # Punto de entrada y SPA
├── css/
│   ├── main.css                # Estilos base, variables, Dark Mode Fintech
│   ├── components.css          # Tarjetas KPI, semáforos, modales y tablas
│   └── responsive.css          # Adaptación móvil y tablet
├── js/
│   ├── app.js                  # Enrutador principal
│   ├── auth.js                 # Control de acceso para Javier y Daniel
│   ├── store.js                # Almacenamiento reactivo LocalStorage / JSON
│   ├── modules/
│   │   ├── dashboard.js        # KPIs y semáforo de alertas
│   │   ├── projects.js         # Cartera de proyectos y precios base
│   │   ├── deals.js            # Pipeline y checklist gatekeeper
│   │   ├── brokers.js          # Directorio de dueños, brokers y vigencias
│   │   ├── compliance.js       # Matriz legal en 3 capas
│   │   └── settings.js         # Configurador de estados y exportación
│   └── templates/
│       └── doc-templates.js    # Modelos de cláusulas y contratos
└── docs/
    ├── manual-operativo.md     # Guía práctica para consultores
    └── matriz-legal-estrategica.md # Fundamentos jurídicos
```

---

## 🌐 Despliegue en GitHub Pages

La plataforma está optimizada para ejecutarse como Single Page Application (SPA) directamente en GitHub Pages:
**[https://inventarioenergycpy.github.io/dashboard-gestion-intermediacion/](https://inventarioenergycpy.github.io/dashboard-gestion-intermediacion/)**
