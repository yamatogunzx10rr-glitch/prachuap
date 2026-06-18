/**
 * @jest-environment jsdom
 */

const { createCardHtml, renderCards, escapeHtml } = require('../js/card-renderer');

describe('Card Renderer Module', () => {
  describe('escapeHtml', () => {
    it('should escape ampersands', () => {
      expect(escapeHtml('a&b')).toBe('a&amp;b');
    });

    it('should escape less-than signs', () => {
      expect(escapeHtml('a<b')).toBe('a&lt;b');
    });

    it('should escape greater-than signs', () => {
      expect(escapeHtml('a>b')).toBe('a&gt;b');
    });

    it('should escape double quotes', () => {
      expect(escapeHtml('a"b')).toBe('a&quot;b');
    });

    it('should escape single quotes', () => {
      expect(escapeHtml("a'b")).toBe('a&#039;b');
    });

    it('should handle strings with no special characters', () => {
      expect(escapeHtml('hello world')).toBe('hello world');
    });

    it('should handle empty string', () => {
      expect(escapeHtml('')).toBe('');
    });

    it('should handle multiple special characters', () => {
      const result = escapeHtml('<script>"alert"</script>');
      expect(result).not.toContain('<script>');
      expect(result).toContain('&lt;script&gt;');
    });
  });

  describe('createCardHtml', () => {
    it('should return empty string for null input', () => {
      expect(createCardHtml(null)).toBe('');
    });

    it('should return empty string for undefined input', () => {
      expect(createCardHtml(undefined)).toBe('');
    });

    it('should return empty string when src is missing', () => {
      expect(createCardHtml({ title: 'Test' })).toBe('');
    });

    it('should return empty string when title is missing', () => {
      expect(createCardHtml({ src: 'img.jpg' })).toBe('');
    });

    it('should generate valid HTML with src and title', () => {
      const html = createCardHtml({
        src: 'images/test.jpg',
        alt: 'Test image',
        title: 'Test Card'
      });
      expect(html).toContain('images/test.jpg');
      expect(html).toContain('Test Card');
      expect(html).toContain('<article');
      expect(html).toContain('</article>');
    });

    it('should use title as alt when alt is not provided', () => {
      const html = createCardHtml({
        src: 'images/test.jpg',
        title: 'My Title'
      });
      expect(html).toContain('alt="My Title"');
    });

    it('should use provided alt text', () => {
      const html = createCardHtml({
        src: 'images/test.jpg',
        alt: 'Custom alt text',
        title: 'My Title'
      });
      expect(html).toContain('alt="Custom alt text"');
    });

    it('should include lazy loading attribute', () => {
      const html = createCardHtml({
        src: 'images/test.jpg',
        alt: 'Test',
        title: 'Test'
      });
      expect(html).toContain('loading="lazy"');
    });

    it('should include img tag with src', () => {
      const html = createCardHtml({
        src: 'images/food.jpg',
        alt: 'Food',
        title: 'Restaurant'
      });
      expect(html).toContain('<img');
      expect(html).toContain('src="images/food.jpg"');
    });

    it('should escape special characters in title', () => {
      const html = createCardHtml({
        src: 'test.jpg',
        title: '<script>alert("xss")</script>'
      });
      expect(html).not.toContain('<script>alert');
    });

    it('should escape special characters in src', () => {
      const html = createCardHtml({
        src: 'test" onload="alert(1)',
        title: 'Test'
      });
      // Quotes should be escaped so the attribute can't break out
      expect(html).toContain('&quot;');
      expect(html).not.toContain('src="test" onload="alert(1)"');
    });
  });

  describe('renderCards', () => {
    let container;

    beforeEach(() => {
      container = document.createElement('div');
    });

    it('should return false for null container', () => {
      expect(renderCards(null, [])).toBe(false);
    });

    it('should return false for non-array images', () => {
      expect(renderCards(container, 'not an array')).toBe(false);
    });

    it('should return false for null images', () => {
      expect(renderCards(container, null)).toBe(false);
    });

    it('should render empty content for empty array', () => {
      renderCards(container, []);
      expect(container.innerHTML).toBe('');
    });

    it('should render cards for valid image data', () => {
      const images = [
        { src: 'img1.jpg', alt: 'Image 1', title: 'Card 1' },
        { src: 'img2.jpg', alt: 'Image 2', title: 'Card 2' }
      ];
      const result = renderCards(container, images);
      expect(result).toBe(true);
      expect(container.querySelectorAll('article').length).toBe(2);
    });

    it('should skip invalid image entries', () => {
      const images = [
        { src: 'img1.jpg', alt: 'Image 1', title: 'Card 1' },
        null,
        { src: 'img2.jpg', alt: 'Image 2', title: 'Card 2' }
      ];
      renderCards(container, images);
      expect(container.querySelectorAll('article').length).toBe(2);
    });

    it('should render h3 elements with titles', () => {
      const images = [
        { src: 'img.jpg', alt: 'Alt', title: 'My Title' }
      ];
      renderCards(container, images);
      const h3 = container.querySelector('h3');
      expect(h3).not.toBeNull();
      expect(h3.textContent).toBe('My Title');
    });

    it('should render img elements with correct src', () => {
      const images = [
        { src: 'images/photo.jpg', alt: 'Photo', title: 'Photo Card' }
      ];
      renderCards(container, images);
      const img = container.querySelector('img');
      expect(img).not.toBeNull();
      expect(img.getAttribute('src')).toBe('images/photo.jpg');
    });

    it('should return true on successful render', () => {
      const images = [{ src: 'a.jpg', alt: 'A', title: 'A' }];
      expect(renderCards(container, images)).toBe(true);
    });
  });
});
