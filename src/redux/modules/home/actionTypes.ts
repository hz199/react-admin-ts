import { Action } from 'redux'

export const SET_HOME_DATA = 'home/SET_HOME_DATA'

export interface NumberCards {
  color: string
  icon: string
  number: number
  title: string
}

export interface LineBarChart {
  title: string
  series: any[]
  xAxisData: string[]
}

export interface PieOptions {
  name: string
  datas: any[]
}

export interface OrderTable {
  key: string
  name: string
  prize: number
  status: number
  timer: string
}

// 首页数据
export interface HomeData {
  numberCards: NumberCards[]
  LineBarChartOption: LineBarChart
  pieOptions: PieOptions
  orderTable: OrderTable[]
  CommentList: any[]
}

export interface AddHomeDataAction extends Action {
  readonly type: typeof SET_HOME_DATA
  readonly data: HomeData
}

export interface HomeState {
  homeData: HomeData
  test: string
}

// 所有 action 类型
export type HomeAction = AddHomeDataAction
