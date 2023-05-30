/* eslint-disable @typescript-eslint/indent */
import { Ref, modelOptions, prop, getModelForClass } from '@typegoose/typegoose'
import { User } from './User'

export enum Kind {
  INCOME = 'income',
  SPENT = 'spent'
}

@modelOptions({
  schemaOptions: {
    timestamps: true
  }
})
class Category {
  @prop({
    type: String,
    lowercase: true,
    required: true,
    minlength: 2,
    trim: true
  })
  name: string

  @prop({ enum: Kind, required: true })
  kind: Kind

  @prop({ ref: () => User })
  owner: Ref<User>
}

export const CategoryModel = getModelForClass(Category)
