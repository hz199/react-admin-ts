import { Action } from 'redux'

export const SET_USER_INFO = 'home/SET_USER_INFO'

export interface UserInfo {
  userName: string
  avatar: string
}

export interface AuthState {
  userInfo: UserInfo
}

export interface SetUserInfoAction extends Action {
  readonly type: typeof SET_USER_INFO
  readonly data: UserInfo
}

export type AuthActions = SetUserInfoAction
