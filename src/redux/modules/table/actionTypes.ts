import { Action } from 'redux'

export const GET_TABLE_DATA = 'table/GET_TABLE_DATA'

export interface ITableData {
  nameEN: string
  nameCN: string
  county: string
  timer: string
  key: string
}

export interface IBaseTableData {
  list: ITableData[]
  totalPage: number
}

export interface ITableState {
  baseTableData: IBaseTableData
}

export interface SetTableDataAction extends Action {
  readonly type: typeof GET_TABLE_DATA
  readonly data: IBaseTableData
}

// 所有 table action 类型
export type TableActions = SetTableDataAction
