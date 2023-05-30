import { type Request, type Response } from 'express'
import { UserModel } from '../../models/User'
import { thrwoError, thrwoSuccess } from '../../helpers'
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../../data'

export async function confirmAccount(
  req: Request,
  res: Response
): Promise<any> {
  const {
    params: { token }
  } = req

  const userToConfirm = await UserModel.findOne({ token })

  if (userToConfirm === null) {
    return thrwoError(res, 404, ERROR_MESSAGES.TOKEN_NOT_VALID)
  }

  try {
    userToConfirm.confirm = true
    userToConfirm.token = ''
    await userToConfirm.save()
    thrwoSuccess(res, 200, SUCCESS_MESSAGES.USER_CONFIRMED)
  } catch (error: any) {
    console.error(`El error a la hora de confirmar la cuenta es: ${error}`)
    thrwoError(res, 400, error)
  }
}
