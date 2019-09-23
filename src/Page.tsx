import * as React from 'react'
import { hot } from 'react-hot-loader/root'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom' // BrowserRouter
import App from './App'
import NoFind from './containers/NoFind'
import Login from './containers/Login'

const Page = () => (
  <Router>
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/app" />} />
      <Route path="/app" component={App} />
      <Route exact path="/404" component={NoFind} />
      <Route exact path="/login" component={Login} />
      <Route render={() => <Redirect to="/404" />} />
    </Switch>
  </Router>
)

export default hot(Page)
