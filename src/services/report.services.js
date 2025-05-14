import { isValidObjectId } from 'mongoose'
import * as Errors from '../errors/index.js'
import { Patient } from '../models/patient.model.js'
import { ReportRepository } from '../repositories/reports.repository.js'

export const createReport = async (data, doctorId) => {
  if (!isValidObjectId(doctorId)) {
    throw new Errors.InvalidDoctorIdError()
  }

  if (!isValidObjectId(data.patient)) {
    throw new Errors.InvalidPatientIdError()
  }

  const patientExists = await Patient.findById(data.patient)
  if (!patientExists) {
    throw new Errors.PatientNotFoundError()
  }

  data.doctorId = doctorId

  return await ReportRepository.create(data)
}

export const getReportsByPatient = async (patientId) => {
  if (!isValidObjectId(patientId)) {
    throw new Errors.InvalidPatientIdError()
  }

  const reports = await ReportRepository.findReportsByPatient(patientId)
  if (reports === 0) {
    throw new Errors.ReportNotFoundError()
  }

  return reports
}

export const getReportsByDoctor = async (doctorId) => {
  if (!isValidObjectId(doctorId)) {
    throw new Errors.InvalidDoctorIdError()
  }

  const reports = await ReportRepository.findReportsByDoctor(doctorId)
  if (!reports) {
    throw new Errors.ReportNotFoundError()
  }

  return reports
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

export const updateReport = async (reportId, data) => {
  if (!isValidObjectId(reportId)) {
    throw new Errors.InvalidReportIdError()
  }

  const report = await ReportRepository.findById(reportId)
  if (!report) {
    throw new Errors.ReportNotFoundError()
  }

  return await ReportRepository.update(reportId, data)
}

export const deleteReport = async (reportId) => {
  if (!isValidObjectId(reportId)) {
    throw new Errors.InvalidReportIdError()
  }

  const report = await ReportRepository.findById(reportId)
  if (!report) {
    throw new Errors.ReportNotFoundError()
  }

  return await ReportRepository.delete(reportId)
}
