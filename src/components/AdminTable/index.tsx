import * as React from 'react'
import { Table, Button } from 'antd'
import { ColumnProps } from 'antd/es/table'
import exportExcel from '@/utils/exportExcel'

interface GlobalTableProp<T> {
  columns: ColumnProps<T>[]
  dataSource: T[]
  /**
   * 是否需要导出Excel
   */
  isExport?: boolean
}

/**
 * 表格拦截
 */
const AdminTable = <T extends { key?: any }>(props: GlobalTableProp<T>) => {
  const { dataSource, columns, isExport } = props

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

  const newDataSource = setDataSourceKey(dataSource)

  return (
    <React.Fragment>
      {isExport ? (
        <div style={{ margin: '10px 0' }} className="clearfix">
          <Button
            className="pull-right"
            type="primary"
            onClick={handleExport}
            disabled={newDataSource.length === 0}
          >
            导出当前页
          </Button>
        </div>
      ) : null}
      <Table bordered columns={columns} dataSource={newDataSource} />
    </React.Fragment>
  )
}

export default AdminTable
