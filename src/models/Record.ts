/* eslint-disable @typescript-eslint/indent */
import { Ref, modelOptions, prop, getModelForClass } from '@typegoose/typegoose'
import { User } from './User'
import { Kind } from './Category'

@modelOptions({
  schemaOptions: {
    timestamps: true
  }
})
class Record {
  @prop({ enum: Kind, required: true })
  kind: Kind

  @prop({
    type: Date,
    required: true,
    trim: true
  })
  date: string

  @prop({ type: String, required: true, trim: true })
  category: string

  @prop({ type: Number, required: true, trim: true })
  amount: number

  @prop({ type: String, required: true, maxlength: 30, trim: true })
  concept: string

  @prop({ ref: () => User })
  owner: Ref<User>
}

export const RecordModel = getModelForClass(Record)
