import { HomeData, SET_HOME_DATA, AddHomeDataAction } from './actionTypes'

export const setHomeData = (data: HomeData): AddHomeDataAction => ({
  type: SET_HOME_DATA,
  data
})
