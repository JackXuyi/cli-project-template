import React from 'react'
import { Layout } from 'antd'
import { ToolOutlined } from '@ant-design/icons'
import cn from 'classnames'

import './index.less'

const { Header } = Layout

interface IProps {
  children: any
}

const CompLayout = (props: IProps) => {
  const { children } = props
  return (
    <Layout className={cn('layout')}>
      <Header className={cn('layout-header')}>
        <ToolOutlined className={cn('layout-icon')} />
        涂鸦工具平台
      </Header>
      <Layout className={cn('layout-body')}>{children}</Layout>
    </Layout>
  )
}

export default CompLayout
