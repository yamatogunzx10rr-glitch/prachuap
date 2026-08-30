/**
 * @jest-environment jsdom
 */

const { createMobileMenu, initMobileMenu } = require('../js/mobile-menu');

describe('Mobile Menu Module', () => {
  let sidebar, backdrop, menuPanel;

  beforeEach(() => {
    sidebar = document.createElement('div');
    sidebar.classList.add('hidden', 'pointer-events-none');

    backdrop = document.createElement('div');
    backdrop.classList.add('opacity-0');

    menuPanel = document.createElement('div');
    menuPanel.classList.add('translate-x-full');
  });

  describe('createMobileMenu', () => {
    it('should return openMenu, closeMenu, and isOpen functions', () => {
      const menu = createMobileMenu({ sidebar, backdrop, menuPanel });
      expect(typeof menu.openMenu).toBe('function');
      expect(typeof menu.closeMenu).toBe('function');
      expect(typeof menu.isOpen).toBe('function');
    });

    it('should report menu as closed initially', () => {
      const menu = createMobileMenu({ sidebar, backdrop, menuPanel });
      expect(menu.isOpen()).toBe(false);
    });
  });

  describe('openMenu', () => {
    it('should remove hidden class from sidebar', () => {
      const menu = createMobileMenu({ sidebar, backdrop, menuPanel });
      menu.openMenu();
      expect(sidebar.classList.contains('hidden')).toBe(false);
    });

    it('should remove pointer-events-none from sidebar', () => {
      const menu = createMobileMenu({ sidebar, backdrop, menuPanel });
      menu.openMenu();
      expect(sidebar.classList.contains('pointer-events-none')).toBe(false);
    });

    it('should add opacity-100 to backdrop', () => {
      const menu = createMobileMenu({ sidebar, backdrop, menuPanel });
      menu.openMenu();
      expect(backdrop.classList.contains('opacity-100')).toBe(true);
    });

    it('should remove opacity-0 from backdrop', () => {
      const menu = createMobileMenu({ sidebar, backdrop, menuPanel });
      menu.openMenu();
      expect(backdrop.classList.contains('opacity-0')).toBe(false);
    });

    it('should add translate-x-0 to menu panel', () => {
      const menu = createMobileMenu({ sidebar, backdrop, menuPanel });
      menu.openMenu();
      expect(menuPanel.classList.contains('translate-x-0')).toBe(true);
    });

    it('should remove translate-x-full from menu panel', () => {
      const menu = createMobileMenu({ sidebar, backdrop, menuPanel });
      menu.openMenu();
      expect(menuPanel.classList.contains('translate-x-full')).toBe(false);
    });

    it('should report menu as open after opening', () => {
      const menu = createMobileMenu({ sidebar, backdrop, menuPanel });
      menu.openMenu();
      expect(menu.isOpen()).toBe(true);
    });
  });

  describe('closeMenu', () => {
    it('should add hidden class to sidebar', () => {
      const menu = createMobileMenu({ sidebar, backdrop, menuPanel });
      menu.openMenu();
      menu.closeMenu();
      expect(sidebar.classList.contains('hidden')).toBe(true);
    });

    it('should add pointer-events-none to sidebar', () => {
      const menu = createMobileMenu({ sidebar, backdrop, menuPanel });
      menu.openMenu();
      menu.closeMenu();
      expect(sidebar.classList.contains('pointer-events-none')).toBe(true);
    });

    it('should remove opacity-100 from backdrop', () => {
      const menu = createMobileMenu({ sidebar, backdrop, menuPanel });
      menu.openMenu();
      menu.closeMenu();
      expect(backdrop.classList.contains('opacity-100')).toBe(false);
    });

    it('should add opacity-0 to backdrop', () => {
      const menu = createMobileMenu({ sidebar, backdrop, menuPanel });
      menu.openMenu();
      menu.closeMenu();
      expect(backdrop.classList.contains('opacity-0')).toBe(true);
    });

    it('should add translate-x-full to menu panel', () => {
      const menu = createMobileMenu({ sidebar, backdrop, menuPanel });
      menu.openMenu();
      menu.closeMenu();
      expect(menuPanel.classList.contains('translate-x-full')).toBe(true);
    });

    it('should remove translate-x-0 from menu panel', () => {
      const menu = createMobileMenu({ sidebar, backdrop, menuPanel });
      menu.openMenu();
      menu.closeMenu();
      expect(menuPanel.classList.contains('translate-x-0')).toBe(false);
    });

    it('should report menu as closed after closing', () => {
      const menu = createMobileMenu({ sidebar, backdrop, menuPanel });
      menu.openMenu();
      menu.closeMenu();
      expect(menu.isOpen()).toBe(false);
    });
  });

  describe('toggle behavior', () => {
    it('should support repeated open/close cycles', () => {
      const menu = createMobileMenu({ sidebar, backdrop, menuPanel });

      menu.openMenu();
      expect(menu.isOpen()).toBe(true);

      menu.closeMenu();
      expect(menu.isOpen()).toBe(false);

      menu.openMenu();
      expect(menu.isOpen()).toBe(true);
    });
  });

  describe('initMobileMenu', () => {
    beforeEach(() => {
      document.body.innerHTML = `
        <button id="mobile-menu-button"></button>
        <button id="mobile-close-button"></button>
        <div id="mobile-sidebar" class="hidden pointer-events-none">
          <div id="mobile-backdrop" class="opacity-0"></div>
          <div id="mobile-menu-panel" class="translate-x-full">
            <a class="mobile-nav-link" href="#">Link 1</a>
            <a class="mobile-nav-link" href="#">Link 2</a>
          </div>
        </div>
      `;
    });

    it('should return a menu object when DOM elements exist', () => {
      const menu = initMobileMenu();
      expect(menu).not.toBeNull();
      expect(typeof menu.openMenu).toBe('function');
    });

    it('should return null when required elements are missing', () => {
      document.body.innerHTML = '';
      const menu = initMobileMenu();
      expect(menu).toBeNull();
    });

    it('should open menu when menu button is clicked', () => {
      initMobileMenu();
      const menuButton = document.getElementById('mobile-menu-button');
      menuButton.click();
      const sidebar = document.getElementById('mobile-sidebar');
      expect(sidebar.classList.contains('hidden')).toBe(false);
    });

    it('should close menu when close button is clicked', () => {
      initMobileMenu();
      const menuButton = document.getElementById('mobile-menu-button');
      const closeButton = document.getElementById('mobile-close-button');
      menuButton.click();
      closeButton.click();
      const sidebar = document.getElementById('mobile-sidebar');
      expect(sidebar.classList.contains('hidden')).toBe(true);
    });

    it('should close menu when backdrop is clicked', () => {
      initMobileMenu();
      const menuButton = document.getElementById('mobile-menu-button');
      const backdropEl = document.getElementById('mobile-backdrop');
      menuButton.click();
      backdropEl.click();
      const sidebar = document.getElementById('mobile-sidebar');
      expect(sidebar.classList.contains('hidden')).toBe(true);
    });

    it('should close menu when a nav link is clicked', () => {
      initMobileMenu();
      const menuButton = document.getElementById('mobile-menu-button');
      menuButton.click();
      const navLink = document.querySelector('.mobile-nav-link');
      navLink.click();
      const sidebar = document.getElementById('mobile-sidebar');
      expect(sidebar.classList.contains('hidden')).toBe(true);
    });
  });
});
