import * as React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConfigProvider } from 'antd'
import ZHCH from 'antd/es/locale-provider/zh_CN'
import store from './redux'
import LoadingFull from './components/loadingFull'
// import 'normalize.css'

const Page = React.lazy(() => import('./Page'))

ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider locale={ZHCH}>
      <React.Suspense fallback={<LoadingFull></LoadingFull>}>
        <Page />
      </React.Suspense>
    </ConfigProvider>
  </Provider>,
  document.getElementById('app') as HTMLDivElement
)
