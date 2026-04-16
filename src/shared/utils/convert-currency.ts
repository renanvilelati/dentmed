/**
 * Converte um valor monetário em reais (BRL) para centavos.
 * @param amount Valor monetário em reais a ser convertivo
 * @returns {number} Valor convertivo em centavos
 *
 * @example convertRealToCents(1.300,50) // Retorna 1300050
 */
export const convertRealToCents = (amount: string) => {
  const normalized = amount.replace(/\./g, '').replace(',', '.');

  const numericPrice = Number(normalized);

  if (Number.isNaN(numericPrice) || !normalized.trim()) {
    throw new Error('Valor monetário inválido');
  }

  if (numericPrice < 0) {
    throw new Error('Valores negativos não são permitidos');
  }

  return Math.round(numericPrice * 100);
};
