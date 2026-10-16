/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

const htmlFiles = [
  'index.html',
  'about.html',
  'service.html',
  'promotion.html',
  'domain.html',
  'category.html',
  'cms.html',
  'services/index.html',
  'services/web-design.html'
];

// Known broken links in the repo (pages that don't exist yet)
const KNOWN_MISSING = new Set([
  'pack999.html',
  '/contact.html',
  '/services/',
  '/services/crm.html',
  '/services/hrm.html',
  '/services/seo.html',
  '/'
]);

function getInternalLinks(doc) {
  const links = doc.querySelectorAll('a[href]');
  const internalLinks = [];
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href && !href.startsWith('http') && !href.startsWith('//') &&
        !href.startsWith('tel:') && !href.startsWith('mailto:') &&
        !href.startsWith('#') && !href.startsWith('javascript:')) {
      internalLinks.push(href);
    }
  });
  return internalLinks;
}

function getImageSources(doc) {
  const images = doc.querySelectorAll('img[src]');
  const sources = [];
  images.forEach(img => {
    const src = img.getAttribute('src');
    if (src && !src.startsWith('http') && !src.startsWith('//') && !src.startsWith('data:')) {
      sources.push(src);
    }
  });
  return sources;
}

describe('Link Integrity', () => {
  describe.each(htmlFiles)('Internal links in %s', (filename) => {
    let doc;
    let fileDir;

    beforeAll(() => {
      const filePath = path.join(rootDir, filename);
      if (!fs.existsSync(filePath)) return;
      const html = fs.readFileSync(filePath, 'utf-8');
      doc = new DOMParser().parseFromString(html, 'text/html');
      fileDir = path.dirname(filePath);
    });

    it('should have all internal links pointing to existing files', () => {
      if (!doc) return;
      const links = getInternalLinks(doc);
      links.forEach(href => {
        // Remove hash fragments
        const cleanHref = href.split('#')[0];
        if (!cleanHref) return; // skip pure hash links

        // Skip known missing pages
        if (KNOWN_MISSING.has(cleanHref)) return;

        // Resolve relative to file or root
        let resolvedPath;
        if (cleanHref.startsWith('/')) {
          resolvedPath = path.join(rootDir, cleanHref);
        } else {
          resolvedPath = path.join(fileDir, cleanHref);
        }

        // Check if it's a directory (would serve index.html)
        if (fs.existsSync(resolvedPath) && fs.statSync(resolvedPath).isDirectory()) {
          resolvedPath = path.join(resolvedPath, 'index.html');
        }

        expect(fs.existsSync(resolvedPath)).toBe(true);
      });
    });
  });

  describe.each(htmlFiles)('Image sources in %s', (filename) => {
    let doc;
    let fileDir;

    beforeAll(() => {
      const filePath = path.join(rootDir, filename);
      if (!fs.existsSync(filePath)) return;
      const html = fs.readFileSync(filePath, 'utf-8');
      doc = new DOMParser().parseFromString(html, 'text/html');
      fileDir = path.dirname(filePath);
    });

    it('should have all local images pointing to existing files', () => {
      if (!doc) return;
      const sources = getImageSources(doc);
      sources.forEach(src => {
        let resolvedPath;
        if (src.startsWith('/')) {
          resolvedPath = path.join(rootDir, src);
        } else {
          resolvedPath = path.join(fileDir, src);
        }

        expect(fs.existsSync(resolvedPath)).toBe(true);
      });
    });
  });

  describe('Cross-page navigation consistency', () => {
    const mainPages = ['index.html', 'promotion.html', 'service.html', 'domain.html', 'category.html', 'cms.html', 'about.html'];

    it('should have consistent navigation links across main pages', () => {
      const navLinks = {};

      mainPages.forEach(filename => {
        const filePath = path.join(rootDir, filename);
        if (!fs.existsSync(filePath)) return;
        const html = fs.readFileSync(filePath, 'utf-8');
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const nav = doc.querySelector('nav');
        if (nav) {
          const links = nav.querySelectorAll('a[href]');
          navLinks[filename] = Array.from(links).map(l => l.getAttribute('href')).filter(h => !h.startsWith('#') && !h.startsWith('http'));
        }
      });

      // All pages with nav should have at least some common links
      const pages = Object.keys(navLinks);
      if (pages.length > 1) {
        const firstPageLinks = navLinks[pages[0]];
        pages.slice(1).forEach(page => {
          const commonLinks = navLinks[page].filter(l => firstPageLinks.includes(l));
          expect(commonLinks.length).toBeGreaterThan(2);
        });
      }
    });

    it('should have index.html link in all navigation bars', () => {
      mainPages.forEach(filename => {
        const filePath = path.join(rootDir, filename);
        if (!fs.existsSync(filePath)) return;
        const html = fs.readFileSync(filePath, 'utf-8');
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const nav = doc.querySelector('nav');
        if (nav) {
          const links = Array.from(nav.querySelectorAll('a')).map(a => a.getAttribute('href'));
          expect(links.some(l => l === 'index.html' || l === '/' || l === './')).toBe(true);
        }
      });
    });
  });
});
