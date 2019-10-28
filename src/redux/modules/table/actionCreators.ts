import * as actionTypes from './actionTypes'
import * as tableServices from '@/services/table'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'

export const setTableData = (data: actionTypes.IBaseTableData): actionTypes.SetTableDataAction => {
  return {
    type: actionTypes.GET_TABLE_DATA,
    data
  }
}

export const tableDataAxios = (
  params: object
): ThunkAction<Promise<void>, actionTypes.ITableState, void, actionTypes.TableActions> => {
  return (dispatch: ThunkDispatch<actionTypes.ITableState, void, actionTypes.TableActions>) => {
    return tableServices.getBaseTable(params).then((res) => {
      dispatch(setTableData(res.data.data))
    })
  }
}
