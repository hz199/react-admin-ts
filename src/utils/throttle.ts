/**
 * 节流方法
 * @param fn 执行函数
 * @param interval 时间间隔 默认 500
 */
export default function throttle(fn: Function, interval: number) {
  const self = fn // 保存需要被延迟执行的函数的引用
  let timer: any = null
  let firstTime = true // 是否第一次调用

  return function(...args: any) {
    const that = this
    if (firstTime) {
      self.apply(that, args)
      return (firstTime = false)
    }

    if (timer) {
      return false
    }

    timer = setTimeout(function() {
      clearTimeout(timer!)
      timer = null
      self.apply(that, args)
    }, interval || 500)
  }
}
