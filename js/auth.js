/**
 * DASHBOARD DE GESTIÓN DE INTERMEDIACIÓN FINANCIERA
 * Módulo de Autenticación y Control de Acceso por Perfil
 */

import { store } from './store.js';

export class AuthManager {
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

export const auth = new AuthManager();
