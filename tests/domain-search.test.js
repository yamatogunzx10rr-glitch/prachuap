/**
 * @jest-environment jsdom
 */

const { validateDomainInput, handleSearch } = require('../js/domain-search');

describe('Domain Search Module', () => {
  describe('validateDomainInput', () => {
    it('should return invalid for empty string', () => {
      const result = validateDomainInput('');
      expect(result.valid).toBe(false);
      expect(result.error).toBe('empty');
    });

    it('should return invalid for null input', () => {
      const result = validateDomainInput(null);
      expect(result.valid).toBe(false);
      expect(result.error).toBe('empty');
    });

    it('should return invalid for undefined input', () => {
      const result = validateDomainInput(undefined);
      expect(result.valid).toBe(false);
      expect(result.error).toBe('empty');
    });

    it('should return invalid for whitespace-only input', () => {
      const result = validateDomainInput('   ');
      expect(result.valid).toBe(false);
      expect(result.error).toBe('empty');
    });

    it('should return valid for a simple domain name', () => {
      const result = validateDomainInput('example');
      expect(result.valid).toBe(true);
      expect(result.domain).toBe('example');
    });

    it('should return valid for domain with extension', () => {
      const result = validateDomainInput('example.com');
      expect(result.valid).toBe(true);
      expect(result.domain).toBe('example.com');
    });

    it('should return valid for domain with hyphens', () => {
      const result = validateDomainInput('my-domain.co');
      expect(result.valid).toBe(true);
      expect(result.domain).toBe('my-domain.co');
    });

    it('should trim and lowercase the input', () => {
      const result = validateDomainInput('  MyDomain.COM  ');
      expect(result.valid).toBe(true);
      expect(result.domain).toBe('mydomain.com');
    });

    it('should return invalid for domain starting with hyphen', () => {
      const result = validateDomainInput('-invalid');
      expect(result.valid).toBe(false);
      expect(result.error).toBe('invalid_format');
    });

    it('should return invalid for domain ending with hyphen', () => {
      const result = validateDomainInput('invalid-');
      expect(result.valid).toBe(false);
      expect(result.error).toBe('invalid_format');
    });

    it('should return invalid for domain with special characters', () => {
      const result = validateDomainInput('inv@lid');
      expect(result.valid).toBe(false);
      expect(result.error).toBe('invalid_format');
    });

    it('should return invalid for domain with spaces', () => {
      const result = validateDomainInput('my domain');
      expect(result.valid).toBe(false);
      expect(result.error).toBe('invalid_format');
    });

    it('should return valid for numeric domain', () => {
      const result = validateDomainInput('123.com');
      expect(result.valid).toBe(true);
      expect(result.domain).toBe('123.com');
    });

    it('should return valid for single character domain', () => {
      const result = validateDomainInput('x');
      expect(result.valid).toBe(true);
      expect(result.domain).toBe('x');
    });

    it('should return invalid for extension with single char', () => {
      const result = validateDomainInput('test.a');
      expect(result.valid).toBe(false);
      expect(result.error).toBe('invalid_format');
    });

    it('should include error message in Thai for empty input', () => {
      const result = validateDomainInput('');
      expect(result.message).toBeDefined();
      expect(result.message.length).toBeGreaterThan(0);
    });
  });

  describe('handleSearch', () => {
    it('should call alertFn with error message for empty input', () => {
      const alertFn = jest.fn();
      const input = { value: '' };
      handleSearch(input, alertFn);
      expect(alertFn).toHaveBeenCalledWith(expect.any(String));
    });

    it('should call alertFn with search message for valid input', () => {
      const alertFn = jest.fn();
      const input = { value: 'example.com' };
      handleSearch(input, alertFn);
      expect(alertFn).toHaveBeenCalledWith(expect.stringContaining('example.com'));
    });

    it('should return valid result for valid domain', () => {
      const alertFn = jest.fn();
      const input = { value: 'prachuap.online' };
      const result = handleSearch(input, alertFn);
      expect(result.valid).toBe(true);
      expect(result.domain).toBe('prachuap.online');
    });

    it('should return invalid result for empty value', () => {
      const alertFn = jest.fn();
      const input = { value: '' };
      const result = handleSearch(input, alertFn);
      expect(result.valid).toBe(false);
    });

    it('should handle null inputElement gracefully', () => {
      const alertFn = jest.fn();
      const result = handleSearch(null, alertFn);
      expect(result.valid).toBe(false);
      expect(alertFn).toHaveBeenCalled();
    });

    it('should work without alertFn', () => {
      const input = { value: 'test.com' };
      const result = handleSearch(input, null);
      expect(result.valid).toBe(true);
    });

    it('should not call alertFn if alertFn is null', () => {
      const input = { value: '' };
      expect(() => handleSearch(input, null)).not.toThrow();
    });
  });
});
