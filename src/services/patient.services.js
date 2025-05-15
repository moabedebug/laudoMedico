import { isValidObjectId } from 'mongoose'

import { PatientRepository } from '../repositories/patient.repository.js'

import * as Errors from '../errors/index.js'
import { ReportRepository } from '../repositories/report.repository.js'

export async function createPatient(patientData, doctorId) {
  const existingPatientData = await PatientRepository.findByCpfAndDoctor(
    patientData.cpf,
    doctorId,
  )
  if (existingPatientData) {
    throw new Errors.PatientAlreadyExistsError()
  }

  return await PatientRepository.create({ ...patientData, doctorId })
}

export async function getAllPatients(doctorId) {
  if (!isValidObjectId(doctorId)) {
    throw new Errors.InvalidDoctorIdError()
  }
  return await PatientRepository.findAllByDoctorId(doctorId)
}

export async function getPatientById(patientId) {
  validatePatientId(patientId)

  const patient = await PatientRepository.findById(patientId)
  if (!patient) {
    throw new Errors.PatientNotFoundError()
  }

  return patient
}

export async function updatePatient(patientId, patientData) {
  validatePatientId(patientId)

  const existingPatient = await PatientRepository.findByCpfAndDoctor(
    patientData.cpf,
    patientData.doctorId,
  )

  if (existingPatient && existingPatient._id.toString() !== patientId) {
    throw new Errors.PatientAlreadyExistsError()
  }

  try {
    const updatedPatient = await PatientRepository.update(
      patientId,
      patientData,
    )
    if (!updatedPatient) {
      throw new Errors.PatientNotFoundError()
    }

    return updatedPatient
  } catch (err) {
    if (err.code === 11000) {
      throw new Errors.PatientAlreadyExistsError()
    }

    throw err
  }
}

export const removePatient = async (patientId) => {
  if (!isValidObjectId(patientId)) {
    throw new Errors.InvalidPatientIdError()
  }

  const patient = await PatientRepository.findById(patientId)
  if (!patient) {
    throw new Errors.PatientNotFoundError()
  }

  await ReportRepository.deleteReportAndPatient(patientId)

  await PatientRepository.delete(patientId)
}

function validatePatientId(patientId) {
  if (!patientId || !isValidObjectId(patientId)) {
    throw new Errors.InvalidPatientIdError()
  }
}
