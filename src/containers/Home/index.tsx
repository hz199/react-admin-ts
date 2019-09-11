import * as React from 'react'
import { Button } from 'antd'
// import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import './index.less'

interface HomeProps extends RouteComponentProps {}

const test = (tar: any) => {
  console.log(tar)
}

@test
class Home extends React.Component<HomeProps> {
  render() {
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
}

export default withRouter(Home)
