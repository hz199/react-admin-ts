import React, { PureComponent, Fragment } from 'react'
import ReactDOM from 'react-dom'
import './index.less'

// 变量接收上次的 LoadingBar
let CurrentLoadingBar: any = null
// 动画结束后 销毁组件的间隔
const DURATION = 800

interface IState {
  currentBgColor: string
  percent: number
}

class LoadingBar extends PureComponent<{}, IState> {
  /**
   * 当前 LoaderBar div 元素
   * @type {(HTMLDivElement | null)}
   */
  _currentNodeRef: HTMLDivElement | null = null
  /**
   * 当前 LoaderBar wrapper div 元素
   * @type {(HTMLDivElement | null)}
   */
  _containerRef: HTMLDivElement | null = null
  /**
   * 定时器
   * @type {*}
   */
  _timer: any
  // state
  state: IState = {
    currentBgColor: 'primary',
    percent: -100
  }

  /**
   * render 当前实例插入到 body 中
   * @memberof LoadingBar
   */
  static renderElement = () => {
    const container = document.createElement('div')
    container.className = 'zh-loadingBar'
    const currentNode = document.body.appendChild(container)
    const _loadingBar: any = ReactDOM.render(<LoadingBar />, container)
    _loadingBar._containerRef = container
    _loadingBar._currentNodeRef = currentNode

    CurrentLoadingBar = _loadingBar
    return _loadingBar
  }

  /**
   * 开始调用
   * @memberof LoadingBar
   */
  static start = () => {
    // 先把上一次组件卸载 在重新开始一个新的组件
    if (CurrentLoadingBar) {
      CurrentLoadingBar.destroy()
    }
    LoadingBar.renderElement()

    let percent = -100
    CurrentLoadingBar._timer = setInterval(() => {
      percent += Math.floor(Math.random() * 3 + 1)
      if (percent > -5) {
        CurrentLoadingBar.clearTimer()
      }
      CurrentLoadingBar.update({
        percent: percent,
        currentBgColor: 'primary'
      })
    }, 200)
    return CurrentLoadingBar
  }

  static finish = () => {
    LoadingBar.finished('success')
  }

  static finished = (type: string) => {
    if (CurrentLoadingBar) {
      CurrentLoadingBar.clearTimer()

      CurrentLoadingBar.update({
        percent: 100,
        currentBgColor: type
      })

      // 执行销毁组件程序
      setTimeout(() => {
        CurrentLoadingBar && CurrentLoadingBar.destroy()
      }, DURATION)
    } else {
      CurrentLoadingBar = LoadingBar.renderElement()
      CurrentLoadingBar.update({
        percent: 0,
        currentBgColor: type
      })

      setTimeout(() => {
        CurrentLoadingBar && CurrentLoadingBar.destroy()
      }, DURATION)
    }
  }

  static error = () => {
    LoadingBar.finished('error')
  }

  update = (option: { percent: number; currentBgColor: string }) => {
    this.setState({
      currentBgColor: option.currentBgColor,
      percent: option.percent
    })
  }

  destroy = () => {
    if (this._containerRef) {
      // 销毁指定容器内的所有React节点
      ReactDOM.unmountComponentAtNode(this._containerRef)
    }
    if (this._currentNodeRef) {
      this._currentNodeRef.remove()
    }

    this._currentNodeRef = null
    this._containerRef = null
    CurrentLoadingBar = null
  }

  clearTimer = () => {
    if (this._timer) {
      // console.log('清除定时')
      clearInterval(this._timer)
      this._timer = null
    }
  }

  componentWillUnmount() {
    // console.log('组件销毁')
    this.clearTimer()
  }

  render() {
    const { currentBgColor, percent } = this.state
    return (
      <Fragment>
        <div
          style={{ transform: `translate3d(${percent}%, 0px, 0px)` }}
          className={`zh-loadingBar__progress zh-loadingBar--${currentBgColor}`}
        >
          <div className="zh-loadingBar__peg"></div>
        </div>
        <div className="zh-loadingBar__icon-wrapper">
          <div className={`zh-loadingBar__icon zh-loadingBar__icon--${currentBgColor}`}></div>
        </div>
      </Fragment>
    )
  }
}

export default LoadingBar
