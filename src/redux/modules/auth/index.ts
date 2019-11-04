import * as actionTypes from './actionTypes'
import * as actionCreators from './actionCreators'

const defaultStore: actionTypes.AuthState = {
  userInfo: {
    userName: '',
    avatar: ''
  }
}

const authReducer = (state = defaultStore, action: actionTypes.AuthActions) => {
  switch (action.type) {
    case actionTypes.SET_USER_INFO:
      return Object.assign({}, state, { userInfo: action.data })
    default:
      return state
  }
}

export { authReducer, actionTypes, actionCreators }
