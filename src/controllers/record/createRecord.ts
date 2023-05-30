import { type Response } from 'express'
import { type IRecord, type MyRequest } from '../../types'
import { RecordModel } from '../../models/Record'
import { thrwoError, thrwoSuccess } from '../../helpers'
import { SUCCESS_MESSAGES } from '../../data'

export async function createRecord(
  req: MyRequest,
  res: Response
): Promise<any> {
  const { kind, amount, category, concept, date }: IRecord = req.body
  const userLogged = req.userLogged

  const newRecord = new RecordModel({
    kind,
    amount,
    category,
    concept,
    date,
    owner: userLogged?.id
  })

  try {
    await newRecord.save()
    thrwoSuccess(res, 200, SUCCESS_MESSAGES.RECORD_CREATED)
  } catch (error: any) {
    console.error(`El error creando un registro es: ${error}`)
    thrwoError(res, 400, error)
  }
}
