import { type Request } from 'express'

export interface IUser {
  id: string
  userName: string
  email: string
  password: string
  token: string
}

export type LogInParams = Omit<IUser, 'userName'>

export type ForgotPasswordParams = Pick<IUser, 'email'>

export type CheckTokenParams = Pick<IUser, 'token'>

export type NewPasswordParams = Pick<IUser, 'password'>

export type CheckAuthJWT = Pick<IUser, 'id'>

export interface MyRequest extends Request {
  userLogged?: IUser | null
}

type CategoryKinds = 'spent' | 'income'

export interface ICategory {
  name: string
  kind: CategoryKinds
}

export type Mailing = Pick<IUser, 'email' | 'userName' | 'token'>

export interface IRecord {
  kind: CategoryKinds
  date: Date
  category: string
  amount: string
  concept: string
}
