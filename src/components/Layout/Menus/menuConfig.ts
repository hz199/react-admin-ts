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
        title: '导出Excel'
      },
      {
        icon: 'table',
        path: '/app/tables/importTable',
        title: '导入Excel'
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
      },
      {
        icon: 'drag',
        path: '/app/components/dragAblePage',
        title: '简易拖拽'
      }
    ]
  }
]

export default menus
