import * as express from 'express'

import api from './api'

const router = express.Router()

router.get('/', (req, res) => {
  res.send('hello world')
})

router.use('/api', api)

export default router
