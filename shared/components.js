/**
 * Shared UI components for Prachuap Online.
 *
 * Usage – add placeholder elements in your HTML, then call the
 * corresponding render function after DOM is ready:
 *
 *   <div id="floating-buttons"></div>
 *   <div id="navbar"></div>
 *   <div id="mobile-sidebar"></div>
 *   ...page content...
 *   <div id="contact-section"></div>
 *   <div id="site-footer"></div>
 *   <script src="shared/components.js"></script>
 *   <script src="shared/mobile-menu.js"></script>
 */

const PrachuapComponents = (() => {
  // ── Floating Contact Buttons ────────────────────────────────────
  function renderFloatingButtons(targetId) {
    const el = document.getElementById(targetId || 'floating-buttons');
    if (!el) return;
    el.innerHTML = `
    <div class="fixed bottom-6 right-6 z-50 flex flex-col gap-3.5">
        <a href="https://line.me/ti/p/~adminkasem" target="_blank" rel="noopener"
           class="flex items-center justify-center w-14 h-14 bg-[#06C755] text-white rounded-full shadow-xl hover:bg-[#05b34c] transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 group relative"
           title="\u0E41\u0E0A\u0E17\u0E1C\u0E48\u0E32\u0E19 Line">
            <i class="fa-brands fa-line text-3xl"></i>
            <span class="absolute right-16 bg-slate-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none shadow-md border border-slate-700">
                Line: adminkasem
            </span>
        </a>
        <a href="tel:0638890295"
           class="flex items-center justify-center w-14 h-14 bg-blue-600 text-white rounded-full shadow-xl hover:bg-blue-700 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 group relative"
           title="\u0E42\u0E17\u0E23\u0E2B\u0E32\u0E40\u0E23\u0E32">
            <i class="fa-solid fa-phone text-2xl animate-pulse"></i>
            <span class="absolute right-16 bg-slate-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none shadow-md border border-slate-700">
                \u0E42\u0E17\u0E23: 063-889-0295
            </span>
        </a>
    </div>`;
  }

  // ── Navbar ──────────────────────────────────────────────────────
  function renderNavbar(targetId, opts) {
    const el = document.getElementById(targetId || 'navbar');
    if (!el) return;
    const basePath = (opts && opts.basePath) || '';
    el.innerHTML = `
    <nav class="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-20">
                <div class="flex items-center">
                    <a href="${basePath}index.html" class="flex-shrink-0 flex items-center" title="\u0E2B\u0E19\u0E49\u0E32\u0E41\u0E23\u0E01 Prachuap Online">
                        <img src="${basePath}logoprachuap.jpg" alt="Prachuap Online - \u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E23\u0E31\u0E1A\u0E17\u0E33\u0E40\u0E27\u0E47\u0E1A\u0E44\u0E0B\u0E15\u0E4C\u0E04\u0E23\u0E1A\u0E27\u0E07\u0E08\u0E23" class="h-12 w-auto object-contain py-1">
                    </a>
                </div>
                <div class="hidden xl:flex items-center space-x-5">
                    <a href="${basePath}index.html" class="text-slate-600 hover:text-blue-600 font-medium transition duration-200 text-sm">Home</a>
                    <a href="${basePath}promotion.html" class="text-slate-600 hover:text-blue-600 font-medium transition duration-200 text-sm">\u0E42\u0E1B\u0E23\u0E42\u0E21\u0E0A\u0E31\u0E48\u0E19</a>
                    <a href="${basePath}service.html" class="text-slate-600 hover:text-blue-600 font-medium transition duration-200 text-sm">\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E2D\u0E37\u0E48\u0E19\u0E46</a>
                    <a href="${basePath}domain.html" class="text-slate-600 hover:text-blue-600 font-medium transition duration-200 text-sm">\u0E23\u0E32\u0E04\u0E32 \u0E0A\u0E37\u0E48\u0E2D\u0E40\u0E27\u0E47\u0E1A</a>
                    <a href="${basePath}category.html" class="text-slate-600 hover:text-blue-600 font-medium transition duration-200 text-sm">\u0E15\u0E31\u0E27\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E40\u0E27\u0E47\u0E1A</a>
                    <a href="${basePath}cms.html" class="text-slate-600 hover:text-blue-600 font-medium transition duration-200 text-sm">\u0E23\u0E31\u0E1A\u0E1E\u0E31\u0E12\u0E19\u0E32\u0E40\u0E27\u0E47\u0E1A\u0E40\u0E14\u0E34\u0E21</a>
                    <a href="${basePath}about.html" class="text-slate-600 hover:text-blue-600 font-medium transition duration-200 text-sm">\u0E40\u0E01\u0E35\u0E48\u0E22\u0E27\u0E01\u0E31\u0E1A\u0E40\u0E23\u0E32</a>
                    <a href="#contact" class="bg-blue-600 text-white px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-700 transition shadow-md shadow-blue-600/20 flex items-center gap-2">
                        <i class="fa-solid fa-comments"></i> \u0E15\u0E34\u0E14\u0E15\u0E48\u0E2D\u0E40\u0E23\u0E32
                    </a>
                </div>
                <div class="flex items-center xl:hidden">
                    <button id="mobile-menu-button" aria-label="\u0E40\u0E1B\u0E34\u0E14\u0E40\u0E21\u0E19\u0E39\u0E19\u0E33\u0E17\u0E32\u0E07" class="text-slate-600 hover:text-blue-600 focus:outline-none p-2 text-2xl transition">
                        <i class="fa-solid fa-bars"></i>
                    </button>
                </div>
            </div>
        </div>
    </nav>`;
  }

  // ── Mobile Sidebar ──────────────────────────────────────────────
  function renderMobileSidebar(targetId, opts) {
    const el = document.getElementById(targetId || 'mobile-sidebar');
    if (!el) return;
    const basePath = (opts && opts.basePath) || '';
    el.innerHTML = `
    <div id="mobile-sidebar-inner" class="fixed inset-0 z-50 overflow-hidden hidden pointer-events-none transition-all duration-300">
        <div id="mobile-backdrop" class="absolute inset-0 bg-slate-900/50 opacity-0 transition-opacity duration-300 pointer-events-auto"></div>
        <div id="mobile-menu-panel" class="absolute inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl flex flex-col p-6 translate-x-full transition-transform duration-300 ease-in-out pointer-events-auto">
            <div class="flex items-center justify-between mb-8">
                <span class="font-bold text-lg text-slate-900">\u0E40\u0E21\u0E19\u0E39\u0E19\u0E33\u0E17\u0E32\u0E07</span>
                <button id="mobile-close-button" aria-label="\u0E1B\u0E34\u0E14\u0E40\u0E21\u0E19\u0E39" class="text-slate-500 hover:text-slate-800 text-xl p-2">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
            <div class="flex flex-col space-y-4">
                <a href="${basePath}index.html" class="mobile-nav-link text-slate-700 hover:text-blue-600 font-medium py-2 border-b border-slate-100 text-base">Home</a>
                <a href="${basePath}promotion.html" class="mobile-nav-link text-slate-700 hover:text-blue-600 font-medium py-2 border-b border-slate-100 text-base">\u0E42\u0E1B\u0E23\u0E42\u0E21\u0E0A\u0E31\u0E48\u0E19</a>
                <a href="${basePath}service.html" class="mobile-nav-link text-slate-700 hover:text-blue-600 font-medium py-2 border-b border-slate-100 text-base">\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E2D\u0E37\u0E48\u0E19\u0E46</a>
                <a href="${basePath}domain.html" class="mobile-nav-link text-slate-700 hover:text-blue-600 font-medium py-2 border-b border-slate-100 text-base">\u0E23\u0E32\u0E04\u0E32 \u0E0A\u0E37\u0E48\u0E2D\u0E40\u0E27\u0E47\u0E1A</a>
                <a href="${basePath}category.html" class="mobile-nav-link text-slate-700 hover:text-blue-600 font-medium py-2 border-b border-slate-100 text-base">\u0E15\u0E31\u0E27\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E40\u0E27\u0E47\u0E1A</a>
                <a href="${basePath}cms.html" class="mobile-nav-link text-slate-700 hover:text-blue-600 font-medium py-2 border-b border-slate-100 text-base">\u0E23\u0E31\u0E1A\u0E1E\u0E31\u0E12\u0E19\u0E32\u0E40\u0E27\u0E47\u0E1A\u0E40\u0E14\u0E34\u0E21</a>
                <a href="${basePath}about.html" class="mobile-nav-link text-slate-700 hover:text-blue-600 font-medium py-2 border-b border-slate-100 text-base">\u0E40\u0E01\u0E35\u0E48\u0E22\u0E27\u0E01\u0E31\u0E1A\u0E40\u0E23\u0E32</a>
                <a href="#contact" class="mobile-nav-link bg-blue-600 text-white text-center px-5 py-3 rounded-xl font-bold text-base hover:bg-blue-700 transition shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 mt-4">
                    <i class="fa-solid fa-comments"></i> \u0E15\u0E34\u0E14\u0E15\u0E48\u0E2D\u0E40\u0E23\u0E32
                </a>
            </div>
        </div>
    </div>`;
  }

  // ── Contact Section ─────────────────────────────────────────────
  function renderContactSection(targetId, opts) {
    const el = document.getElementById(targetId || 'contact-section');
    if (!el) return;
    const title = (opts && opts.title) || '\u0E15\u0E34\u0E14\u0E15\u0E48\u0E2D\u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19\u0E23\u0E32\u0E04\u0E32\u0E17\u0E33\u0E40\u0E27\u0E47\u0E1A\u0E44\u0E0B\u0E15\u0E4C\u0E1F\u0E23\u0E35';
    const desc = (opts && opts.description) || '\u0E1E\u0E39\u0E14\u0E04\u0E38\u0E22\u0E41\u0E25\u0E01\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E44\u0E2D\u0E40\u0E14\u0E35\u0E22\u0E41\u0E25\u0E30\u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14\u0E04\u0E27\u0E32\u0E21\u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E44\u0E14\u0E49\u0E15\u0E25\u0E2D\u0E14\u0E40\u0E27\u0E25\u0E32 \u0E44\u0E21\u0E48\u0E21\u0E35\u0E04\u0E48\u0E32\u0E43\u0E0A\u0E49\u0E08\u0E48\u0E32\u0E22\u0E40\u0E1A\u0E37\u0E49\u0E2D\u0E07\u0E15\u0E49\u0E19';
    el.innerHTML = `
    <section id="contact" class="py-24 bg-slate-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-100">
                <div>
                    <h2 class="text-3xl font-bold text-slate-900">${title}</h2>
                    <p class="mt-4 text-slate-600">${desc}</p>
                    <div class="mt-12 space-y-6">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-lg">
                                <i class="fa-solid fa-phone"></i>
                            </div>
                            <div>
                                <span class="text-sm text-slate-400">\u0E40\u0E1A\u0E2D\u0E23\u0E4C\u0E42\u0E17\u0E23\u0E28\u0E31\u0E1E\u0E17\u0E4C</span>
                                <p class="text-base font-semibold text-slate-900">063-889-0295</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-lg">
                                <i class="fa-solid fa-envelope"></i>
                            </div>
                            <div>
                                <span class="text-sm text-slate-400">\u0E2D\u0E35\u0E40\u0E21\u0E25\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E15\u0E34\u0E14\u0E15\u0E48\u0E2D\u0E07\u0E32\u0E19</span>
                                <p class="text-base font-semibold text-slate-900">zx1000rr@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="space-y-4 bg-slate-50 rounded-2xl p-6 border border-slate-100">
                    <h3 class="text-lg font-bold text-slate-900 mb-4 text-center sm:text-left">\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E0A\u0E48\u0E2D\u0E07\u0E17\u0E32\u0E07\u0E17\u0E35\u0E48\u0E04\u0E38\u0E13\u0E2A\u0E30\u0E14\u0E27\u0E01\u0E04\u0E38\u0E22</h3>
                    <a href="https://line.me/ti/p/~adminkasem" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center gap-3 w-full bg-[#06C755] hover:bg-[#05b34c] text-white py-4 rounded-xl font-semibold shadow-lg shadow-green-600/20 transition">
                        <i class="fa-brands fa-line text-xl"></i>
                        \u0E41\u0E0A\u0E17\u0E1C\u0E48\u0E32\u0E19 Line Official / ID
                    </a>
                    <a href="mailto:zx1000rr@gmail.com?subject=\u0E15\u0E34\u0E14\u0E15\u0E48\u0E2D\u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19\u0E23\u0E32\u0E04\u0E32\u0E40\u0E27\u0E47\u0E1A\u0E44\u0E0B\u0E15\u0E4C" class="flex items-center justify-center gap-3 w-full bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-xl font-semibold shadow-lg transition">
                        <i class="fa-solid fa-envelope text-xl"></i>
                        \u0E2A\u0E48\u0E07\u0E2D\u0E35\u0E40\u0E21\u0E25\u0E2B\u0E32\u0E40\u0E23\u0E32\u0E42\u0E14\u0E22\u0E15\u0E23\u0E07
                    </a>
                    <a href="tel:0638890295" class="flex items-center justify-center gap-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold shadow-lg shadow-blue-600/20 transition">
                        <i class="fa-solid fa-phone text-xl"></i>
                        \u0E42\u0E17\u0E23\u0E04\u0E38\u0E22\u0E15\u0E2D\u0E19\u0E19\u0E35\u0E49 (063-889-0295)
                    </a>
                </div>
            </div>
        </div>
    </section>`;
  }

  // ── Footer ──────────────────────────────────────────────────────
  function renderFooter(targetId, opts) {
    const el = document.getElementById(targetId || 'site-footer');
    if (!el) return;
    const basePath = (opts && opts.basePath) || '';
    el.innerHTML = `
    <footer class="bg-slate-900 text-slate-400 pt-16 pb-12 border-t border-slate-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-slate-800">
                <div class="space-y-4">
                    <div class="flex items-center gap-2">
                        <i class="fa-solid fa-code text-blue-500 text-2xl"></i>
                        <span class="text-2xl font-bold text-white tracking-wide">prachuap online</span>
                    </div>
                    <p class="text-sm leading-relaxed text-slate-400">
                        \u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E23\u0E31\u0E1A\u0E17\u0E33\u0E40\u0E27\u0E47\u0E1A\u0E44\u0E0B\u0E15\u0E4C\u0E04\u0E23\u0E1A\u0E27\u0E07\u0E08\u0E23 \u0E2D\u0E2D\u0E01\u0E41\u0E1A\u0E1A\u0E2A\u0E27\u0E22\u0E07\u0E32\u0E21 \u0E23\u0E2D\u0E07\u0E23\u0E31\u0E1A\u0E21\u0E37\u0E2D\u0E16\u0E37\u0E2D
                        \u0E41\u0E25\u0E30\u0E1E\u0E31\u0E12\u0E19\u0E32\u0E23\u0E30\u0E1A\u0E1A\u0E15\u0E32\u0E21\u0E04\u0E27\u0E32\u0E21\u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E43\u0E19\u0E23\u0E32\u0E04\u0E32\u0E17\u0E35\u0E48\u0E08\u0E31\u0E1A\u0E15\u0E49\u0E2D\u0E07\u0E44\u0E14\u0E49
                    </p>
                </div>
                <div>
                    <h3 class="text-white font-semibold text-base mb-4 tracking-wider uppercase">\u0E40\u0E21\u0E19\u0E39\u0E40\u0E27\u0E47\u0E1A\u0E44\u0E0B\u0E15\u0E4C</h3>
                    <div class="grid grid-cols-2 gap-3 text-sm">
                        <div class="flex flex-col space-y-2.5">
                            <a href="${basePath}index.html" class="hover:text-blue-400 transition duration-200 flex items-center gap-1.5"><i class="fa-solid fa-chevron-right text-[10px] text-slate-600"></i> Home</a>
                            <a href="${basePath}promotion.html" class="hover:text-blue-400 transition duration-200 flex items-center gap-1.5"><i class="fa-solid fa-chevron-right text-[10px] text-slate-600"></i> \u0E42\u0E1B\u0E23\u0E42\u0E21\u0E0A\u0E31\u0E48\u0E19</a>
                            <a href="${basePath}service.html" class="hover:text-blue-400 transition duration-200 flex items-center gap-1.5"><i class="fa-solid fa-chevron-right text-[10px] text-slate-600"></i> \u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E2D\u0E37\u0E48\u0E19\u0E46</a>
                            <a href="${basePath}domain.html" class="hover:text-blue-400 transition duration-200 flex items-center gap-1.5"><i class="fa-solid fa-chevron-right text-[10px] text-slate-600"></i> \u0E23\u0E32\u0E04\u0E32 \u0E0A\u0E37\u0E48\u0E2D\u0E40\u0E27\u0E47\u0E1A</a>
                        </div>
                        <div class="flex flex-col space-y-2.5">
                            <a href="${basePath}category.html" class="hover:text-blue-400 transition duration-200 flex items-center gap-1.5"><i class="fa-solid fa-chevron-right text-[10px] text-slate-600"></i> \u0E15\u0E31\u0E27\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E40\u0E27\u0E47\u0E1A</a>
                            <a href="${basePath}cms.html" class="hover:text-blue-400 transition duration-200 flex items-center gap-1.5"><i class="fa-solid fa-chevron-right text-[10px] text-slate-600"></i> \u0E1E\u0E31\u0E12\u0E19\u0E32\u0E40\u0E27\u0E47\u0E1A\u0E40\u0E14\u0E34\u0E21</a>
                            <a href="${basePath}about.html" class="hover:text-blue-400 transition duration-200 flex items-center gap-1.5"><i class="fa-solid fa-chevron-right text-[10px] text-slate-600"></i> \u0E40\u0E01\u0E35\u0E48\u0E22\u0E27\u0E01\u0E31\u0E1A\u0E40\u0E23\u0E32</a>
                        </div>
                    </div>
                </div>
                <div class="space-y-3 text-sm">
                    <h3 class="text-white font-semibold text-base mb-4 tracking-wider uppercase">\u0E15\u0E34\u0E14\u0E15\u0E48\u0E2D\u0E40\u0E23\u0E32</h3>
                    <p class="flex items-center gap-2"><i class="fa-solid fa-phone text-blue-500 w-4"></i> 063-889-0295</p>
                    <p class="flex items-center gap-2"><i class="fa-solid fa-envelope text-blue-500 w-4"></i> zx1000rr@gmail.com</p>
                </div>
            </div>
            <div class="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                <p class="text-xs text-slate-500">&copy; 2026 prachuap online Studio. All rights reserved.</p>
                <div class="flex gap-4 text-slate-500 text-lg">
                    <a href="#" class="hover:text-white transition" aria-label="Facebook"><i class="fa-brands fa-facebook"></i></a>
                    <a href="#" class="hover:text-white transition" aria-label="Line"><i class="fa-brands fa-line"></i></a>
                </div>
            </div>
        </div>
    </footer>`;
  }

  // ── Render all common components at once ─────────────────────────
  function renderAll(opts) {
    const o = opts || {};
    renderFloatingButtons(o.floatingButtonsId);
    renderNavbar(o.navbarId, o);
    renderMobileSidebar(o.mobileSidebarId, o);
    renderContactSection(o.contactSectionId, o);
    renderFooter(o.footerId, o);
  }

  return {
    renderFloatingButtons: renderFloatingButtons,
    renderNavbar: renderNavbar,
    renderMobileSidebar: renderMobileSidebar,
    renderContactSection: renderContactSection,
    renderFooter: renderFooter,
    renderAll: renderAll
  };
})();
