import * as React from 'react'
import { Button } from 'antd'
import LoadingBar from '@/components/LoadingBar'
import withBreadcrumb from '@/hoc/withBreadcrumb'

const LoadingBarPage = () => {
  const handleClickStart = () => {
    LoadingBar.start()
  }

  const handleClickFinish = () => {
    LoadingBar.finish()
  }

  const handleClickError = () => {
    LoadingBar.error()
  }

  return (
    <div>
      <Button onClick={handleClickStart}>点击start</Button>
      <Button onClick={handleClickFinish}>点击finish</Button>
      <Button onClick={handleClickError}>点击error</Button>
    </div>
  )
}

export default withBreadcrumb([
  {
    title: 'LoadingBar'
  }
])(LoadingBarPage)
