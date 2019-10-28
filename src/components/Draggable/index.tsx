import * as React from 'react'
import ReactDom from 'react-dom'

export interface DraggableProps {

}

interface IState {
  pageX: number
  pageY: number
  transformX: number
  transformY: number
  canMove: boolean
  style: React.CSSProperties
}

class Draggable extends React.Component<IState, DraggableProps> {
  currentDargDom = null
  triggerDom = null

  state: IState = {
    pageX: 0,
    pageY: 0,
    transformX: 0,
    transformY: 0,
    canMove: false,
    style: {
      transform: 'translate(0px, 0px)',
      cursor: 'move',
      transition: 'none'
    }
  }

  // 拖拽范围的 top left right bottom 参数
  domRangParams = {
    triggerWidth: 0,
    dragWidth: 0,
    triggerHeight: 0,
    dragHeight: 0
  }

  shouldComponentUpdate(nextProps: DraggableProps, nextState: IState) {
    return nextState !== this.state || JSON.stringify(nextProps) !== JSON.stringify(this.props)
  }

  componentDidMount() {
    this.onDragStart()
  }

  componentWillUnmount() {
    this.currentDargDom.removeEventListener('mousedown', this.handleMousedown)
    this.triggerDom.removeEventListener('mousemove', this.handleMousemove)
    this.triggerDom.removeEventListener('mouseup', this.handleMouseup)
  }

  handleMousedown = (e) => {
    let transform = /\(.*\)/.exec(this.currentDargDom.style.transform)

    if (transform !== null) {
      transform = transform[0].slice(1, transform[0].length - 1)
      const splitXY = transform.split('px, ')

      this.setState({
        transformX: parseFloat(splitXY[0]),
        transformY: parseFloat(splitXY[1].split('px')[0])
      })
    }

    this.setState((prevState) => {
      return {
        pageX: e.pageX,
        pageY: e.pageY,
        canMove: true,
        style: Object.assign({}, prevState.style, {
          transition: 'none'
        })
      }
    })

    this.triggerDom.addEventListener('mousemove', this.handleMousemove)
    this.triggerDom.addEventListener('mouseup', this.handleMouseup)

    this.initTriggerDomRang()
  }

  handleMousemove = (e) => {
    const { pageX, transformX, pageY, transformY, canMove } = this.state

    let xOffset = e.pageX - pageX + transformX
    let yOffset = e.pageY - pageY + transformY

    if (this.props.isRange) {
      if (xOffset < 0) {
        xOffset = 0
      } else if (xOffset > this.domRangParams.triggerWidth - this.domRangParams.dragWidth) {
        xOffset = this.domRangParams.triggerWidth - this.domRangParams.dragWidth
      }

      if (yOffset < 0) {
        yOffset = 0
      } else if (yOffset > this.domRangParams.triggerHeight - this.domRangParams.dragHeight) {
        yOffset = this.domRangParams.triggerHeight - this.domRangParams.dragHeight
      }
    }

    if (canMove) {
      this.setState((prevState) => {
        return {
          style: Object.assign({}, prevState.style, {
            transform: `translate(${xOffset}px, ${yOffset}px)`
          })
        }
      })
    }

    this.props.onDragMoving(e)
  }

  handleMouseup = (e) => {
    this.triggerDom.removeEventListener('mousemove', this.handleMousemove)
    this.triggerDom.removeEventListener('mouseup', this.handleMouseup)

    this.setState((prevState) => {
      const newStyle = JSON.parse(JSON.stringify(prevState.style))
      delete newStyle.transition

      return {
        style: newStyle
      }
    })

    this.props.onDragEnd(e)
  }

  onDragStart = () => {
    if (!this.currentDargDom) {
      console.warn('dom不存在！')
      return
    }
    // 拖拽区域dom
    this.triggerDom = this.props.trigger ? document.querySelector(this.props.trigger) : document
    // 绑定事件
    this.currentDargDom.addEventListener('mousedown', this.handleMousedown)
  }

  initTriggerDomRang = () => {
    this.domRangParams = {
      triggerWidth: this.triggerDom.clientWidth || this.triggerDom.documentElement.clientWidth,
      dragWidth: this.currentDargDom.offsetWidth,
      triggerHeight: this.triggerDom.clientHeight || this.triggerDom.documentElement.clientHeight,
      dragHeight: this.currentDargDom.offsetHeight
    }
  }

  /* 获取dom */
  getRef = (ref) => {
    this.currentDargDom = ReactDom.findDOMNode(ref)
  }

  render() {
    const { children } = this.props
    const { style } = this.state

    return children(this.getRef, {
      style: { style }
    })
  }
}

export default Draggable
