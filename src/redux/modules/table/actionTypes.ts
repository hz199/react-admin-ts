// import { ThunkAction } from 'redux-thunk'
// import { Action } from 'redux';

export const GET_TABLE_DATA = 'table/GET_TABLE_DATA'

export interface ITableData {
  nameEN: string
  nameCN: string
  county: string
  timer: string
  key: string
}

export interface ITableState {
  tableData: ITableData[]
}

export interface SetTableDataAction {
  readonly type: typeof GET_TABLE_DATA
  readonly data: ITableData[]
}

// 所有 table action 类型
export type TableActions = SetTableDataAction

