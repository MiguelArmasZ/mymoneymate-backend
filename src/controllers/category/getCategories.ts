import { type Response } from 'express'
import { CategoryModel } from '../../models/Category'
import { type MyRequest } from '../../types'
import { thrwoError } from '../../helpers'

export async function getCategories(
  req: MyRequest,
  res: Response
): Promise<void> {
  const user = req.userLogged

  try {
    const categories = await CategoryModel.find(
      { owner: user?.id },
      { name: 1, kind: 1, owner: 1 }
    )
    res.json(categories)
  } catch (error: any) {
    console.error(`El error obteniendo las categorías es: ${error}`)
    thrwoError(res, 400, error)
  }
}
