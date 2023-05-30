/* eslint-disable @typescript-eslint/indent */
import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose'

@modelOptions({
  schemaOptions: {
    timestamps: true
  }
})
export class User {
  @prop({
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    minlength: 2
  })
  userName: string

  @prop({
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true
  })
  email: string

  @prop({
    type: String,
    required: true,
    minlength: 6
  })
  password: string

  @prop({ type: String })
  token: string

  @prop({ type: Boolean, default: false })
  confirm: boolean
}

export const UserModel = getModelForClass(User)
