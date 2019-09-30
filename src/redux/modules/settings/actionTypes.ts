/**
 * 设置屏幕的宽
 */
export const SET_SCREEN_WIDTH = 'settings/SET_SCREEN_WIDTH'

export interface TagNavConfig {
  path: string
  title: string
  flag: boolean
  color: 'default' | 'primary'
}

export interface SettingState {
  /**
   * 屏幕的宽
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

// 所有 action 类型
export type SettingsAction = SetScreenWidthAction
