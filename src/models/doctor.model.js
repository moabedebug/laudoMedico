import mongoose from 'mongoose'

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

doctorSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.passwordHash
    delete ret.__v
    return ret
  },
})

export const Doctor = mongoose.model('Doctors', doctorSchema)
