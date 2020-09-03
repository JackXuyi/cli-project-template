import * as express from 'express'

const router = express.Router()

router.get('/test', async (req, res) => {
  res.send('ok')
})

export default router
