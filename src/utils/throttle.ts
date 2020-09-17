import { useCallback, useEffect, useRef } from 'react'

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

/**
 * 防抖函数
 * @param fn
 * @param delay
 */
export function debounce(fn: Function, delay = 500) {
  let timer: NodeJS.Timeout | null
  return function(...args: any) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn(...args)
      timer = null
    }, delay)
  }
}

/**
 * 防抖
 */
export function useDebounce(fn: Function, delay = 500, dep = []) {
  const { current } = useRef<{
    fn: Function
    timer: NodeJS.Timeout | null
  }>({ fn, timer: null })
  useEffect(
    function() {
      current.fn = fn
    },
    [fn]
  )

  return useCallback(function f(...args) {
    if (current.timer) {
      clearTimeout(current.timer!)
    }
    current.timer = setTimeout(() => {
      current.fn.call(this, ...args)
    }, delay)
  }, dep)
}
