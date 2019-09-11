import { combineReducers } from 'redux'
import { homeReducer } from './modules/home'
import { RootReducer } from './Types'

// type RootReducer = (state: RootState | undefined, action: RootAction) => RootState

const rootReducer: RootReducer = combineReducers({
  home: homeReducer
})

export default rootReducer
