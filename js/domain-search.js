/**
 * Domain search module.
 * Handles domain name lookup validation and search trigger.
 */

function validateDomainInput(input) {
  if (!input || input.trim() === '') {
    return { valid: false, error: 'empty', message: 'กรุณากรอกชื่อโดเมนที่ต้องการค้นหาครับ' };
  }

  const trimmed = input.trim().toLowerCase();

  // Basic domain format validation
  const domainRegex = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z]{2,})?$/;
  if (!domainRegex.test(trimmed)) {
    return { valid: false, error: 'invalid_format', message: 'รูปแบบชื่อโดเมนไม่ถูกต้อง' };
  }

  return { valid: true, domain: trimmed };
}

function handleSearch(inputElement, alertFn) {
  const value = inputElement ? inputElement.value : '';
  const result = validateDomainInput(value);

  if (!result.valid) {
    if (alertFn) alertFn(result.message);
    return result;
  }

  if (alertFn) {
    alertFn('ระบบกำลังตรวจสอบชื่อโดเมน: ' + result.domain + ' ...');
  }
  return result;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { validateDomainInput, handleSearch };
}
