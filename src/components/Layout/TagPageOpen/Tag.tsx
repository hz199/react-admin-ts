import * as React from 'react'
import { Icon } from 'antd'
import PropTypes from 'prop-types'

interface IProps {
  closable?: boolean
  color?: string
  onRef?: (tag: HTMLDivElement | null) => void
  onClose?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onPress?: () => void
}

// type A = Required<IProps>

const Tag: React.FunctionComponent<IProps> = (props) => {
  return (
    <div
      className="zh-tag"
      ref={(tag) => {
        if (props.color === 'primary' && !!tag && props.onRef) {
          props.onRef(tag)
        }
      }}
    >
      <span className={`zh-tag__dot zh-tag__dot--${props.color ? props.color : 'default'}`}></span>
      <span className="zh-tag__text">{props.children}</span>
      {!props.closable ? (
        <Icon
          onClick={(e) => {
            e.stopPropagation()
            props.onClose && props.onClose(e)
          }}
          className="zh-tag__close"
          type="close"
        />
      ) : null}
    </div>
  )
}

// Tag.defaultProps = {
//   closable: true,
//   color: 'default',
//   onRef: () => {},
//   onClose: () => {},
//   onPress: () => {}
// }

Tag.propTypes = {
  closable: PropTypes.bool,
  color: PropTypes.oneOf(['default', 'primary']),
  onRef: PropTypes.func,
  onClose: PropTypes.func,
  onPress: PropTypes.func
  // children: PropTypes.node
}

export default Tag
