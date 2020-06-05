import { useEffect, useCallback, useRef } from 'react'

/**
 *
 * 节流
 * @export
 * @param {Function} fn
 * @param {number} [delay=500]
 * @param {*} [dep=[]]
 * @returns
 */
export function useThrottle(fn: Function, delay = 500, dep = []) {
  const payload: {
    fn: Function
    timer: NodeJS.Timeout | null
  } = {
    fn,
    timer: null
  }

  const { current } = useRef(payload)
  useEffect(() => {
    current.fn = fn
  }, [current.fn, fn])

  const returnFn = (...args: any) => {
    if (!current.timer) {
      current.timer = setTimeout(() => {
        delete current.timer
      }, delay)
      current.fn.call(returnFn, ...args)
    }
  }

  return useCallback(returnFn, dep)
}

/**
 *
 * 防抖
 * @export
 * @param {Function} fn
 * @param {number} [delay=500]
 * @param {*} [dep=[]]
 * @returns
 */
export function useDebounce(fn: Function, delay = 500, dep = []) {
  const payload: {
    fn: Function
    timer: NodeJS.Timeout | null
  } = {
    fn,
    timer: null
  }

  const { current } = useRef(payload)
  useEffect(
    function() {
      current.fn = fn
    },
    [current.fn, fn]
  )

  const returnFn = (...args: any) => {
    if (current.timer) {
      clearTimeout(current.timer)
    }
    current.timer = setTimeout(() => {
      current.fn.call(returnFn, ...args)
    }, delay)
  }

  return useCallback(returnFn, dep)
}
