import * as express from 'express'
import * as path from 'path'

import api from './api'

const router = express.Router()

router.get('/', (req, res) => {
  res.send('hello world')
})

router.use('/api', api)

router.get('/admin/*', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../../public/admin/index.html'))
})

// 未匹配到的路由都返回这个页面，path 路径模式
router.get('/*', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../../public/client/index.html'))
})

export default router
