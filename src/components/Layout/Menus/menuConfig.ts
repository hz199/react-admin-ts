export interface MenusConfig {
  icon: string
  title: string
  path?: string
  SubMenu?: Array<MenusConfig>
}

const menus: Array<MenusConfig> = [
  {
    icon: 'pie-chart',
    title: '首页',
    path: '/app'
  },
  {
    icon: 'table',
    title: '表格',
    SubMenu: [
      {
        icon: 'table',
        path: '/app/tables/table1',
        title: '基础表格'
      }
    ]
  },
  {
    icon: 'compass',
    title: '组件',
    SubMenu: [
      {
        icon: 'loading-3-quarters',
        path: '/app/components/loadingBar',
        title: 'LoadingBar'
      }
    ]
  }
]

export default menus
