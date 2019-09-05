

import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import routeConfig from './config'

const Protected = (props:any) => {
  const { component: Comp, path } = props
  return (
    <Route
      path={path}
      render={() => {
        console.log(props)
        return <Comp></Comp>
      }}
    ></Route>
  )
}

const RouterApp = () => {
  return (
    <Switch>
      {
        routeConfig.map((item) => (
          <Protected
            path={ item.path }
            component={ item.component }
            key={ item.path }
          >
          </Protected>
        ))
      }

      <Route render={() => <Redirect to='/404'/>} />
    </Switch>
  )
}

export default RouterApp
