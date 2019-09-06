export const SET_HOME_DATA = 'home/SET_HOME_DATA'

export interface HomeDataAction {
  type: typeof SET_HOME_DATA
  data: any
}

export interface NumberCards {
  color: string,
  icon: string,
  number: number,
  title: string
}

export interface LineBarChart {
  title: string,
  series: any[],
  xAxisData: string[]
}

export interface PieOptions {
  name: string,
  datas: any[]
}

export interface OrderTable {
  key: string,
  name: string,
  prize: number,
  status: number,
  timer: string
}

export interface HomeData {
  numberCards: NumberCards[],
  LineBarChartOption: LineBarChart,
  pieOptions: PieOptions,
  orderTable: OrderTable[],
  CommentList: any[]
}

export interface HomeState {
  homeData: HomeData,
  test: string
}
