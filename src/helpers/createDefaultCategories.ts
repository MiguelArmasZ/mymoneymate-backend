import type mongoose from 'mongoose'
import { CategoryModel } from '../models/Category'
import { type ICategory } from '../types'

export function createDefaultCategories(
  categories: ICategory[],
  id: mongoose.Types.ObjectId
): void {
  categories.forEach(async ({ kind, name }) => {
    const categoriesByDefault = new CategoryModel({
      owner: id,
      kind,
      name
    })

    await categoriesByDefault.save()
  })
}
