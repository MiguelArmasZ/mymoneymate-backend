import jwt, { type JwtPayload } from 'jsonwebtoken'
import { type NextFunction, type Response } from 'express'
import { type IUser, type CheckAuthJWT, type MyRequest } from '../types'
import { UserModel } from '../models/User'
import { thrwoError } from '../helpers'

export async function checkAuth(
  req: MyRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authorization = req.headers.authorization

  if (authorization?.startsWith('Bearer') ?? false) {
    try {
      const getJWT = authorization?.split(' ')[1]
      const { id }: JwtPayload = jwt.verify(
        getJWT ?? '',
        process.env.JWT_SECRET ?? ''
      ) as CheckAuthJWT

      const userLogged: IUser | null = await UserModel.findById(id, {
        userName: 1,
        email: 1
      })
      if (userLogged !== null) {
        req.userLogged = userLogged
        next()
        return
      }
    } catch (error: any) {
      console.error(
        `El error al momento de guardar la sesión del usuario es: ${error}`
      )
      thrwoError(res, 400, error)
      return
    }
  }

  thrwoError(res, 401, 'token no válido')
}
