import { Patient } from '../models/patient.model.js'

export const PatientRepository = {
  create: async (patientData) => {
    const patient = new Patient(patientData)
    return await patient.save()
  },

  findAllByDoctorId: async (doctorId) => {
    return await Patient.find({ doctorId })
  },

  findById: async (patientId) => {
    return await Patient.findById(patientId)
  },

  update: async (patientId, patientData) => {
    return await Patient.findByIdAndUpdate(patientId, patientData, {
      new: true,
    })
  },

  delete: async (patientId) => {
    return await Patient.findByIdAndDelete(patientId)
  },

  findByCpfAndDoctor: async (cpf, doctorId) => {
    return await Patient.findOne({ cpf, doctorId })
  },
}
