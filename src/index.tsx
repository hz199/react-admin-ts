import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './redux'
// import 'normalize.css'

const Page = lazy(() => import('./Page'))

ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback={<div>Loading...</div>}>
      <Page />
    </Suspense>
  </Provider>,
  document.getElementById('app') as HTMLDivElement
)
