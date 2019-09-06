import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom'
// import 'normalize.css'

const Page = lazy(() => import('./Page'))

ReactDOM.render(
  <Suspense fallback={<div>Loading...</div>}>
    <Page />
  </Suspense>,
  document.getElementById('app') as HTMLDivElement
)
