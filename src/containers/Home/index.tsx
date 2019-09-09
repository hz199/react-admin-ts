import * as React from 'react'
import { Button } from 'antd'
import { withRouter } from 'react-router-dom'
import './index.less'

// interface HomeProps extends RouteComponentProps {}

const Home = () => {
  return (
    <div className="home">
      <p>Home22sssssss</p>
      <p>Home22sssssss</p>
      <p>Home22sssssss</p>
      <p>Home22sssssss</p>
      <Button type="primary">按钮</Button>
    </div>
  )
}
export default withRouter(Home)
