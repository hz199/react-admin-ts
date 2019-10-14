import * as React from 'react'
import { Row, Col, Dropdown, Button, Menu } from 'antd'
import { actionTypes } from '@/redux/modules/settings'
// import { CSSTransition, TransitionGroup } from 'react-transition-group'
import './index.less'
import Tag from './Tag'

interface IState {
  /**
   * 滚动区域left
   */
  scrollBodyLeft: number
}

interface IProps {
  tagsNavList: Array<actionTypes.TagNavConfig>
}

class TagPageOpen extends React.Component<IProps, IState> {
  // 当前tag ref
  _currentTag: HTMLDivElement | null = null
  // 滚动区域
  _scrollView: HTMLDivElement | null = null
  // 滚动可视区 父级
  _scrollViewWrapper: HTMLDivElement | null = null

  state = {
    scrollBodyLeft: 0
  }

  componentDidUpdate() {
    this.moveToView(this._currentTag as HTMLDivElement)
  }

  shouldComponentUpdate(nextProps: IProps) {
    if (nextProps.tagsNavList === this.props.tagsNavList) {
      return false
    }
    console.log('视图更新')
    return true
  }

  moveToView(currentTag: HTMLDivElement) {
    console.log(currentTag)
  }

  // moveToView(tag, scrollView) {
  //   const outerWidth = scrollView.offsetWidth
  //   const bodyWidth = this.$refs.scrollBody.offsetWidth
  //   const { scrollBodyLeft } = this.state

  //   if (bodyWidth < outerWidth) {
  //     this.setState({
  //       scrollBodyLeft: 0
  //     })
  //     // this.tagBodyLeft = 0
  //   } else if (tag.offsetLeft < -scrollBodyLeft) {
  //     // 标签在可视区域左侧
  //     this.setState({
  //       scrollBodyLeft: -tag.offsetLeft
  //     })
  //     // this.tagBodyLeft = -tag.offsetLeft + this.outerPadding
  //   } else if (tag.offsetLeft > -scrollBodyLeft && tag.offsetLeft + tag.offsetWidth < -scrollBodyLeft + outerWidth) {
  //     // 标签在可视区域
  //     this.setState({
  //       scrollBodyLeft: Math.min(0, outerWidth - tag.offsetWidth - tag.offsetLeft)
  //     })
  //     // this.tagBodyLeft = Math.min(0, outerWidth - tag.offsetWidth - tag.offsetLeft - this.outerPadding)
  //   } else {
  //     // 标签在可视区域右侧
  //     this.setState({
  //       scrollBodyLeft: -(tag.offsetLeft - (outerWidth - tag.offsetWidth))
  //     })
  //     // this.tagBodyLeft = -(tag.offsetLeft - (outerWidth - this.outerPadding - tag.offsetWidth))
  //   }
  // }

  render() {
    const { tagsNavList } = this.props
    const { scrollBodyLeft } = this.state

    const menus = (
      <Menu>
        <Menu.Item key="all">关闭所有</Menu.Item>
        <Menu.Item key="other">关闭其他</Menu.Item>
      </Menu>
    )

    const Tags = tagsNavList.map((tag) => {
      return (
        <Tag
          onCurrentRef={(tag) => {
            this._currentTag = tag
          }}
          closable={tag.flag}
          color={tag.color}
          key={tag.path}
        >
          {tag.title}
        </Tag>
      )
    })

    return (
      <div className="TagPageOpen">
        <Row>
          <Col lg={22} xs={18} className="TagPageOpen__col-22">
            <div className="tag-button"></div>
            <div className="TagPageOpen__scroll-view" ref={(view) => (this._scrollViewWrapper = view)}>
              <div
                className="TagPageOpen__scroll-body"
                style={{ left: `${scrollBodyLeft}px` }}
                ref={(view) => (this._scrollView = view)}
              >
                <div className="tag-wrapper">{Tags}</div>
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
