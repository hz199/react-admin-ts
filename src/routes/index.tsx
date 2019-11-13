import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import routeConfig, { RouteConfig } from './config'
import { actionCreators, actionTypes } from '../redux/modules/settings'

interface RequiredRules {
  // 返回的是 重定向的路径 Redirect 无返回则为 ''
  loginRequired: () => string
}

// 权限限制规则
const requiredRules: RequiredRules = {
  loginRequired: () => {
    const userInfo = JSON.parse(window.localStorage.getItem('USER_INFO') || '{}')
    return Object.keys(userInfo).length > 0 ? '' : '/login'
  }
}

interface IRouteProps {
  setTagsNavData: (P: actionTypes.SetTagsNavOptions) => void
}

const Protected = function Protected(Comp: React.ComponentType, item: RouteConfig) {
  return (props: IRouteProps): React.ReactElement => {
    // TODO 处理一些额外的事件
    const { meta, path } = item
    document.title = meta.title || 'react-admin-ts'

    // 路由拦截 进入页面前 检查
    if (meta.rules && meta.rules instanceof Array) {
      const middleware = meta.rules.map((item) => (requiredRules as any)[item])
      for (let i = 0; i < middleware.length; i++) {
        const result = middleware[i](path)

        if (result) {
          return <Redirect to={result} />
        }
      }
    }
    const { setTagsNavData } = props
    setTagsNavData({
      path,
      title: meta.title
    })
    return <Comp />
  }
}

const RouterApp = (props: IRouteProps) => {
  return (
    <Switch>
      {routeConfig.map((item: RouteConfig) => (
        <Route
          key={item.path}
          path={item.path}
          exact
          render={() => Protected(item.component, item)(props)}
        ></Route>
      ))}
      <Route render={() => <Redirect to="/404" />} />
    </Switch>
  )
}

export default connect(
  () => ({}),
  (dispatch: Dispatch<actionTypes.SettingsAction>) => {
    return {
      setTagsNavData(currentRouter: actionTypes.SetTagsNavOptions) {
        dispatch(actionCreators.setTagsNavData(currentRouter))
      }
    }
  }
)(RouterApp)
