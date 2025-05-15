import { Report } from '../models/report.model.js'

export const ReportRepository = {
  create: async (reportData) => {
    const report = new Report(reportData)
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

  update: async (reportId, reportData) => {
    return await Report.findByIdAndUpdate(reportId, reportData, { new: true })
  },

  delete: async (reportId) => {
    return await Report.findByIdAndDelete(reportId)
  },

  deleteReportAndPatient: async (patientId) => {
    return await Report.deleteMany({ patient: patientId })
  },
}
