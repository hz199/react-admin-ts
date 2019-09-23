import * as React from 'react'
import { Layout, Icon } from 'antd'

interface IProps {
  onMenuClick: () => void
  currentMenuStatus: boolean
}

const menuIconStyle: React.CSSProperties = {
  fontSize: 18,
  margin: '0 30px',
  fontWeight: 'bold',
  verticalAlign: '-3px',
  cursor: 'pointer'
}

const AdminHeader = (props: IProps) => {
  const { onMenuClick, currentMenuStatus } = props

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
    </Layout.Header>
  )
}

export default AdminHeader
