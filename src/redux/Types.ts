import { HomeAction, HomeState } from './modules/home/actionTypes'

// export interface IAction<T extends {}, U> {
//   readonly type: U
//   readonly data: T
// }

// // ActionCreator 方法 接口
// export interface ActionCreator<T extends {}, U> {
//   (payload: T): IAction<T, U>
// }

export type RootAction = HomeAction

export interface RootState {
  readonly home: HomeState
}

export type RootReducer = (state: RootState | undefined, action: RootAction) => RootState
