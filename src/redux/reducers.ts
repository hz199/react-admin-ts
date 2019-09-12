import { combineReducers } from 'redux'
import { homeReducer } from './modules/home'
import { RootReducer } from './Types'

const rootReducer: RootReducer = combineReducers({
  home: homeReducer
})

export default rootReducer
