import { type Request, type Response } from 'express'
import { UserModel } from '../../models/User'
import { type IUser } from '../../types'
import {
  createDefaultCategories,
  generateToken,
  hashingPassword,
  signInEmail,
  thrwoError,
  thrwoSuccess
} from '../../helpers'
import {
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  categoriesByDefaultData
} from '../../data'

export async function signIn(req: Request, res: Response): Promise<any> {
  const { email, password, userName }: IUser = req.body

  const newUser = new UserModel({
    userName,
    email,
    password: await hashingPassword(password)
  })

  const existingUser = await UserModel.findOne({ email }, { email: 1 })

  if (existingUser != null) {
    return thrwoError(res, 400, ERROR_MESSAGES.USER_ALREADY_EXISTS)
  }

  try {
    createDefaultCategories(categoriesByDefaultData, newUser._id)
    newUser.token = generateToken()
    await newUser.save()
    void signInEmail({ email, token: newUser.token, userName })
    thrwoSuccess(res, 200, SUCCESS_MESSAGES.EMAIL_TO_CONFIRM_ACCOUNT)
  } catch (error: any) {
    console.error(`El error a la hora de registrar un usuario es: ${error}`)
    thrwoError(res, 400, error)
  }
}
