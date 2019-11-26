import React from 'react'
import { Icon, Card } from 'antd'
import CountUp from 'react-countup'
import './index.less'

interface IProps {
  icon: string
  color: string
  title: string
  number: number
}

function NumberCard({ icon, color, title, number }: IProps) {
  return (
    <Card className="numberCard" bordered={false} bodyStyle={{ padding: 10 }}>
      <Icon className="iconWarp" style={{ color }} type={icon} />
      <div className="content">
        <p className="title">{title || '暂无标题'}</p>
        <p className="number">
          <CountUp start={0} end={number} duration={2.75} useEasing separator="," />
        </p>
      </div>
    </Card>
  )
}

export default React.memo(NumberCard)
