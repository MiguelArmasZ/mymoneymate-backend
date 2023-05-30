import { type Response } from 'express'
import { type MyRequest } from '../../types'
import { CategoryModel } from '../../models/Category'
import { thrwoError, thrwoSuccess } from '../../helpers'
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../../data'

export async function deleteCategory(
  req: MyRequest,
  res: Response
): Promise<any> {
  const { id: _id } = req.params

  const categoryExisting = await CategoryModel.findOne({ _id })

  if (categoryExisting === null) {
    return thrwoError(res, 404, ERROR_MESSAGES.CATEGORY_DOES_NOT_EXIST)
  }

  try {
    await categoryExisting.deleteOne()
    thrwoSuccess(res, 200, SUCCESS_MESSAGES.CATEGORY_DELETED)
  } catch (error: any) {
    console.error(`El error eliminando la categoría es: ${error}`)
    thrwoError(res, 400, error)
  }
}
