import { HomeData, SET_HOME_DATA } from './actionTypes'
import { ActionCreator } from '../../Types'

export const setHomeData: ActionCreator<HomeData, typeof SET_HOME_DATA> = (data: HomeData) => ({
  type: SET_HOME_DATA,
  data
})
