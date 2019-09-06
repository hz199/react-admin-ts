import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConfigProvider } from 'antd'
import ZHCH from 'antd/es/locale-provider/zh_CN'
import store from './redux'
// import 'normalize.css'

const Page = lazy(() => import('./Page'))

ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider locale={ZHCH}>
      <Suspense fallback={<div>Loading...</div>}>
        <Page />
      </Suspense>
    </ConfigProvider>
  </Provider>,
  document.getElementById('app') as HTMLDivElement
)
