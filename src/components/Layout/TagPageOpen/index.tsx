import * as React from 'react'
import * as H from 'history'
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
  appHistory: H.History

  deleteOneTag: (P: actionTypes.DeleteOneTagData) => void
  deleteAllTag: (P: H.History) => void
  deleteOtherTag: (P: H.History) => void
}

class TagPageOpen extends React.PureComponent<IProps, IState> {
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
    setTimeout(() => {
      this.moveToView(this._currentTag as HTMLDivElement, this._scrollViewWrapper as HTMLDivElement)
    }, 100)
  }

  // UNSAFE_componentWillReceiveProps(props: any) {
  //   console.log(props, 'hdfsghj ')
  // }

  moveToView(currentTag: HTMLDivElement, scrollView: HTMLDivElement) {
    const { scrollBodyLeft } = this.state

    if (currentTag.offsetLeft < -scrollBodyLeft) {
      // 标签在可视区域左侧
      this.setState({
        scrollBodyLeft: -currentTag.offsetLeft + 10 < 0 ? 0 : -currentTag.offsetLeft + 10
      })
    } else if (
      currentTag.offsetLeft + 10 > -scrollBodyLeft &&
      currentTag.offsetLeft + currentTag.offsetWidth < -scrollBodyLeft + scrollView.offsetWidth - 80
    ) {
      // 标签在可视区域
      this.setState({
        scrollBodyLeft: Math.min(
          0,
          scrollView.offsetWidth - 100 - currentTag.offsetWidth - currentTag.offsetLeft - 20
        )
      })
    } else {
      // 标签在可视区域右侧
      this.setState({
        scrollBodyLeft: -(
          currentTag.offsetLeft -
          (scrollView.offsetWidth - 50 - currentTag.offsetWidth) +
          20
        )
      })
    }
  }

  deleteMenu = ({ key }: any) => {
    const { deleteAllTag, deleteOtherTag, appHistory } = this.props
    switch (key) {
      case 'all':
        deleteAllTag(appHistory)
        break
      case 'other':
        deleteOtherTag(appHistory)
        break
      default:
        break
    }
  }

  deleteOneTag = (path: string) => {
    const { deleteOneTag, appHistory } = this.props
    deleteOneTag({
      path,
      history: appHistory
    })
  }

  handleJumpRouter = (path: string) => {
    const { appHistory } = this.props
    if (path !== appHistory.location.pathname) {
      appHistory.push(path)
    }
  }

  render() {
    const { tagsNavList } = this.props
    const { scrollBodyLeft } = this.state
    const menus = (
      <Menu onClick={this.deleteMenu}>
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
          onPress={this.handleJumpRouter}
          onClose={this.deleteOneTag}
          closable={tag.flag}
          color={tag.color}
          routerPath={tag.path}
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
            <div
              className="TagPageOpen__scroll-view"
              ref={(view) => (this._scrollViewWrapper = view)}
            >
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
