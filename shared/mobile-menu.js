/**
 * Mobile sidebar menu open/close logic.
 * Include this script after shared/components.js has rendered the sidebar.
 */
(function () {
  var menuButton = document.getElementById('mobile-menu-button');
  var closeButton = document.getElementById('mobile-close-button');
  var sidebar = document.getElementById('mobile-sidebar-inner');
  var backdrop = document.getElementById('mobile-backdrop');
  var menuPanel = document.getElementById('mobile-menu-panel');
  var navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!menuButton || !sidebar) return;

  function openMenu() {
    sidebar.classList.remove('hidden');
    setTimeout(function () {
      sidebar.classList.remove('pointer-events-none');
      backdrop.classList.remove('opacity-0');
      backdrop.classList.add('opacity-100');
      menuPanel.classList.remove('translate-x-full');
      menuPanel.classList.add('translate-x-0');
    }, 10);
  }

  function closeMenu() {
    backdrop.classList.remove('opacity-100');
    backdrop.classList.add('opacity-0');
    menuPanel.classList.remove('translate-x-0');
    menuPanel.classList.add('translate-x-full');
    setTimeout(function () {
      sidebar.classList.add('hidden');
      sidebar.classList.add('pointer-events-none');
    }, 300);
  }

  menuButton.addEventListener('click', openMenu);
  if (closeButton) closeButton.addEventListener('click', closeMenu);
  if (backdrop) backdrop.addEventListener('click', closeMenu);

  navLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });
})();
