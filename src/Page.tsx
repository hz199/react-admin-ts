import * as React from 'react'
import { hot } from 'react-hot-loader/root'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom' // BrowserRouter
import $store from '@/redux'
import { actionCreators, actionTypes } from '@/redux/modules/auth'
import App from './App'
import NoFind from './containers/NoFind'
import Login from './containers/Login'
import Page403 from './containers/403'

const Page = () => {
  const setAuthUserInfo = () => {
    const userInfo: actionTypes.UserInfo = JSON.parse(
      window.localStorage.getItem('USER_INFO') || '{}'
    )

    if (Object.keys(userInfo).length > 0) {
      $store.dispatch<actionTypes.SetUserInfoAction>(actionCreators.setUserInfo(userInfo))
    }
  }

  React.useEffect(() => {
    setAuthUserInfo()
  }, [])

  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/app" />} />
        <Route path="/app" component={App} />
        <Route exact path="/404" component={NoFind} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/403" component={Page403} />
        <Route render={() => <Redirect to="/404" />} />
      </Switch>
    </Router>
  )
}

export default hot(Page)
