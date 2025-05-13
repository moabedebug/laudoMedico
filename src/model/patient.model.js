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
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true, validateBeforeSave: true },
)

patientSchema.index({ cpf: 1, doctorId: 1 }, { unique: true })

patientSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.__v
    return ret
  },
})

export const Patient = mongoose.model('Patients', patientSchema)
