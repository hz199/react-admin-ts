export interface IAction<T extends {}, U> {
  readonly type: U
  readonly data: T
}

// ActionCreator 方法 接口
export interface ActionCreator<T extends {}, U> {
  (payload: T): IAction<T, U>
}
