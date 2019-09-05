

import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import routeConfig, { RouteConfig } from './config'

const Protected = <T extends {}>(Comp: React.ComponentType<T>, item: RouteConfig) => {
  return (props: T): React.ReactElement  => {
    console.log(item)
    return <Comp {...props} />
  }
}

const RouterApp = () => {
  return (
    <Switch>
      {
        routeConfig.map((item) => (
          <Route
            key={item.path}
            path={item.path}
            exact
            render={() => {
              return Protected(item.component, item)({})
            }}
          ></Route>
        ))
      }

      <Route render={() => <Redirect to='/404'/>} />
    </Switch>
  )
}

export default RouterApp
