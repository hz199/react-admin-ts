import * as React from 'react'
import { Table, Button } from 'antd'
import { ColumnProps, PaginationConfig } from 'antd/es/table'
import exportExcel from '@/utils/exportExcel'

interface GlobalTableProp<T> {
  columns: ColumnProps<T>[]
  dataSource: T[]
  /**
   * 如果 dataSource[i].key 没有提供，你应该使用 rowKey 来指定 dataSource 的主键
   */
  rowKey?: ((record: T, index: number) => string) | string
  /**
   * 额外的展开行
   */
  expandedRowRender?: (
    record: T,
    index: number,
    indent: number,
    expanded: boolean
  ) => React.ReactNode
  /**
   * 是否需要导出Excel
   */
  isExport?: boolean
  /**
   * 页码改变时回调
   */
  onPageChange?: (page: number, pageSize?: number | undefined) => void
  /**
   * 总页数
   */
  totalPage?: number
  /**
   * 是否显示页码
   */
  isShowPage?: boolean
}

/**
 * 表格拦截
 */
const AdminTable = <T extends {} = any>(props: GlobalTableProp<T>) => {
  const {
    dataSource,
    columns,
    isExport,
    onPageChange,
    totalPage,
    isShowPage,
    rowKey,
    expandedRowRender
  } = props
  const [isLoading, updateLoading] = React.useState<boolean>(false)

  const handleExport = () => {
    // 点击下载时 loading 状态
    updateLoading(true)
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
    exportExcel<T>({ dataSource, columnsMap: newColumnsMap, header: newHeaderKey }).then(() => {
      setTimeout(() => {
        updateLoading(false)
      }, 1000)
    })
  }

  // table 页码配置
  const PAGINATION: PaginationConfig = {
    total: totalPage || 0,
    showQuickJumper: true,
    onChange: onPageChange,
    showSizeChanger: true,
    onShowSizeChange: onPageChange
  }
  return (
    <React.Fragment>
      {isExport ? (
        <div style={{ margin: '10px 0' }} className="clearfix">
          <Button
            className="pull-right"
            type="primary"
            loading={isLoading}
            onClick={handleExport}
            disabled={dataSource.length === 0}
          >
            导出当前页
          </Button>
        </div>
      ) : null}
      <Table
        pagination={!isShowPage ? false : PAGINATION}
        bordered
        rowKey={rowKey}
        columns={columns}
        expandedRowRender={expandedRowRender}
        dataSource={dataSource}
      />
    </React.Fragment>
  )
}

export default AdminTable
