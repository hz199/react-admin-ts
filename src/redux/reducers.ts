import { combineReducers } from 'redux'
import { RootReducer } from './Types.d'

import { homeReducer } from './modules/home'
import { settingReducer } from './modules/settings'

const rootReducer: RootReducer = combineReducers({
  home: homeReducer,
  settings: settingReducer
})

export default rootReducer
