import { type Response } from 'express'
import { type MyRequest } from '../../types'
import { RecordModel } from '../../models/Record'
import { thrwoError } from '../../helpers'

export async function getRecords(req: MyRequest, res: Response): Promise<any> {
  try {
    const records = await RecordModel.find(
      { owner: req.userLogged?.id },
      { category: 1, amount: 1, concept: 1, date: 1, kind: 1 }
    )

    res.send(records)
  } catch (error: any) {
    console.error(`El error obteniendo los registros es: ${error}`)
    thrwoError(res, 400, error)
  }
}
