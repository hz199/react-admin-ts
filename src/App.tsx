import * as React from 'react'
import { Layout, Drawer } from 'antd'
import { connect } from 'react-redux'
import RouterApp from './routes'
import { Dispatch } from 'redux'
import { RootState } from './redux/Types'
import { actionTypes, actionCreators } from './redux/modules/settings'
import AdminHeader from './components/Layout/Header'
import Menus from './components/Layout/Menus'
import throttle from './utils/throttle'
import './App.less'

/**
 * 当屏幕宽度小于 765 抽屉组件显示
 */
const ScreenStatus = 765

/**
 * Drawer组件显示的位置
 */
type Placement = 'left'

interface IState {
  collapsed: boolean
  placement: Placement
  drawerVisible: boolean
}

interface IProps {
  screenOffsetWidth: number
  setScreenWidth: (F: number) => void
}

class App extends React.PureComponent<IProps, IState> {
  state: IState = {
    collapsed: false,
    drawerVisible: false,
    placement: 'left'
  }

  componentDidMount() {
    window.addEventListener(
      'resize',
      throttle(() => {
        this.props.setScreenWidth(document.body.offsetWidth)
      }, 600),
      false
    )
    // 先运行一次
    this.props.setScreenWidth(document.body.offsetWidth)
  }

  // 切换菜单
  handleMenuClick = () => {
    const { screenOffsetWidth } = this.props
    const { collapsed, drawerVisible } = this.state

    // 抽屉组件显示
    if (screenOffsetWidth < ScreenStatus) {
      this.setState({
        collapsed: false,
        drawerVisible: !drawerVisible
      })
    } else {
      this.setState({
        collapsed: !collapsed,
        drawerVisible: false
      })
    }
  }

  // 点击抽屉遮罩关闭
  handleDrawerClose = () => {
    this.setState({
      drawerVisible: false
    })
  }

  render() {
    const { placement, drawerVisible, collapsed } = this.state
    const { screenOffsetWidth } = this.props

    const Sider = (
      <Layout.Sider collapsed={collapsed}>
        <Menus></Menus>
      </Layout.Sider>
    )

    const DrawerView = (
      <Drawer
        className="zh-app__drawer"
        placement={placement}
        closable={false}
        visible={drawerVisible}
        width={200}
        onClose={() => {
          this.handleDrawerClose()
        }}
      >
        {Sider}
      </Drawer>
    )

    return (
      <Layout style={{ minHeight: '100vh' }}>
        {screenOffsetWidth < ScreenStatus ? DrawerView : Sider}
        <Layout>
          <AdminHeader
            onMenuClick={() => {
              this.handleMenuClick()
            }}
            currentMenuStatus={screenOffsetWidth < ScreenStatus ? this.state.drawerVisible : this.state.collapsed}
          ></AdminHeader>
          <Layout.Content style={{ margin: '8px 16px 0', display: 'flex', flexDirection: 'column' }}>
            <div style={{ background: '#fff', borderRadius: '2px', padding: '5px', flexGrow: 1 }}>
              <React.Suspense fallback={<div>Loading comp...</div>}>
                <RouterApp></RouterApp>
              </React.Suspense>
            </div>
            <Layout.Footer style={{ textAlign: 'center' }}>react-admin ©2019 Created by H.Z</Layout.Footer>
          </Layout.Content>
        </Layout>
      </Layout>
    )
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    screenOffsetWidth: state.settings.ScreenWidth
  }
}

const mapDispatchToProps = (dispatch: Dispatch<actionTypes.SetScreenWidthAction>) => {
  return {
    setScreenWidth(payload: number) {
      dispatch(actionCreators.setScreenWidth(payload))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
