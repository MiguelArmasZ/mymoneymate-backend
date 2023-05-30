import { type Response } from 'express'
import { type MyRequest } from '../../types'
import { CategoryModel } from '../../models/Category'
import { thrwoError } from '../../helpers'
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../../data'

export async function updateCategory(
  req: MyRequest,
  res: Response
): Promise<any> {
  const { id: _id } = req.params
  const { name } = req.body

  const categoryExisting = await CategoryModel.findOne({ _id })

  if (categoryExisting === null) {
    return thrwoError(res, 404, ERROR_MESSAGES.CATEGORY_DOES_NOT_EXIST)
  }

  try {
    categoryExisting.name = name
    await categoryExisting.save()
    const { _id, kind } = categoryExisting
    res.json({
      msg: SUCCESS_MESSAGES.CATEGORY_UPDATED,
      categoryUpdated: { _id, kind, name }
    })
  } catch (error: any) {
    console.error(`El error actualizando la categoría es: ${error}`)
  }
}
