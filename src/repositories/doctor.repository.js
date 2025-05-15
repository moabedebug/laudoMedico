import { Doctor } from '../models/doctor.model.js'

export const DoctorRepository = {
  findByEmail: async (email) => {
    return await Doctor.findOne({ email })
  },
  create: async (doctorData) => {
    const doctor = new Doctor(doctorData)
    return await doctor.save()
  },
}
