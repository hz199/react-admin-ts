import * as React from 'react'
import { Comment, Tooltip, List, Tag, Avatar } from 'antd'

const liStyle: React.CSSProperties = {
  borderBottom: '1px solid #f4f4f4',
  cursor: 'pointer'
}

interface IProps<T> {
  dataSource: Array<T>
}

const CommentList = <T extends any>(props: IProps<T>) => {
  const data = props.dataSource.map((item) => {
    return {
      actions: [
        <Tag color="orange" key={item.actions}>
          {item.actions}
        </Tag>
      ],
      author: item.author,
      avatar: <Avatar>{item.author.split('')[0]}</Avatar>,
      content: <p>{item.content}</p>,
      datetime: (
        <Tooltip title={item.datetime}>
          <span>{item.datetime}</span>
        </Tooltip>
      )
    }
  })

  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item) => (
        <li style={liStyle}>
          <Comment
            actions={item.actions}
            author={item.author}
            avatar={item.avatar}
            content={item.content}
            datetime={item.datetime}
          />
        </li>
      )}
    ></List>
  )
}

export default CommentList
