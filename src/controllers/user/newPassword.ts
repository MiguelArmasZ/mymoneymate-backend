import { type Request, type Response } from 'express'
import { type CheckTokenParams, type NewPasswordParams } from '../../types'
import { UserModel } from '../../models/User'
import { hashingPassword, thrwoError, thrwoSuccess } from '../../helpers'
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../../data'

export async function newPassword(req: Request, res: Response): Promise<any> {
  const { password }: NewPasswordParams = req.body
  const { token } = req.params as CheckTokenParams

  const existingUser = await UserModel.findOne({ token }, { email: 1 })

  if (existingUser === null) {
    return thrwoError(res, 404, ERROR_MESSAGES.USER_DOES_NOT_EXIST)
  }

  try {
    existingUser.password = await hashingPassword(password)
    existingUser.token = ''
    await existingUser.save()
    thrwoSuccess(res, 200, SUCCESS_MESSAGES.PASSWORD_UPDATED)
  } catch (error: any) {
    console.error(
      `El error al momento de definir una nueva contraseña es: ${error}`
    )
    thrwoError(res, 400, error)
  }
}
