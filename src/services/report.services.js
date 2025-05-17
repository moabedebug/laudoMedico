import { isValidObjectId } from 'mongoose'
import * as Errors from '../errors/index.js'
import { Patient } from '../models/patient.model.js'
import { ReportRepository } from '../repositories/report.repository.js'
import { generateReportPDF } from '../utils/pdf.utils.js'

export const createReport = async (reportData, doctorId) => {
  if (!isValidObjectId(doctorId)) {
    throw new Errors.InvalidDoctorIdError()
  }

  if (!isValidObjectId(reportData.patient)) {
    throw new Errors.InvalidPatientIdError()
  }

  const patientExists = await Patient.findById(reportData.patient)
  if (!patientExists) {
    throw new Errors.PatientNotFoundError()
  }

  reportData.doctorId = doctorId

  return await ReportRepository.create(reportData)
}

export const getReportsByPatient = async (patientId) => {
  if (!isValidObjectId(patientId)) {
    throw new Errors.InvalidPatientIdError()
  }

  const reportsPatient = await ReportRepository.findReportsByPatient(patientId)
  if (reportsPatient === 0) {
    throw new Errors.ReportNotFoundError()
  }

  return reportsPatient
}

export const getReportsByDoctor = async (doctorId) => {
  if (!isValidObjectId(doctorId)) {
    throw new Errors.InvalidDoctorIdError()
  }

  const reportsDoctor = await ReportRepository.findReportsByDoctor(doctorId)
  if (!reportsDoctor) {
    throw new Errors.ReportNotFoundError()
  }

  return reportsDoctor
}

export const getReportById = async (reportId) => {
  if (!isValidObjectId(reportId)) {
    throw new Errors.InvalidReportIdError()
  }

  const report = await ReportRepository.findById(reportId)
  if (!report) {
    throw new Errors.ReportNotFoundError()
  }

  return report
}

export const updateReport = async (reportId, reportData) => {
  if (!isValidObjectId(reportId)) {
    throw new Errors.InvalidReportIdError()
  }

  const report = await ReportRepository.findById(reportId)
  if (!report) {
    throw new Errors.ReportNotFoundError()
  }

  return await ReportRepository.update(reportId, reportData)
}

export const removeReport = async (reportId) => {
  if (!isValidObjectId(reportId)) {
    throw new Errors.InvalidReportIdError()
  }

  const report = await ReportRepository.findById(reportId)
  if (!report) {
    throw new Errors.ReportNotFoundError()
  }

  return await ReportRepository.delete(reportId)
}

export const getReportPDF = async (reportId) => {
  if (!isValidObjectId(reportId)) {
    throw new Errors.InvalidReportIdError()
  }

  const report = await ReportRepository.findById(reportId)
  if (!report) {
    throw new Errors.ReportNotFoundError()
  }

  const pdfBuffer = await generateReportPDF(report)
  return pdfBuffer
}
