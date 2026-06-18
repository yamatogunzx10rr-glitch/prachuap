/**
 * Mobile sidebar menu module.
 * Handles open/close toggling with CSS class-based animations.
 */

function createMobileMenu({ sidebar, backdrop, menuPanel }) {
  function openMenu() {
    sidebar.classList.remove('hidden');
    sidebar.classList.remove('pointer-events-none');
    backdrop.classList.remove('opacity-0');
    backdrop.classList.add('opacity-100');
    menuPanel.classList.remove('translate-x-full');
    menuPanel.classList.add('translate-x-0');
  }

  function closeMenu() {
    backdrop.classList.remove('opacity-100');
    backdrop.classList.add('opacity-0');
    menuPanel.classList.remove('translate-x-0');
    menuPanel.classList.add('translate-x-full');
    sidebar.classList.add('hidden');
    sidebar.classList.add('pointer-events-none');
  }

  function isOpen() {
    return !sidebar.classList.contains('hidden');
  }

  return { openMenu, closeMenu, isOpen };
}

function initMobileMenu() {
  const menuButton = document.getElementById('mobile-menu-button');
  const closeButton = document.getElementById('mobile-close-button');
  const sidebar = document.getElementById('mobile-sidebar');
  const backdrop = document.getElementById('mobile-backdrop');
  const menuPanel = document.getElementById('mobile-menu-panel');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!sidebar || !backdrop || !menuPanel) return null;

  const menu = createMobileMenu({ sidebar, backdrop, menuPanel });

  if (menuButton) menuButton.addEventListener('click', menu.openMenu);
  if (closeButton) closeButton.addEventListener('click', menu.closeMenu);
  if (backdrop) backdrop.addEventListener('click', menu.closeMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', menu.closeMenu);
  });

  return menu;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { createMobileMenu, initMobileMenu };
}
