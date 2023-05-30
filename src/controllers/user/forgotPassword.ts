import { type Request, type Response } from 'express'
import { type ForgotPasswordParams } from '../../types'
import { UserModel } from '../../models/User'
import {
  forgotPasswordEmail,
  generateToken,
  thrwoError,
  thrwoSuccess
} from '../../helpers'
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../../data'

export async function forgotPassword(
  req: Request,
  res: Response
): Promise<any> {
  const { email }: ForgotPasswordParams = req.body

  const existingUser = await UserModel.findOne({ email })
  if (existingUser === null) {
    return thrwoError(res, 404, ERROR_MESSAGES.USER_DOES_NOT_EXIST)
  }

  try {
    existingUser.token = generateToken()
    await existingUser.save()
    thrwoSuccess(res, 200, SUCCESS_MESSAGES.EMAIL_TO_FORGOT_PASSWORD)

    void forgotPasswordEmail({
      email: existingUser.email,
      userName: existingUser.userName,
      token: existingUser.token
    })
  } catch (error: any) {
    console.error(`El error al momento de restaurar la contraseña es: ${error}`)
    thrwoError(res, 400, error)
  }
}
