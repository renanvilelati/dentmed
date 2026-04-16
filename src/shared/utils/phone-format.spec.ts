import { formatPhone } from './phoneFormat';

describe('formatPhone (unit)', () => {
  it('should format 10-digit phone number correctly', () => {
    expect(formatPhone('1198765432')).toBe('(11) 9876-5432');
  });

  it('should format 11-digit phone number correctly', () => {
    expect(formatPhone('11987654321')).toBe('(11) 98765-4321');
  });

  it('should remove non-numeric characters before formatting', () => {
    expect(formatPhone('(11) 98765-4321')).toBe('(11) 98765-4321');
  });

  it('should format partial phone with area code', () => {
    expect(formatPhone('11987')).toBe('(11) 987');
  });

  it('should format only area code and first digit', () => {
    expect(formatPhone('113')).toBe('(11) 3');
  });

  it('should return empty string when value is empty', () => {
    expect(formatPhone('')).toBe('');
  });

  it('should truncate original value when cleaned number has more than 11 digits', () => {
    expect(formatPhone('1198765432100')).toBe('1198765432100');
  });
});
