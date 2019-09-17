import axios from './axios'
import { HomeData } from '../redux/modules/home/actionTypes'
import { AxiosResponse } from 'axios'

/* 首页 */
export const getHomeData = function(payload?: any): Promise<AxiosResponse<HomeData>> {
  return axios.get('/api/home', {
    params: payload
  })
}
