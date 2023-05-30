import { type Response } from 'express'

export function thrwoSuccess(
  res: Response,
  status: number,
  msg: string
): object {
  return res.status(status).json({ msg })
}

export function thrwoError(res: Response, status: number, msg: string): object {
  const error = new Error(msg)
  return res.status(status).json({ msg: error.message })
}
