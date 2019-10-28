import * as actionTypes from './actionTypes'
import * as tableServices from '@/services/table'
import { Dispatch } from 'redux'

export const setTableData = (data: actionTypes.ITableData[]): actionTypes.SetTableDataAction => {
  return {
    type: actionTypes.GET_TABLE_DATA,
    data
  }
}

export const tableDataAxios = (params: object) => {
  return (dispatch: Dispatch<actionTypes.TableActions>) => {
    tableServices.getBaseTable(params).then((res) => {
      dispatch(setTableData(res.data.list))
    })
  }
}
