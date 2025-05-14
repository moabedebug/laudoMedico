import mongoose from 'mongoose'

export const reportSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      require: true,
    },
    diagnosis: {
      type: String,
      required: true,
      trim: true,
    },
    observations: {
      type: String,
      trim: true,
    },
    recommendation: {
      type: String,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true, validateBeforeSave: true },
)

reportSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.__v
    return ret
  },
})

export const Report = mongoose.model('Reports', reportSchema)
