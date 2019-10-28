import axios, { ResponseResult } from './axios'
import { AxiosResponse } from 'axios'
import { actionTypes } from '@/redux/modules/table'

/* baseTable */
export const getBaseTable = function(
  payload: object
): Promise<AxiosResponse<ResponseResult<actionTypes.IBaseTableData>>> {
  return axios.get('/api/table1', {
    params: payload
  })
}
