import { HomeData, SET_HOME_DATA } from './actionTypes'
import { IAction } from '../../Types'

export const setHomeData = (data: HomeData): IAction<HomeData, typeof SET_HOME_DATA> => ({
  type: SET_HOME_DATA,
  data
})
