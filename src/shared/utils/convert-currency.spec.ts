import { convertRealToCents } from './convertCurrency';

describe('Convert currency to cents (unit)', () => {
  it('should throw error for empty string', () => {
    expect(() => convertRealToCents('')).toThrow();
  });

  it('should throw error for blank spaces', () => {
    expect(() => convertRealToCents('   ')).toThrow();
  });

  it('should convert integer values', () => {
    expect(convertRealToCents('500')).toBe(50000);
  });

  it('should throw error for invalid values', () => {
    expect(() => convertRealToCents('R$ 550,50')).toThrow(
      'Valor monetário inválido',
    );
  });

  it('should return only numbers', () => {
    expect(convertRealToCents('550,50')).toBe(55050);
  });

  it('should round correctly fractional values', () => {
    expect(convertRealToCents('10,999')).toBe(1100);
  });

  it('should throw error for negative values', () => {
    expect(() => convertRealToCents('-10,50')).toThrow(
      'Valores negativos não são permitidos',
    );
  });
});
