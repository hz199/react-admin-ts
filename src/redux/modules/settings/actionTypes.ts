/**
 * 设置屏幕的宽 type
 */
export const SET_SCREEN_WIDTH = 'settings/SET_SCREEN_WIDTH'
/**
 * 设置tag nav page
 */
export const SET_TAG_PAGE = 'settings/SET_TAG_PAGE'
/**
 * 删除全部tags
 */
export const DELETE_ALL_TAG = 'settings/DELETE_ALL_TAG'

/**
 * 删除其他
 */
export const DELETE_OTHER_TAG = 'settings/DELETE_OTHER_TAG'

/**
 * 删除一个
 */
export const DELETE_ONE_TAG = 'settings/DELETE_ONE_TAG'

export interface TagNavConfig {
  path: string
  title: string
  flag?: boolean
  color?: 'default' | 'primary'
}

export interface SettingState {
  /**
   * 整个浏览器可视区域屏幕的宽
   */
  ScreenWidth: number
  /**
   * tagNav 所有数据组合
   */
  tagNav: Array<TagNavConfig>
  /**
   *  tagNav 路由path组合
   */
  tagNavRouter: Array<string>
}

/**
 * 设置屏幕宽 action
 */
export interface SetScreenWidthAction {
  readonly type: typeof SET_SCREEN_WIDTH
  readonly data: number
}

// tags 导航数据
export interface SetTagsNavOptions {
  path: string
  title: string
}

/**
 * 设置 tags 导航数据 action
 */
export interface SetTagsNavAction {
  readonly type: typeof SET_TAG_PAGE
  readonly data: SetTagsNavOptions
}

// 所有 action 类型
export type SettingsAction = SetScreenWidthAction | SetTagsNavAction
