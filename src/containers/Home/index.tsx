import * as React from 'react'
import { Row, Col, Card } from 'antd'
import { connect, Omit } from 'react-redux'
import { RootState } from '../../redux/Types'
import { actionTypes, actionCreators } from '../../redux/modules/home'
import { Dispatch } from 'redux'
import * as homeServices from '../../services/home'
import NumberCard from './NumberCard'
import LineBarChart from '../../components/Echarts/LineBarChart'
import Pie from '../../components/Echarts/Pie'

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
// mapStateToProps 的key 的联合类型
type MapStateToPropsKeys = keyof FromStateProps
type FromDispatchProps = Omit<HomeProps, MapStateToPropsKeys>

const mapDispatchToProps = (dispatch: Dispatch<actionTypes.HomeAction>): FromDispatchProps => {
  return {
    setHomeData: (payload) => {
      dispatch(actionCreators.setHomeData(payload))
    }
  }
}

/**
 * home 页面
 */
const HomePage = (props: HomeProps) => {
  const getHomeData = () => {
    homeServices.getHomeData().then((res) => {
      props.setHomeData(res.data)
    })
  }

  React.useEffect(() => {
    getHomeData()
  }, [])

  const { numberCards, LineBarChartOption, pieOptions } = props.homeData

  return (
    <div className="home">
      <Row gutter={24}>
        {numberCards.map((item, key) => (
          <Col key={key} lg={6} md={12}>
            <NumberCard {...item}></NumberCard>
          </Col>
        ))}
        <Col lg={18} md={24}>
          <Card>
            <LineBarChart options={LineBarChartOption}></LineBarChart>
          </Card>
        </Col>
        <Col lg={6} md={24}>
          <Row gutter={24}>
            <Col lg={24} md={12}>
              <Card className="card card--margin">
                <Pie options={pieOptions} style={{ height: '162px' }}></Pie>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage)
