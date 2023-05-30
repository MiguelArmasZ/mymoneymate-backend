import { Router } from 'express'
import {
  signIn,
  confirmAccount,
  logIn,
  forgotPassword,
  checkToken,
  newPassword,
  getProfile
} from '../controllers/user'
import { checkAuth } from '../middlewares'

export const userRouter = Router()

userRouter.post('/', signIn)
userRouter.get('/confirm/:token', confirmAccount)
userRouter.post('/log-in', logIn)
userRouter.post('/forgot-password', forgotPassword)
userRouter.route('/forgot-password/:token').get(checkToken).post(newPassword)

userRouter.get('/profile', checkAuth, getProfile)
