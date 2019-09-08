import * as actionTypes from './actionTypes'

export const setHomeData = (data: actionTypes.HomeData): actionTypes.HomeDataAction => ({
  type: actionTypes.SET_HOME_DATA,
  data
})
