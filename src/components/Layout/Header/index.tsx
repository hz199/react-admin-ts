import * as React from 'react'
import { Layout, Icon, Breadcrumb, Avatar, Dropdown, Menu } from 'antd'
import * as H from 'history'
import { actionTypes } from '@/redux/modules/settings'
import { actionTypes as AuthActionType } from '@/redux/modules/auth'
import './index.less'

interface IProps {
  onMenuClick: () => void
  currentMenuStatus: boolean
  breadcrumbList: actionTypes.BreadcrumbData[]
  appHistory: H.History
  userInfo: AuthActionType.UserInfo
}

const menuIconStyle: React.CSSProperties = {
  fontSize: 18,
  margin: '0 30px',
  fontWeight: 'bold',
  verticalAlign: '-3px',
  cursor: 'pointer'
}

const AdminHeader = (props: IProps) => {
  const { onMenuClick, currentMenuStatus, appHistory, breadcrumbList, userInfo } = props

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

  const menuDropdown = (
    <Menu>
      <Menu.Item>
        <Icon type="import" />
        &nbsp;&nbsp;&nbsp;登&nbsp;&nbsp;出
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/hz199/react-admin-ts">
          <Icon type="github" />
          &nbsp;&nbsp;&nbsp; github
        </a>
      </Menu.Item>
    </Menu>
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
      <div className="breadcrumb pull-left">{BreadcrumbElement}</div>
      <div className="header-auth-wrapper pull-right">
        <Dropdown overlay={menuDropdown} placement="bottomCenter">
          <Avatar src={userInfo.avatar}>{userInfo.userName}</Avatar>
        </Dropdown>
      </div>
    </Layout.Header>
  )
}

export default AdminHeader
