import * as React from 'react'
import withBreadcrumb from '@/hoc/withBreadcrumb'
import Draggable from '@/components/Draggable'
import './drag.less'

const dragWrapperCss: React.CSSProperties = {
  width: '300px',
  height: '300px',
  border: '1px solid red'
}

const DragAblePage = () => {
  return (
    <div className="drag-wrapper" style={dragWrapperCss}>
      <Draggable trigger=".drag-wrapper" isRange>
        {(getRef, { style }) => (
          <div className="dragDom" ref={(ref) => getRef<HTMLDivElement | null>(ref)} {...style}>
            拖拽
          </div>
        )}
      </Draggable>
    </div>
  )
}

export default withBreadcrumb([
  {
    title: '拖拽组件'
  }
])(DragAblePage)
