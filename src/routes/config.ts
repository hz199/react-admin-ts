import { lazy, ComponentType } from 'react'

interface Meta {
  title: string
  rules: string[]
}

export interface RouteConfig {
  name: string
  path: string
  component: ComponentType
  meta: Meta
}

const routes: RouteConfig[] = [
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
    path: '/app/tables/table1',
    component: lazy(() => import('../containers/Table')),
    meta: {
      title: '表格',
      rules: ['loginRequired']
    }
  },
  /* ComponentsPage start */
  {
    name: 'LoadingBar',
    path: '/app/components/loadingBar',
    component: lazy(() => import('../containers/ComponentsPage/LoadingBar')),
    meta: {
      title: 'LoadingBar',
      rules: ['loginRequired']
    }
  }
]

export default routes
