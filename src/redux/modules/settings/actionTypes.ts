import * as H from 'history'
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

// tags 导航数据
export interface DeleteOneTagData {
  path: string
  history: H.History
}

/**
 * 设置 tags 导航数据 action
 */
export interface SetTagsNavAction {
  readonly type: typeof SET_TAG_PAGE
  readonly data: SetTagsNavOptions
}

/**
 * 删除一个 tag
 */
export interface DeleteOneTagAction {
  readonly type: typeof DELETE_ONE_TAG
  readonly data: DeleteOneTagData
}

/**
 * 删除全部 除了首页的 tag
 */
export interface DeleteAllTagAction {
  readonly type: typeof DELETE_ALL_TAG
  readonly data: H.History
}

/**
 * 删除其他 除了首页和当前选中的 tag
 */
export interface DeleteOtherTagAction {
  readonly type: typeof DELETE_OTHER_TAG
  readonly data: H.History
}

// 所有 action 类型
export type SettingsAction =
  | SetScreenWidthAction
  | SetTagsNavAction
  | DeleteOneTagAction
  | DeleteAllTagAction
  | DeleteOtherTagAction
