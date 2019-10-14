import {
  SET_SCREEN_WIDTH,
  SetScreenWidthAction,
  SET_TAG_PAGE,
  SetTagsNavOptions,
  SetTagsNavAction
} from './actionTypes'

/**
 * 设置屏幕宽
 * @param data
 */
export const setScreenWidth = (data: number): SetScreenWidthAction => ({
  type: SET_SCREEN_WIDTH,
  data
})

/**
 * 设置设置 tags 导航数据
 * @param [SetTagsNavOptions] data
 */
export const setTagsNavData = (data: SetTagsNavOptions): SetTagsNavAction => ({
  type: SET_TAG_PAGE,
  data
})
