import * as React from 'react'
import './index.less'
import Input from './Input'

const Login = () => {
  return (
    <div className="login">
      <form className="login-form">
        <h1>登录</h1>

        <Input type="text" placeholder="UserName"></Input>
        <Input type="password" placeholder="Password"></Input>
        <div className="form-item1">
          <button type="button">登录</button>
        </div>
      </form>
    </div>
  )
}

export default Login
