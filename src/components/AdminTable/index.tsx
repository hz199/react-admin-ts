import * as React from 'react'
import { Table, Button } from 'antd'
import { ColumnProps } from 'antd/es/table'
import exportExcel from '@/utils/exportExcel'

interface GlobalTableProp<T> {
  columns: ColumnProps<T>[]
  dataSource: T[]
}

/**
 * 表格拦截
 */
const AdminTable = <T extends { key?: any }>(props: GlobalTableProp<T>) => {
  const { dataSource, columns } = props

  const handleExport = () => {
    const newColumnsMap: any = {}
    let newHeaderKey: Array<string> = []

    columns.forEach((item) => {
      if (!!item.title && item.key !== 'action') {
        if (typeof item.key === 'string') {
          newColumnsMap[item.key] = item.title
        }
      }
    })

    newHeaderKey = Object.keys(newColumnsMap)
    // 导出数据调用
    exportExcel<T>({ dataSource, columnsMap: newColumnsMap, header: newHeaderKey })
  }

  /**
   * 不存在 key 则添加上 index
   */
  const setDataSourceKey = (params: T[]) => {
    return params.map((item, index) => {
      if (!item.key) {
        item.key = index
      }
      return item
    })
  }

  return (
    <React.Fragment>
      <div style={{ margin: '10px 0' }} className="clearfix">
        <Button className="pull-right" type="primary" onClick={handleExport}>
          导出当前页
        </Button>
      </div>
      <Table bordered columns={columns} dataSource={setDataSourceKey(dataSource)} />
    </React.Fragment>
  )
}

export default AdminTable
