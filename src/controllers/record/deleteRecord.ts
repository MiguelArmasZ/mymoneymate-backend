import { type Response } from 'express'
import { type MyRequest } from '../../types'
import { RecordModel } from '../../models/Record'
import { thrwoError, thrwoSuccess } from '../../helpers'
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../../data'

export async function deleteRecord(
  req: MyRequest,
  res: Response
): Promise<any> {
  const { id: _id } = req.params

  const recordExisting = await RecordModel.findOne({ _id })

  if (recordExisting === null) {
    return thrwoError(res, 404, ERROR_MESSAGES.RECORD_DOES_NOT_EXIST)
  }

  try {
    await recordExisting.deleteOne()
    thrwoSuccess(res, 200, SUCCESS_MESSAGES.RECORD_DELETED)
  } catch (error: any) {
    console.error(`El error eliminando el registro es: ${error}`)
    thrwoError(res, 400, error)
  }
}
