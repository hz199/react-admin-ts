import axios from './axios'
import { AxiosResponse } from 'axios'
import { actionTypes } from '@/redux/modules/table'

export interface IGetBaseTableResponse {
  list: Array<actionTypes.ITableData>
  code: number
  message: string
}

/* table1 */
export const getBaseTable = function(
  payload: object
): Promise<AxiosResponse<IGetBaseTableResponse>> {
  return axios.get('/api/table1', {
    params: payload
  })
}
