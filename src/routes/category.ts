import { Router } from 'express'
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory
} from '../controllers/category'
import { checkAuth } from '../middlewares'

export const categoryRouter = Router()

categoryRouter
  .route('/')
  .post(checkAuth, createCategory)
  .get(checkAuth, getCategories)

categoryRouter
  .route('/:id')
  .put(checkAuth, updateCategory)
  .delete(checkAuth, deleteCategory)
