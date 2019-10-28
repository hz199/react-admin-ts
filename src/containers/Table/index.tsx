import * as React from 'react'
import withBreadcrumb from '@/hoc/withBreadcrumb'
import { Divider } from 'antd'
import AdminTable from '@/components/AdminTable'
import { ColumnProps } from 'antd/es/table'
import { connect } from 'react-redux'
import { actionTypes, actionCreators } from '@/redux/modules/table'
import { RootState } from '@/redux/Types'
import { ThunkDispatch } from 'redux-thunk'

interface ITableProps {
  getBaseTableData: (F: object) => void
  baseTableData: actionTypes.ITableData[]
}

const TableColumns: ColumnProps<actionTypes.ITableData>[] = [
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

class TablePage extends React.PureComponent<ITableProps> {
  componentDidMount() {
    this.props.getBaseTableData({ currentPage: 1 })
  }

  render() {
    const { baseTableData } = this.props

    return (
      <div>
        <AdminTable<actionTypes.ITableData>
          isExport
          columns={TableColumns}
          dataSource={baseTableData}
        />
      </div>
    )
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    baseTableData: state.table.baseTableData
  }
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<actionTypes.ITableState, void, actionTypes.TableActions>
) => {
  return {
    getBaseTableData: async (payload: object) => {
      dispatch(actionCreators.tableDataAxios(payload))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withBreadcrumb([
    {
      title: '导出Excel表格'
    }
  ])(TablePage)
)
