import * as express from 'express'
import * as morgan from 'morgan'
import * as FileStreamRotator from 'file-stream-rotator'
import * as path from 'path'

import { log } from '@utils/log'
import Router from './controller'

const logDirectory = path.join(__dirname, '../', 'log')

const accessLogStream = FileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: path.join(logDirectory, 'access-%DATE%.log'),
  frequency: 'daily',
  verbose: false,
})

const app = express()
const port = 8000

// 日志
app.use(morgan('combined', { stream: accessLogStream }))

app.use(Router)

app.listen(port, () => {
  log(`Server is listening on http://localhost:${port}`)
})
