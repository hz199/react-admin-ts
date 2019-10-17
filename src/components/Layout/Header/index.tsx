import * as React from 'react'
import { Layout, Icon, Breadcrumb } from 'antd'
import * as H from 'history'
import { actionTypes } from '@/redux/modules/settings'
import './index.less'

interface IProps {
  onMenuClick: () => void
  currentMenuStatus: boolean
  breadcrumbList: actionTypes.BreadcrumbData[]
  appHistory: H.History
}

const menuIconStyle: React.CSSProperties = {
  fontSize: 18,
  margin: '0 30px',
  fontWeight: 'bold',
  verticalAlign: '-3px',
  cursor: 'pointer'
}

const AdminHeader = (props: IProps) => {
  const { onMenuClick, currentMenuStatus, appHistory, breadcrumbList } = props

  const handleClick = (url?: string) => {
    if (!url) return
    if (appHistory.location.pathname !== url) {
      appHistory.push(url)
    }
  }

  const BreadcrumbElement = (
    <Breadcrumb className="admin-breadcrumb">
      <Breadcrumb.Item onClick={() => handleClick('/app')}>
        <Icon type="home" />
        <span>首页</span>
      </Breadcrumb.Item>
      {breadcrumbList.map((item, index) => {
        return (
          <Breadcrumb.Item key={item.title + index} onClick={() => handleClick(item.url)}>
            <Icon type="container" />
            <span>{item.title}</span>
          </Breadcrumb.Item>
        )
      })}
    </Breadcrumb>
  )

  return (
    <Layout.Header style={{ background: '#fff', padding: 0 }} className="clearfix">
      <div className="pull-left">
        <Icon
          onClick={(e: React.MouseEvent) => {
            e.preventDefault()
            onMenuClick()
          }}
          style={menuIconStyle}
          type={currentMenuStatus ? 'menu-unfold' : 'menu-fold'}
        />
      </div>
      <div className="breadcrumb">{BreadcrumbElement}</div>
    </Layout.Header>
  )
}

export default AdminHeader
