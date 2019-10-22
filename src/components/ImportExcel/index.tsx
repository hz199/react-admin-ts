import * as React from 'react'
import { Button } from 'antd'
import ImportExcel from '@/utils/importExcel'
import './index.less'

interface IProps<T> {
  onCallback: (value: T[]) => void
}

const ImportTable = <T extends {}>(props: IProps<T>) => {
  const { onCallback } = props
  const [isLoading, updateLoading] = React.useState<boolean>(false)

  const inputRef = React.useRef<HTMLInputElement>(null)
  return (
    <React.Fragment>
      <Button loading={isLoading} type="primary" icon="cloud-upload">
        选择excel
        <input
          accept=".xlsx"
          className="import-excel-input"
          ref={inputRef}
          type="file"
          onChange={() => {
            updateLoading(true)
            ImportExcel<T>(inputRef.current!).then((res) => {
              onCallback(res)
              updateLoading(false)
            })
          }}
        ></input>
      </Button>
    </React.Fragment>
  )
}

export default ImportTable
