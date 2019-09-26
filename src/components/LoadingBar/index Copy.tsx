import React, { Fragment, useState } from 'react'
import ReactDOM from 'react-dom'
import './index.less'

type CurrentBgColor = 'primary' | 'error' | 'success'

interface IState {
  percent: number
  currentBgColor: CurrentBgColor
}

const LoadingBar = function() {
  const [LoadingBarState] = useState<IState>({
    percent: -100,
    currentBgColor: 'primary'
  })

  const { percent, currentBgColor } = LoadingBarState
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

const LoadingBarInstance = {
  currentElement: {},
  renderElement: function() {
    const container = document.createElement('div')
    container.className = 'zh-loadingBar'
    const currentNode = document.body.appendChild(container)
    const _loadingBar = ReactDOM.render(<LoadingBar />, container)
    this.currentElement._loadingBar = _loadingBar
    return currentNode
  }
}

LoadingBarInstance.renderElement()
console.log(LoadingBarInstance)

export default LoadingBar
