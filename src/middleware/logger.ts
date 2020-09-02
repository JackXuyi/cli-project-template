import { Request, Response, NextFunction } from 'express'

import { log } from '../utils/log'

function logger(req: Request, res: Response, next: NextFunction) {
  const { query, params, body, originalUrl } = req
}

export default logger
