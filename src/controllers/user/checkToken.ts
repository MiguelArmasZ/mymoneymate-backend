import { type Request, type Response } from 'express'
import { UserModel } from '../../models/User'
import { thrwoError, thrwoSuccess } from '../../helpers'
import { type CheckTokenParams } from '../../types'
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../../data'

export async function checkToken(req: Request, res: Response): Promise<any> {
  const { token } = req.params as CheckTokenParams
  const existingUser = await UserModel.findOne({ token }, { email: 1 })

  if (existingUser === null) {
    return thrwoError(res, 404, ERROR_MESSAGES.TOKEN_NOT_VALID)
  }

  thrwoSuccess(res, 200, SUCCESS_MESSAGES.TOKEN_VALID)
}
