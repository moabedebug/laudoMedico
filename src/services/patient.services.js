import { isValidObjectId } from 'mongoose'

import { PatientRepository } from '../repositories/patient.repository.js'

import PatientAlreadyExistsError from './errors/Patient/PatientAlreadyExistsError.js'
import InvalidDoctorIdError from './errors/Patient/InvalidDoctorIdError.js'
import PatientNotFoundError from './errors/Patient/PatientNotFoundError.js'
import InvalidPatientIdError from './errors/Patient/InvalidPatientIdError.js'

export async function createPatient(data, doctorId) {
  const existingData = await PatientRepository.findByCpfAndDoctor(
    data.cpf,
    doctorId,
  )
  if (existingData) {
    throw new PatientAlreadyExistsError()
  }

  return await PatientRepository.create({ ...data, doctorId })
}

export async function getAllPatients(doctorId) {
  if (!isValidObjectId(doctorId)) {
    throw new InvalidDoctorIdError()
  }
  return await PatientRepository.findAllByDoctorId(doctorId)
}

export async function getPatientById(id) {
  validatePatientId(id)

  const patient = await PatientRepository.findById(id)
  if (!patient) {
    throw new PatientNotFoundError()
  }

  return patient
}

export async function updatePatient(id, updateData) {
  validatePatientId(id)

  const existing = await PatientRepository.findByCpfAndDoctor(
    updateData.cpf,
    updateData.doctorId,
  )

  if (existing && existing._id.toString() !== id) {
    throw new PatientAlreadyExistsError()
  }

  try {
    const updated = await PatientRepository.update(id, updateData)
    if (!updated) {
      throw new PatientNotFoundError()
    }

    return updated
  } catch (err) {
    if (err.code === 11000) {
      throw new PatientAlreadyExistsError()
    }

    throw err
  }
}

export async function deletePatient(id) {
  validatePatientId(id)

  const deleted = await PatientRepository.delete(id)
  if (!deleted) {
    throw new PatientNotFoundError()
  }

  return deleted
}

function validatePatientId(id) {
  if (!id || !isValidObjectId(id)) {
    throw new InvalidPatientIdError()
  }
}
