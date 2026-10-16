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
  'cms.html'
];

// Pages known to have full SEO meta tags
const pagesWithDescription = [
  'index.html',
  'service.html',
  'promotion.html',
  'domain.html',
  'category.html',
  'cms.html'
];

describe('HTML Structure Validation', () => {
  describe.each(htmlFiles)('%s', (filename) => {
    let doc;

    beforeAll(() => {
      const html = fs.readFileSync(path.join(rootDir, filename), 'utf-8');
      doc = new DOMParser().parseFromString(html, 'text/html');
    });

    it('should have a DOCTYPE declaration', () => {
      const rawHtml = fs.readFileSync(path.join(rootDir, filename), 'utf-8');
      expect(rawHtml.trim().toLowerCase().startsWith('<!doctype html>')).toBe(true);
    });

    it('should have a lang attribute on html element', () => {
      const htmlEl = doc.querySelector('html');
      expect(htmlEl).not.toBeNull();
      expect(htmlEl.getAttribute('lang')).toBeTruthy();
    });

    it('should have a charset meta tag', () => {
      const charset = doc.querySelector('meta[charset]');
      expect(charset).not.toBeNull();
      expect(charset.getAttribute('charset').toLowerCase()).toBe('utf-8');
    });

    it('should have a viewport meta tag', () => {
      const viewport = doc.querySelector('meta[name="viewport"]');
      expect(viewport).not.toBeNull();
      expect(viewport.getAttribute('content')).toContain('width=device-width');
    });

    it('should have a title element', () => {
      const title = doc.querySelector('title');
      expect(title).not.toBeNull();
      expect(title.textContent.trim().length).toBeGreaterThan(0);
    });

    it('should have a meta description (if applicable)', () => {
      if (!pagesWithDescription.includes(filename)) return;
      const description = doc.querySelector('meta[name="description"]');
      expect(description).not.toBeNull();
      expect(description.getAttribute('content').length).toBeGreaterThan(10);
    });

    it('should have a body element', () => {
      const body = doc.querySelector('body');
      expect(body).not.toBeNull();
    });

    it('should have navigation links', () => {
      const nav = doc.querySelector('nav');
      if (nav) {
        const links = nav.querySelectorAll('a');
        expect(links.length).toBeGreaterThan(0);
      }
    });

    it('should have all images with alt attributes', () => {
      const images = doc.querySelectorAll('img');
      images.forEach((img) => {
        const alt = img.getAttribute('alt');
        expect(alt).not.toBeNull();
      });
    });

    it('should have all links with href attributes', () => {
      const links = doc.querySelectorAll('a');
      links.forEach((link) => {
        const href = link.getAttribute('href');
        expect(href).not.toBeNull();
        expect(href.length).toBeGreaterThan(0);
      });
    });
  });

  describe('index.html SEO meta tags', () => {
    let doc;
    beforeAll(() => {
      const html = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf-8');
      doc = new DOMParser().parseFromString(html, 'text/html');
    });

    it('should have Open Graph title', () => {
      const ogTitle = doc.querySelector('meta[property="og:title"]');
      expect(ogTitle).not.toBeNull();
      expect(ogTitle.getAttribute('content').length).toBeGreaterThan(0);
    });

    it('should have Open Graph description', () => {
      const ogDesc = doc.querySelector('meta[property="og:description"]');
      expect(ogDesc).not.toBeNull();
      expect(ogDesc.getAttribute('content').length).toBeGreaterThan(0);
    });

    it('should have Open Graph image', () => {
      const ogImage = doc.querySelector('meta[property="og:image"]');
      expect(ogImage).not.toBeNull();
      expect(ogImage.getAttribute('content')).toContain('http');
    });

    it('should have Open Graph URL', () => {
      const ogUrl = doc.querySelector('meta[property="og:url"]');
      expect(ogUrl).not.toBeNull();
      expect(ogUrl.getAttribute('content')).toContain('http');
    });

    it('should have Twitter card meta tag', () => {
      const twitterCard = doc.querySelector('meta[property="twitter:card"]');
      expect(twitterCard).not.toBeNull();
    });

    it('should have canonical link', () => {
      const canonical = doc.querySelector('link[rel="canonical"]');
      expect(canonical).not.toBeNull();
      expect(canonical.getAttribute('href')).toContain('http');
    });

    it('should have JSON-LD structured data', () => {
      const jsonLd = doc.querySelector('script[type="application/ld+json"]');
      expect(jsonLd).not.toBeNull();
      const data = JSON.parse(jsonLd.textContent);
      expect(data['@context']).toBe('https://schema.org');
      expect(data['@type']).toBeDefined();
      expect(data.name).toBeDefined();
    });

    it('should have robots meta tag', () => {
      const robots = doc.querySelector('meta[name="robots"]');
      expect(robots).not.toBeNull();
      expect(robots.getAttribute('content')).toContain('index');
    });

    it('should have keywords meta tag', () => {
      const keywords = doc.querySelector('meta[name="keywords"]');
      expect(keywords).not.toBeNull();
      expect(keywords.getAttribute('content').length).toBeGreaterThan(0);
    });
  });
});
