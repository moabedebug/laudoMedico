import { Report } from '../models/report.model.js'

export const ReportRepository = {
  create: async (data) => {
    const report = new Report(data)
    return await report.save()
  },

  findReportsByPatient: async (patientId) => {
    return await Report.find({ patient: patientId })
  },

  findReportsByDoctor: async (doctorId) => {
    return await Report.find({ doctorId })
  },

  findById: async (reportId) => {
    return await Report.findById(reportId)
  },

  update: async (reportId, data) => {
    return await Report.findByIdAndUpdate(reportId, data, { new: true })
  },

  delete: async (reportId) => {
    return await Report.findByIdAndDelete(reportId)
  },

  deleteReportAndPatient: async (patientId) => {
    return await Report.deleteMany({ patient: patientId })
  },
}
