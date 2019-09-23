export const SET_SCREEN_WIDTH = 'settings/SET_SCREEN_WIDTH'

export interface SettingState {
  /**
   * 屏幕的宽
   */
  ScreenWidth: number
}

export interface SetScreenWidthAction {
  readonly type: typeof SET_SCREEN_WIDTH
  readonly data: number
}

// 所有 action 类型
export type SettingsAction = SetScreenWidthAction
