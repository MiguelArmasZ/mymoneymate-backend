import { type Response } from 'express'
import { type MyRequest } from '../../types'

export async function getProfile(req: MyRequest, res: Response): Promise<any> {
  res.json(req.userLogged)
}
