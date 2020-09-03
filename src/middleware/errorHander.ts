import { Request, Response, NextFunction } from 'express'
export default function (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('invalid token...')
  } else {
    res.status(501).send('server error')
  }
}
