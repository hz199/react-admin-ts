import * as React from 'react'
import { Row, Col, Card } from 'antd'
import { connect, Omit } from 'react-redux'
import { RootState } from '../../redux/Types'
import { actionTypes, actionCreators } from '../../redux/modules/home'
import { Dispatch } from 'redux'
import * as homeServices from '../../services/home'
import NumberCard from './NumberCard'

import './index.less'

interface HomeProps {
  readonly homeData: actionTypes.HomeData
  readonly testData: string
  readonly setHomeData: (payload: actionTypes.HomeData) => void
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
    setHomeData: (payload) => {
      dispatch(actionCreators.setHomeData(payload))
    }
  }
}

// home
const Home = (props: HomeProps) => {
  const getHomeData = () => {
    homeServices.getHomeData().then((res) => {
      props.setHomeData(res.data)
    })
  }

  React.useEffect(() => {
    getHomeData()
  }, [])

  return (
    <div className="home">
      <Row gutter={24}>
        {props.homeData.numberCards.map((item, key) => (
          <Col key={key} lg={6} md={12}>
            <NumberCard {...item}></NumberCard>
          </Col>
        ))}
        <Col lg={18} md={24}>
          <Card>{/* <Lin0eBarChart options={LineBarChartOption}></Lin0eBarChart> */}</Card>
        </Col>
        <Col lg={6} md={24}>
          <Row gutter={24}>
            <Col lg={24} md={12}>
              <Card className="card card--margin">
                66
                {/* <Pie options={pieOption} style={{ height: "162px" }}></Pie> */}
              </Card>
            </Col>
            <Col lg={24} md={12}>
              <Card className="card card1">
                随便写点字吧，凑点字数，好看点。随便写点字吧，凑点字数，好看点。随便写点字吧，凑点字数，好看点。随便写点字吧，凑点字数，好看点。
              </Card>
            </Col>
          </Row>
        </Col>
        <Col lg={12} md={24}>
          <Card bordered={false}>
            66
            {/* <OrderTable dataSource={orderTableData}></OrderTable> */}
          </Card>
        </Col>
        <Col lg={12} md={24}>
          <Card bordered={false}>
            55
            {/* <CommentList dataSource={commentListData}></CommentList> */}
          </Card>
        </Col>
      </Row>
    </div>
  )
}

// Home.propTypes = {
//   setHomeData: PropsType.func
// }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
