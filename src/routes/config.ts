import { lazy } from 'react'

const routes = [
  {
    name: 'Home',
    path: '/app',
    component: lazy(() => import('../containers/Home')),
    meta: {
      title: '首页',
      rules: ['loginRequired']
    }
  },
  {
    name: 'Table',
    path: '/app/tables',
    component: lazy(() => import('../containers/Table')),
    meta: {
      title: '表格',
      rules: ['loginRequired']
    }
  }
]

export default routes