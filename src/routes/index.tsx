import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import routeConfig, { RouteConfig } from './config'

interface RequiredRules {
  loginRequired(): boolean
}

// 权限限制规则
const requiredRules: RequiredRules = {
  loginRequired() {
    return true
  },
}

const Protected = <T extends {}>(Comp: React.ComponentType<T>, item: RouteConfig) => {
  return (props: T): React.ReactElement => {
    // TODO 处理一些额外的事件
    const { meta, path } = item
    document.title = meta.title || 'react-admin-ts'

    // 路由拦截 进入页面前 检查
    if (meta.rules && meta.rules instanceof Array) {
      const middleware = meta.rules.map((item) => (requiredRules as any)[item])
      for (let i = 0; i < middleware.length; i++) {
        const result = middleware[i](path)

        if (!result) {
          return <Redirect to="/login" />
        }
      }
    }

    return <Comp {...props} />
  }
}

const RouterApp = () => {
  return (
    <Switch>
      {routeConfig.map((item: RouteConfig) => (
        <Route
                    key={item.path}
                    path={item.path}
                    exact
          render={() => {
                        return Protected(item.component, item)({})
                    }}></Route>
            ))}
            <Route render={() => <Redirect to="/404" />} />
        </Switch>
  )
}

export default RouterApp
