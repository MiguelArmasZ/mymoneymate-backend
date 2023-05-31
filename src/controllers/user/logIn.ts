import { type Request, type Response } from 'express'
import { type LogInParams } from '../../types'
import { UserModel } from '../../models/User'
import { comparePasswords, generateJWT, thrwoError } from '../../helpers'
import { ERROR_MESSAGES } from '../../data'

export async function logIn(req: Request, res: Response): Promise<any> {
  const { email, password: passwordSent }: LogInParams = req.body

  const userToLogIn = await UserModel.findOne(
    { email },
    { userName: 1, email: 1, confirm: 1, password: 1 }
  )

  if (userToLogIn === null) {
    return thrwoError(res, 404, ERROR_MESSAGES.USER_DOES_NOT_EXIST)
  }

  if (!userToLogIn.confirm) {
    return thrwoError(res, 401, ERROR_MESSAGES.ACCOUNT_NOT_CONFIRMED)
  }

  if (!(await comparePasswords(passwordSent, userToLogIn.password))) {
    return thrwoError(res, 401, ERROR_MESSAGES.PASSWORD_INCORRECT)
  }

  try {
    res.json({
      id: userToLogIn._id,
      userName: userToLogIn.userName,
      email: userToLogIn.email,
      jwt: generateJWT(userToLogIn._id)
    })
  } catch (error: any) {
    console.error(`El error a la hora de autenticar al usuario es: ${error}`)
    thrwoError(res, 400, error)
  }
}
