import * as actionTypes from './actionTypes'

export const setUserInfo = (data: actionTypes.UserInfo): actionTypes.SetUserInfoAction => ({
  type: actionTypes.SET_USER_INFO,
  data
})
