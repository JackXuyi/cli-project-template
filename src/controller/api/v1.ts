import * as express from 'express'

import TestService from '../../service/test.service'

const router = express.Router()

router.get('/test', async (req, res) => {
  const data = await TestService.getTestData()
  res.json(data)
})

export default router
