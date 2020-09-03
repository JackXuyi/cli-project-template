import * as express from 'express'
import * as jwt from 'express-jwt'

import v1 from './v1'
import pub from './public'

const router = express.Router()

// jwt
router.use(
  jwt({
    secret: 'test',
    algorithms: ['RS256'],
    getToken: function fromHeaderOrQuerystring(req) {
      if (req.headers.token) {
        return req.headers.token
      } else if (req.query && req.query.token) {
        return req.query.token
      }
      return null
    },
  }).unless({ path: [/^\/api\/public/] }),
)

router.use('/v1', v1)
router.use('/public', pub)

export default router
