/**
 * Card renderer module.
 * Generates HTML cards for the category/portfolio grid display.
 */

function createCardHtml(img) {
  if (!img || !img.src || !img.title) {
    return '';
  }

  const alt = img.alt || img.title;
  const src = escapeHtml(img.src);
  const altText = escapeHtml(alt);
  const title = escapeHtml(img.title);

  return `
    <article class="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 group hover:shadow-xl hover:border-blue-200 transition duration-300 flex flex-col justify-between">
      <div class="bg-slate-100 h-32 flex flex-col items-center justify-center text-xs text-slate-400 group-hover:bg-blue-50/50 transition relative overflow-hidden border-b border-slate-100">
        <img src="${src}" alt="${altText}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300" loading="lazy" />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent opacity-0 group-hover:opacity-100 transition"></div>
      </div>
      <div class="p-3 text-center bg-white">
        <h3 class="text-xs font-semibold text-slate-700 group-hover:text-blue-600 transition">${title}</h3>
      </div>
    </article>
  `;
}

function renderCards(container, images) {
  if (!container || !Array.isArray(images)) return false;
  container.innerHTML = images.map(createCardHtml).join('');
  return true;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { createCardHtml, renderCards, escapeHtml };
}
