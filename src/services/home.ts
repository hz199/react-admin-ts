import axios, { ResponseResult } from './axios'
import { HomeData } from '../redux/modules/home/actionTypes'
import { AxiosResponse } from 'axios'

/* 首页 */
export const getHomeData = function(
  payload?: any
): Promise<AxiosResponse<ResponseResult<HomeData>>> {
  return axios.get('/api/home', {
    params: payload
  })
}
