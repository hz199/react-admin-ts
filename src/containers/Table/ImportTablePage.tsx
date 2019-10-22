import * as React from 'react'
import ImportExcel from '@/components/ImportExcel'
import withBreadcrumb from '@/hoc/withBreadcrumb'
import { Divider } from 'antd'
import AdminTable from '@/components/AdminTable'
import { ColumnProps } from 'antd/es/table'

interface ImportExcelOptions {
  name: string
  age: string
  address: string
  key?: any
}

const TableColumns: ColumnProps<ImportExcelOptions>[] = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: '地址',
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

const ImportTable: React.FunctionComponent = () => {
  const [TableData, setTableData] = React.useState<ImportExcelOptions[]>([])

  const handleCallback = (data: ImportExcelOptions[]) => {
    setTableData(data)
  }

  return (
    <div>
      <ImportExcel<ImportExcelOptions> onCallback={handleCallback} />

      <AdminTable<ImportExcelOptions> columns={TableColumns} dataSource={TableData} />
    </div>
  )
}

export default withBreadcrumb([
  {
    title: '导入Excel表格'
  }
])(ImportTable)
