import * as React from 'react'
import { Button } from 'antd'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import './index.less'

interface HomeProps extends RouteComponentProps {}

const Home = (props: HomeProps) => {
  console.log(props)
  return (
    <div className="home">
      Home22sssssss
      <Button type="primary">按钮</Button>
    </div>
  )
}
export default withRouter(Home)
