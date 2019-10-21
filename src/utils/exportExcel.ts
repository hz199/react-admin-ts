import handleXlsx from './handleXlsx'
import { pick, mapKeys } from 'lodash'

interface IXlsxWorkOptions<T> {
  dataSource: T[]
  // 只是包含 key: title
  columnsMap: { [key: string]: string }
  header: string[]
  fileName?: string
}

/**
 * excel导出
 */
const handleXlsxWork = async <T>({
  dataSource,
  columnsMap,
  header,
  fileName
}: IXlsxWorkOptions<T>) => {
  /* 挑选出信息 */
  const XlsxData = dataSource.map((item) => {
    return pick(item, header)
  })

  if (XlsxData.length <= 0) {
    console.warn('导出的数据为空，请检查！')
    return
  }

  /* 获取xlsx头 */
  const XlsxHeader = header.map((item) => {
    return columnsMap[item]
  })
  /* 重新组合Data */
  const newXlsxData = XlsxData.map((item) => {
    return mapKeys(item, (value, key) => {
      return columnsMap[key]
    })
  })

  /* 生成表格 */
  return await handleXlsx({ _headers: XlsxHeader, _data: newXlsxData, fileName })
}

export default handleXlsxWork
