import * as actionTypes from './actionTypes'
import * as actionCreators from './actionCreators'

const defaultStore: actionTypes.ITableState = {
  baseTableData: []
}

const tableReducer = (state = defaultStore, action: actionTypes.TableActions) => {
  switch (action.type) {
    case actionTypes.GET_TABLE_DATA:
      return Object.assign({}, state, { baseTableData: action.data })
    default:
      return state
  }
}

export { tableReducer, actionTypes, actionCreators }
