import * as React from 'react'
import { Layout, Drawer } from 'antd'
import * as H from 'history'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import RouterApp from './routes'
import { Dispatch } from 'redux'
import { RootState } from './redux/Types'
import { actionTypes, actionCreators } from './redux/modules/settings'
import { actionTypes as AuthActionType } from './redux/modules/auth'
import AdminHeader from './components/Layout/Header'
import Menus from './components/Layout/Menus'
import throttle from './utils/throttle'
import TagPageOpen from './components/Layout/TagPageOpen'
import LoadingFull from './components/loadingFull'
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

interface IProps extends RouteComponentProps {
  screenOffsetWidth: number
  breadcrumbList: actionTypes.BreadcrumbData[]
  tagsNavData: Array<actionTypes.TagNavConfig>
  userInfo: AuthActionType.UserInfo
  setScreenWidth: (P: number) => void
  deleteOneTag: (P: actionTypes.DeleteOneTagData) => void
  deleteAllTag: (P: H.History) => void
  deleteOtherTag: (P: H.History) => void
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
    const {
      screenOffsetWidth,
      tagsNavData,
      history,
      breadcrumbList,
      userInfo,
      ...otherDeleteTagProps
    } = this.props

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
            userInfo={userInfo}
            appHistory={history}
            breadcrumbList={breadcrumbList}
            currentMenuStatus={
              screenOffsetWidth < ScreenStatus ? this.state.drawerVisible : this.state.collapsed
            }
          ></AdminHeader>
          {/* tag 导航 */}
          {screenOffsetWidth < ScreenStatus ? null : (
            <TagPageOpen
              {...otherDeleteTagProps}
              appHistory={history}
              tagsNavList={tagsNavData}
            ></TagPageOpen>
          )}
          <Layout.Content
            style={{ margin: '8px 16px 0', display: 'flex', flexDirection: 'column' }}
          >
            <div style={{ background: '#fff', borderRadius: '2px', padding: '5px', flexGrow: 1 }}>
              <React.Suspense fallback={<LoadingFull></LoadingFull>}>
                <RouterApp></RouterApp>
              </React.Suspense>
            </div>
            <Layout.Footer style={{ textAlign: 'center' }}>
              react-admin ©2019 Created by H.Z
            </Layout.Footer>
          </Layout.Content>
        </Layout>
      </Layout>
    )
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    screenOffsetWidth: state.settings.ScreenWidth,
    tagsNavData: state.settings.tagNav,
    breadcrumbList: state.settings.breadcrumbList,
    userInfo: state.auth.userInfo
  }
}

const mapDispatchToProps = (dispatch: Dispatch<actionTypes.SettingsAction>) => {
  return {
    setScreenWidth(payload: number) {
      dispatch(actionCreators.setScreenWidth(payload))
    },
    deleteOneTag(payload: actionTypes.DeleteOneTagData) {
      dispatch(actionCreators.deleteOneTag(payload))
    },
    deleteAllTag(payload: H.History) {
      dispatch(actionCreators.deleteAllTag(payload))
    },
    deleteOtherTag(payload: H.History) {
      dispatch(actionCreators.deleteOtherTag(payload))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(App))
