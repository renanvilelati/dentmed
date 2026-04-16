import { formatCurrency } from './format-currency';

describe('formatCurrency (unit)', () => {
  it('should format zero correctly', () => {
    expect(formatCurrency(0)).toBe('R$\u00a00');
  });

  it('should format integer values correctly', () => {
    expect(formatCurrency(500)).toBe('R$\u00a0500');
  });

  it('should format large integer values with thousand separator', () => {
    expect(formatCurrency(1500)).toBe('R$\u00a01.500');
  });

  it('should format millions correctly', () => {
    expect(formatCurrency(1250999)).toBe('R$\u00a01.250.999');
  });

  it('should round decimal values when minimumFractionDigits is 0', () => {
    expect(formatCurrency(10.5)).toBe('R$\u00a010,5');
  });

  it('should format negative values correctly', () => {
    expect(formatCurrency(-500)).toBe('-R$\u00a0500');
  });
});
