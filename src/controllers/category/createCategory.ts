import { type Response } from 'express'
import { type ICategory, type MyRequest } from '../../types'
import { CategoryModel } from '../../models/Category'
import { thrwoError } from '../../helpers'
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../../data'

export async function createCategory(
  req: MyRequest,
  res: Response
): Promise<any> {
  const { name, kind }: ICategory = req.body
  const userLogged = req.userLogged

  const existingCategory = await CategoryModel.findOne({
    name,
    owner: userLogged?.id
  })

  const creatorOfCategory = existingCategory?.owner.toString()
  const idUserLogged = userLogged?.id

  if (creatorOfCategory === idUserLogged && existingCategory !== null) {
    return thrwoError(res, 400, ERROR_MESSAGES.CATEGORY_ALREADY_EXISTS)
  }

  const newCategory = new CategoryModel({ name, kind, owner: userLogged?.id })

  try {
    await newCategory.save()
    const { _id, kind, name } = newCategory
    res.json({
      msg: SUCCESS_MESSAGES.CATEGORY_CREATED,
      newCategory: { _id, kind, name }
    })
  } catch (error: any) {
    console.error(
      `El error al momento de crear una nueva categoría es: ${error}`
    )
    thrwoError(res, 400, error)
  }
}
