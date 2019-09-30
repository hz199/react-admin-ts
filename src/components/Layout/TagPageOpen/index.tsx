import * as React from 'react'
import { Row, Col, Dropdown, Button, Menu } from 'antd'
// import { CSSTransition, TransitionGroup } from 'react-transition-group'
import './index.less'
import Tag from './Tag'

interface IState {
  /**
   * 滚动区域left
   */
  scrollBodyLeft: number
}

class TagPageOpen extends React.Component<{}, IState> {
  // 当前tag ref
  _currentTag: HTMLDivElement | null = null
  // 可视区域ref
  _scrollView: HTMLDivElement | null = null

  state = {
    scrollBodyLeft: 0
  }

  componentDidUpdate() {
    // this.moveToTag(this._currentTag as HTMLDivElement, this._scrollView as HTMLDivElement)
  }

  // // 标签移动
  // moveToTag(tag: HTMLDivElement, scrollView: HTMLDivElement) {
  //   const { scrollBodyLeft } = this.state

  //   if (tag.offsetLeft < -scrollBodyLeft) {
  //     // 标签在可视区域左侧
  //     this.setState({
  //       scrollBodyLeft: -tag.offsetLeft + 10 < 0 ? 0 : -tag.offsetLeft + 10
  //     })
  //   } else if (
  //     tag.offsetLeft + 10 > -scrollBodyLeft &&
  //     tag.offsetLeft + tag.offsetWidth < -scrollBodyLeft + scrollView.offsetWidth - 100
  //   ) {
  //     // 标签在可视区域
  //     this.setState({
  //       scrollBodyLeft: Math.min(0, scrollView.offsetWidth - 100 - tag.offsetWidth - tag.offsetLeft - 20)
  //     })
  //   } else {
  //     // 标签在可视区域右侧
  //     this.setState({
  //       scrollBodyLeft: -(tag.offsetLeft - (scrollView.offsetWidth - 100 - tag.offsetWidth) + 20)
  //     })
  //   }
  // }

  render() {
    const menus = (
      <Menu>
        <Menu.Item key="all">关闭所有</Menu.Item>
        <Menu.Item key="other">关闭其他</Menu.Item>
      </Menu>
    )

    const Tags = (
      <Tag
        onRef={(tag) => {
          this._currentTag = tag
        }}
      >
        导航
      </Tag>
    )

    return (
      <div className="TagPageOpen">
        <Row>
          <Col lg={22} xs={18} className="TagPageOpen__col-22">
            <div className="tag-button"></div>
            <div className="TagPageOpen__scroll-view" ref={(view) => (this._scrollView = view)}>
              <div className="TagPageOpen__scroll-body">{Tags}</div>
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
