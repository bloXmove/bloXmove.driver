export function currencyFormat(num) {
  return parseInt(num, 10)
    .toFixed(0)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
