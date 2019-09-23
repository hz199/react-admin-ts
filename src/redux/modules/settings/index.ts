import * as actionTypes from './actionTypes'
import * as actionCreators from './actionCreators'

const defaultStore: actionTypes.SettingState = {
  ScreenWidth: 0
}

const settingReducer = (state = defaultStore, action: actionTypes.SettingsAction) => {
  switch (action.type) {
    case actionTypes.SET_SCREEN_WIDTH:
      return Object.assign({}, state, { ScreenWidth: action.data })
    default:
      return state
  }
}

export { settingReducer, actionTypes, actionCreators }
