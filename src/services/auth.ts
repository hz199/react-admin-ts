import axios, { ResponseResult } from './axios'
import { UserInfo } from '../redux/modules/auth/actionTypes'
import { AxiosResponse } from 'axios'

export interface LoginParams {
  userName: string
  password: string
}

/* 登录 */
export const loginAjax = function(
  payload: LoginParams
): Promise<AxiosResponse<ResponseResult<UserInfo>>> {
  return axios.post('/api/login', payload)
}
