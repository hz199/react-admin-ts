import * as React from 'react'
// import LoadingBar from '@/components/LoadingBar'
import withBreadcrumb from '@/hoc/withBreadcrumb'

const DragAblePage = () => {
  return <div>DragAblePage</div>
}

export default withBreadcrumb([
  {
    title: '拖拽组件'
  }
])(DragAblePage)
