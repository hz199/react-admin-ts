import { HomeAction, HomeState } from './modules/home/actionTypes'
import { SettingsAction, SettingState } from './modules/settings/actionTypes'
import { TableActions, ITableState } from './modules/table/actionTypes'

// export interface IAction<T extends {}, U> {
//   readonly type: U
//   readonly data: T
// }

// // ActionCreator 方法 接口
// export interface ActionCreator<T extends {}, U> {
//   (payload: T): IAction<T, U>
// }

// 根 Action
export type RootAction = HomeAction | SettingsAction | TableActions

// 根 State
export interface RootState {
  readonly home: HomeState
  readonly settings: SettingState
  readonly table: ITableState
}

export type RootReducer = (state: RootState | undefined, action: RootAction) => RootState
