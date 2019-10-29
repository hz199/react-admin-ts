import * as React from 'react'
import ImportExcel from '@/components/ImportExcel'
import withBreadcrumb from '@/hoc/withBreadcrumb'
import { Divider } from 'antd'
import AdminTable from '@/components/AdminTable'
import { ColumnProps } from 'antd/es/table'

interface ImportExcelOptions {
  nameEN: string
  nameCN: string
  county: string
  timer: string
  key: string
}

const TableColumns: ColumnProps<ImportExcelOptions>[] = [
  {
    title: 'nameCN',
    dataIndex: 'nameCN',
    key: 'nameCN'
  },
  {
    title: 'nameEN',
    dataIndex: 'nameEN',
    key: 'nameEN'
  },
  {
    title: 'county',
    dataIndex: 'county',
    key: 'county'
  },
  {
    title: 'timer',
    dataIndex: 'timer',
    key: 'timer'
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <a>{record.nameCN}</a>
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
