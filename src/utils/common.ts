/**
 * 金钱格式化
 * @param currentNumber 格式化的金钱数
 * @param symbol 后缀 默认 ￥
 */
export const formatMoney = function formatNumber(currentNumber: number, symbol = '￥') {
  return currentNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + symbol
}

/**
 * 深拷贝
 */
export function deepCopy<T> (target: T): T {
  const type = typeof target

  if (target === null || type === 'boolean' || type === 'number' || type === 'string') {
    return target
  }

  if (target instanceof Date) {
    return new Date(target.getTime()) as any
  }

  if (Array.isArray(target)) {
    return target.map((o) => deepCopy(o)) as any
  }

  if (typeof target === 'object') {
    const obj: any = {}

    for (let key in target) {
      obj[key] = deepCopy(target[key])
    }

    return obj
  }

  return undefined as any
}
