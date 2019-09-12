import * as React from 'react'
import { Button } from 'antd'
import { connect, Omit } from 'react-redux'
import { RootState } from '../../redux/Types'
import { actionTypes, actionCreators } from '../../redux/modules/home'
import { Dispatch } from 'redux'
// import { withRouter, RouteComponentProps } from 'react-router-dom'
import './index.less'

const testData: actionTypes.HomeData = {
  numberCards: [],
  LineBarChartOption: {
    series: [1, 2, 3],
    title: '',
    xAxisData: ['ds']
  },
  pieOptions: {
    datas: [],
    name: ''
  },
  orderTable: [],
  CommentList: []
}

// interface HomeProps extends RouteComponentProps {}
interface HomeProps {
  readonly homeData: actionTypes.HomeData
  readonly testData: string
  readonly setHomeData: () => void
}

type FromStateProps = Omit<HomeProps, 'setHomeData'>

const mapStateToProps = (state: RootState): FromStateProps => {
  return {
    homeData: state.home.homeData,
    testData: '哈哈'
  }
}

type FromDispatchProps = Omit<HomeProps, 'homeData' | 'testData'>

const mapDispatchToProps = (dispatch: Dispatch<actionTypes.HomeAction>): FromDispatchProps => {
  return {
    setHomeData: () => dispatch(actionCreators.setHomeData(testData))
  }
}

const Home = (props: HomeProps) => {
  React.useEffect(() => {
    props.setHomeData()
  }, [])

  return (
    <div className="home">
      <p>{props.testData}</p>
      <p>Home22sssssss</p>
      <p>Home22sssssss</p>
      <p>Home22sssssss</p>
      <Button type="primary">按钮</Button>
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
