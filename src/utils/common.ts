/**
 * 金钱格式化
 * @param currentNumber 格式化的金钱数
 * @param symbol 后缀 默认 ￥
 */
export const formatMoney = function formatNumber(currentNumber: number, symbol = '￥') {
  return currentNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + symbol
}
