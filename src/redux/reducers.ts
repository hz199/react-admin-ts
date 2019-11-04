import { combineReducers } from 'redux'
import { RootReducer } from './Types.d'

import { homeReducer } from './modules/home'
import { settingReducer } from './modules/settings'
import { tableReducer } from './modules/table'
import { authReducer } from './modules/auth'

const rootReducer: RootReducer = combineReducers({
  home: homeReducer,
  settings: settingReducer,
  table: tableReducer,
  auth: authReducer
})

export default rootReducer
