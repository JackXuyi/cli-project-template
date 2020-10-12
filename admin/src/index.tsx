import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import 'antd/dist/antd.less'

import App from './app'
import './style/index.less'

ReactDOM.render(
  <BrowserRouter>
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
  </BrowserRouter>,
  document.getElementById('root'),
)
