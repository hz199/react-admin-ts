import React, { Component, Fragment } from 'react'
// import ReactDOM from 'react-dom'
import './index.less'

// 变量接收上次的 LoadingBar
let currentLoadingBar: LoadingBar | null= null
// 动画结束后 销毁组件的间隔
let duration: number = 800

interface IState {
  currentBgColor: string
  percent: number
}

export default class LoadingBar extends Component<{}, IState> {
  state: IState = {
    currentBgColor: 'primary',
    percent: -100
  }

  render() {
    const { currentBgColor, percent } = this.state
    return (
      <Fragment>
        <div
          style={{transform: `translate3d(${percent}%, 0px, 0px)`}}
          className={`zh-loadingBar__progress zh-loadingBar--${currentBgColor}`}>
          <div className="zh-loadingBar__peg"></div>
        </div>
        <div className="zh-loadingBar__icon-wrapper">
          <div className={`zh-loadingBar__icon zh-loadingBar__icon--${currentBgColor}`}></div>
        </div>
      </Fragment>
    )
  }
}
