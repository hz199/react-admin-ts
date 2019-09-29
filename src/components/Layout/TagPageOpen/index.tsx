import * as React from 'react'
import { Row, Col, Dropdown, Button, Menu } from 'antd'
// import { CSSTransition, TransitionGroup } from 'react-transition-group'
import './index.less'

class TagPageOpen extends React.Component {
  // 当前tag ref
  _currentTag = null
  // 可视区域ref
  _scrollView = null

  render() {
    const menus = (
      <Menu>
        <Menu.Item key="all">关闭所有</Menu.Item>
        <Menu.Item key="other">关闭其他</Menu.Item>
      </Menu>
    )

    return (
      <div className="TagPageOpen">
        <Row>
          <Col lg={22} xs={18} className="TagPageOpen__col-22">
            <div className="tag-button"></div>
            <div className="TagPageOpen__scroll-view">
              <div className="TagPageOpen__scroll-body">
                {/* <TransitionGroup style={{display: 'flex'}}>
                  { Tags }
                </TransitionGroup> */}
              </div>
            </div>
            <div className="tag-button"></div>
          </Col>
          <Col lg={2} xs={6} className="TagPageOpen__col-2">
            <Dropdown overlay={menus} placement="bottomCenter">
              <Button type="primary" size="small">
                标签选项
              </Button>
            </Dropdown>
          </Col>
        </Row>
      </div>
    )
  }
}

export default TagPageOpen
