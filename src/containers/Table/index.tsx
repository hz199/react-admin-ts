import * as React from 'react'
import withBreadcrumb from '@/hoc/withBreadcrumb'
import { Divider } from 'antd'
import AdminTable from '@/components/AdminTable'
import { ColumnProps } from 'antd/es/table'

interface ITableProps {}

interface TestTableMap {
  key?: any
  name: string
  age: number
  address: string
}

const TableColumns: ColumnProps<TestTableMap>[] = [
  {
    title: 'name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>
  },
  {
    title: 'age',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: 'address',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <a>Invite {record.name}</a>
        <Divider type="vertical" />
        <a>Delete</a>
      </span>
    )
  }
]

const TableData: TestTableMap[] = [
  {
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park'
  },
  {
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park'
  },
  {
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park'
  }
]

class TablePage extends React.PureComponent<ITableProps> {
  render() {
    return (
      <div>
        <AdminTable<TestTableMap> isExport columns={TableColumns} dataSource={TableData} />
      </div>
    )
  }
}

export default withBreadcrumb([
  {
    title: '导出Excel表格'
  }
])(TablePage)
