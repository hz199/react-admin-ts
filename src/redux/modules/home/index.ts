import * as actionTypes from './actionTypes'
import * as actionCreators from './actionCreators'

const defaultStore: actionTypes.HomeState = {
  homeData: {
    numberCards: [],
    LineBarChartOption: {
      series: [],
      title: '',
      xAxisData: []
    },
    pieOptions: {
      datas: [],
      name: ''
    },
    orderTable: [],
    CommentList: []
  },
  test: 'test'
}

/**
 * home store
 * @param [state]
 * @param [action]
 * @return 新的 home store
 */

const homeReducer = (state = defaultStore, action: actionTypes.HomeDataAction) => {
  switch (action.type) {
    case actionTypes.SET_HOME_DATA:
      return Object.assign({}, state, { homeData: action.data })
    default:
      return state
  }
}

export { homeReducer, actionTypes, actionCreators }
