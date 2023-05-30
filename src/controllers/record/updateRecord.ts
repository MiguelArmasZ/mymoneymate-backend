import { type Response } from 'express'
import { type MyRequest } from '../../types'

export async function updateRecord(
  _req: MyRequest,
  res: Response
): Promise<any> {
  res.send('actualizando un registro...')
}
