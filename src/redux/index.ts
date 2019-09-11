import { createStore, compose, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import reactThunk from 'redux-thunk'
import { RootState } from './Types' 

// 创建 tore 引入 redux devtools
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store: RootState = createStore(rootReducer, composeEnhancers(applyMiddleware(reactThunk)))

export default store
