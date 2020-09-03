import * as express from 'express'
import * as morgan from 'morgan'
import * as FileStreamRotator from 'file-stream-rotator'
import * as path from 'path'
import { createConnection } from 'typeorm'

import { log } from '@utils/log'
import Router from './controller'
import config from './config'

const logDirectory = path.join(__dirname, '../', 'log')
const port = 8000

const accessLogStream = FileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: path.join(logDirectory, 'access-%DATE%.log'),
  frequency: 'daily',
  verbose: false,
})

export default createConnection(config.db)
  .then(() => {
    const app = express()

    // 日志
    app.use(morgan('combined', { stream: accessLogStream }))

    app.use(Router)

    app.listen(port, () => {
      log(`Server is listening on http://localhost:${port}`)
    })
  })
  .catch((e) => {
    console.error('connection mysql error: ', e)
  })
