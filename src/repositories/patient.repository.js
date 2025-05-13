import { Patient } from '../model/patient.model.js'

export const PatientRepository = {
  create: async (userData) => {
    const patient = new Patient(userData)
    return await patient.save()
  },

  findAllByDoctorId: async (doctorId) => {
    return await Patient.find({ doctorId })
  },

  findById: async (id) => {
    return await Patient.findById(id)
  },

  update: async (id, data) => {
    return await Patient.findByIdAndUpdate(id, data, { new: true })
  },

  delete: async (id) => {
    return await Patient.findByIdAndDelete(id)
  },

  findByCpfAndDoctor: async (cpf, doctorId) => {
    return await Patient.findOne({ cpf, doctorId })
  },
}
