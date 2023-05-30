import { Router } from 'express'
import {
  createRecord,
  deleteRecord,
  getRecords,
  updateRecord
} from '../controllers/record'
import { checkAuth } from '../middlewares'

export const recordRouter = Router()

recordRouter.route('/').post(checkAuth, createRecord).get(checkAuth, getRecords)

recordRouter
  .route('/:id')
  .put(checkAuth, updateRecord)
  .delete(checkAuth, deleteRecord)
