import * as React from 'react'
import { Icon } from 'antd'
import PropTypes from 'prop-types'

interface IProps {
  closable?: boolean
  color?: string
  routerPath?: string
  onCurrentRef?: (tag: HTMLDivElement | null) => void
  onClose?: (path: string) => void
  onPress?: (P: string) => void
}

// type A = Required<IProps>

const Tag: React.FunctionComponent<IProps> = (props) => {
  return (
    <div
      className="zh-tag"
      onClick={() => {
        props.onPress && props.onPress(props.routerPath!)
      }}
      ref={(tag) => {
        if (props.color === 'primary' && !!tag && props.onCurrentRef) {
          props.onCurrentRef(tag)
        }
      }}
    >
      <span className={`zh-tag__dot zh-tag__dot--${props.color ? props.color : 'default'}`}></span>
      <span className="zh-tag__text">{props.children}</span>
      {!props.closable ? (
        <Icon
          onClick={(e) => {
            e.stopPropagation()
            props.onClose && props.onClose(props.routerPath!)
          }}
          className="zh-tag__close"
          type="close"
        />
      ) : null}
    </div>
  )
}

Tag.propTypes = {
  closable: PropTypes.bool,
  routerPath: PropTypes.string,
  color: PropTypes.oneOf(['default', 'primary']),
  onCurrentRef: PropTypes.func,
  onClose: PropTypes.func,
  onPress: PropTypes.func
}

export default Tag
