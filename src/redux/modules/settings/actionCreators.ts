import { SET_SCREEN_WIDTH, SetScreenWidthAction } from './actionTypes'

/**
 * 设置屏幕宽
 * @param data
 */
export const setScreenWidth = (data: number): SetScreenWidthAction => ({
  type: SET_SCREEN_WIDTH,
  data
})
