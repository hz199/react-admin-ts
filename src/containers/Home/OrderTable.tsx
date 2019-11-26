import React, { Fragment } from 'react'
import { Table, Tag } from 'antd'
import { ColumnProps } from 'antd/es/table'
import { formatMoney } from '@/utils/common'

interface IProps<T> {
  dataSource: Array<T>
}

const OrderTable = <T extends {}>(props: IProps<T>) => {
  const tableColumns: ColumnProps<T>[] = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      align: 'center'
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (status) => {
        const statusMap: {
          [key: number]: { color: string; text: string }
        } = {
          1: {
            color: 'geekblue',
            text: '会员一'
          },
          2: {
            color: 'green',
            text: '会员二'
          },
          3: {
            color: 'red',
            text: '会员三'
          }
        }

        return <Tag color={statusMap[status].color}>{statusMap[status].text}</Tag>
      }
    },
    {
      title: '价格',
      dataIndex: 'prize',
      key: 'prize',
      align: 'center',
      render: (prize: number) => {
        return formatMoney(prize)
      }
    },
    {
      title: '时间',
      dataIndex: 'timer',
      key: 'timer',
      align: 'center'
    }
  ]

  return (
    <Fragment>
      <Table<T> pagination={false} columns={tableColumns} dataSource={props.dataSource}></Table>
    </Fragment>
  )
}

export default React.memo(OrderTable)
