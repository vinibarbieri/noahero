/**
 * Formata um valor numérico como moeda
 * @param value Valor a ser formatado
 * @param currency Símbolo da moeda (padrão: R$)
 * @returns String formatada como moeda
 */
export function formatCurrency(value: number, currency: string = 'R$'): string {
  return `${currency}${value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
}

/**
 * Formata um número grande para uma representação mais legível
 * @param num Número a ser formatado
 * @returns String formatada (ex: 1.5k, 1.2M)
 */
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace('.0', '') + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1).replace('.0', '') + 'k';
  } else {
    return num.toString();
  }
}
