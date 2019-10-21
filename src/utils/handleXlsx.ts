import XLSX from 'xlsx'

interface IXlsxOptions {
  _headers: Array<string>
  _data: Array<any>
  fileName?: string
}

/**
 * 根据数据导出excel
 */
const handleXlsx = ({ _headers, _data, fileName }: IXlsxOptions) => {
  const headers = _headers
    .map((v, i) => {
      return Object.assign({}, { v: v, position: String.fromCharCode(65 + i) + 1 })
    })
    .reduce((prev, next) => Object.assign({}, prev, { [next.position]: { v: next.v } }), {})
  const data = _data
    .map((v, i) =>
      _headers.map((k, j) =>
        Object.assign({}, { v: v[k], position: String.fromCharCode(65 + j) + (i + 2) })
      )
    )
    .reduce((prev, next) => prev.concat(next))
    .reduce((prev, next) => Object.assign({}, prev, { [next.position]: { v: next.v } }), {})
  // 合并 headers 和 data
  const output = Object.assign({}, headers, data)
  // 获取所有单元格的位置
  const outputPos = Object.keys(output)
  // 计算出范围
  const ref = outputPos[0] + ':' + outputPos[outputPos.length - 1]

  // 构建 workbook 对象
  const workbook = {
    SheetNames: ['Sheet'],
    Sheets: {
      Sheet: Object.assign({}, output, { '!ref': ref })
    }
  }
  // 导出 Excel
  return XLSX.writeFile(workbook, `${fileName || 'download'}.xlsx`)
}
export default handleXlsx
