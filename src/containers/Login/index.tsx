import * as React from 'react'
import { message } from 'antd'
import $store from '@/redux/index'
import { actionCreators, actionTypes } from '@/redux/modules/auth'
import { LoginParams, loginAjax } from '@/services/auth'
import { RouteComponentProps } from 'react-router-dom'
import './index.less'
import Input from './Input'

interface IProps extends RouteComponentProps {}

const Login = (props: IProps) => {
  const [submitParams, setSubmitParams] = React.useState<LoginParams>({
    userName: '',
    password: ''
  })

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubmitParams(
      Object.assign({}, submitParams, {
        [e.target.name]: e.target.value
      })
    )
  }

  const handleLogin = async (payload: LoginParams) => {
    await loginAjax(payload).then((res) => {
      if (res.data.code === 0) {
        $store.dispatch<actionTypes.AuthActions>(actionCreators.setUserInfo(res.data.data))
        // userInfo 存入localStorage
        window.localStorage.setItem('USER_INFO', JSON.stringify(res.data.data))

        setTimeout(() => {
          props.history.push('/app')
        }, 100)
      } else {
        message.error('登录失败，请稍后重试！')
      }
    })
  }

  const handleSubmit = () => {
    if (!submitParams.userName) {
      message.error('请输入用户名！')
      return
    }

    if (!submitParams.password) {
      message.error('请输入密码！')
      return
    }

    handleLogin(submitParams)
  }

  return (
    <div className="login">
      <form className="login-form">
        <h1>登录</h1>
        <Input name="userName" type="text" placeholder="UserName" onChange={inputChange}></Input>
        <Input
          name="password"
          type="password"
          placeholder="Password"
          onChange={inputChange}
        ></Input>
        <div className="form-item1">
          <button type="button" onClick={handleSubmit}>
            登录
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login
