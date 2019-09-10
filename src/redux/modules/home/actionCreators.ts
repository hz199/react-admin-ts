import { HomeData, HomeDataAction, SET_HOME_DATA } from './actionTypes'

export const setHomeData = (data: HomeData): HomeDataAction => ({
  type: SET_HOME_DATA,
  data
})
