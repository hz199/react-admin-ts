export interface IAction<T extends {}, U> {
  readonly type: U
  readonly data: T
}
