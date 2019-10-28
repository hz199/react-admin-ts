import { combineReducers } from 'redux'
import { RootReducer } from './Types.d'

import { homeReducer } from './modules/home'
import { settingReducer } from './modules/settings'
import { tableReducer } from './modules/table'

const rootReducer: RootReducer = combineReducers({
  home: homeReducer,
  settings: settingReducer,
  table: tableReducer
})

export default rootReducer
