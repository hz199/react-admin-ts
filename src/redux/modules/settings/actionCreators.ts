import { SET_SCREEN_WIDTH, SetScreenWidthAction } from './actionTypes'

export const setScreenWidth = (data: number): SetScreenWidthAction => ({
  type: SET_SCREEN_WIDTH,
  data
})
