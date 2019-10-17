import * as React from 'react'
import withBreadcrumb from '@/hoc/withBreadcrumb'

interface ITableProps {}

class Table extends React.PureComponent<ITableProps> {
  render() {
    return <div>Table111</div>
  }
}

export default withBreadcrumb([
  {
    title: '基础表格'
  }
])(Table)
