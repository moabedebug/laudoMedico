import { Patient } from '../models/patient.model.js'

export const PatientRepository = {
  create: async (patientData) => {
    const patient = new Patient(patientData)
    return await patient.save()
  },

  findAllByDoctorId: async (doctorId) => {
    return await Patient.find({ doctorId }).populate('doctorId', 'name')
  },

  findById: async (patientId) => {
    return await Patient.findById(patientId).populate('doctorId', 'name')
  },

  update: async (patientId, patientData) => {
    return await Patient.findByIdAndUpdate(patientId, patientData, {
      new: true,
    }).populate('doctorId', 'name')
  },

  delete: async (patientId) => {
    return await Patient.findByIdAndDelete(patientId)
  },

  findByCpfAndDoctor: async (cpf, doctorId) => {
    return await Patient.findOne({ cpf, doctorId }).populate('doctorId', 'name')
  },
}
