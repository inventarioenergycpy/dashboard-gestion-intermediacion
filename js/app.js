/**
 * DASHBOARD DE GESTIÓN DE INTERMEDIACIÓN FINANCIERA
 * Aplicación Principal y Enrutador SPA
 */

import { auth } from './auth.js';
import { DashboardModule } from './modules/dashboard.js';
import { ProjectsModule } from './modules/projects.js';
import { DealsModule } from './modules/deals.js';
import { BrokersModule } from './modules/brokers.js';
import { ComplianceModule } from './modules/compliance.js';
import { SettingsModule } from './modules/settings.js';

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
