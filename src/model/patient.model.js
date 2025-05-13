import mongoose from 'mongoose'

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
    },
    cpf: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    gender: {
      type: String,
      required: true,
      enum: ['Masculino', 'Feminino', 'Outro'],
    },
  },
  { timestamps: true, validateBeforeSave: true },
)

patientSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.__v
    return ret
  },
})

export const Patient = mongoose.model('Patient', patientSchema)
