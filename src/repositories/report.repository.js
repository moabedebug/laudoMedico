import { Report } from '../models/report.model.js'

export const ReportRepository = {
  create: async (reportData) => {
    const report = new Report(reportData)
    return await report.save()
  },

  findReportsByPatient: async (patientId) => {
    return await Report.find({ patient: patientId })
      .populate('patient', 'name age gender')
      .populate('doctorId', 'name')
  },

  findReportsByDoctor: async (doctorId) => {
    return await Report.find({ doctorId })
      .populate('patient', 'name age gender')
      .populate('doctorId', 'name')
  },

  findById: async (reportId) => {
    return await Report.findById(reportId)
      .populate('patient', 'name age gender')
      .populate('doctorId', 'name')
  },

  update: async (reportId, reportData) => {
    return await Report.findByIdAndUpdate(reportId, reportData, { new: true })
      .populate('patient', 'name age gender')
      .populate('doctorId', 'name')
  },

  delete: async (reportId) => {
    return await Report.findByIdAndDelete(reportId)
  },

  deleteReportAndPatient: async (patientId) => {
    return await Report.deleteMany({ patient: patientId })
  },
}
