import * as React from 'react'
import { hot } from 'react-hot-loader/root'
import { Link } from 'react-router-dom'
import RouterApp from './routes'

const App = () => (
  <div>
    <ul>
      <li><Link to='/'>home</Link></li>
      <li><Link to='/table'>table</Link></li>
      <li><Link to='/dhfg'>404</Link></li>
    </ul>
    <div>
      <RouterApp></RouterApp>
    </div>
  </div>
)
export default hot(App)
