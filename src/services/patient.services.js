import { isValidObjectId } from 'mongoose'

import { PatientRepository } from '../repositories/patient.repository.js'

import * as Errors from '../errors/index.js'

export async function createPatient(data, doctorId) {
  const existingData = await PatientRepository.findByCpfAndDoctor(
    data.cpf,
    doctorId,
  )
  if (existingData) {
    throw new Errors.PatientAlreadyExistsError()
  }

  return await PatientRepository.create({ ...data, doctorId })
}

export async function getAllPatients(doctorId) {
  if (!isValidObjectId(doctorId)) {
    throw new Errors.InvalidDoctorIdError()
  }
  return await PatientRepository.findAllByDoctorId(doctorId)
}

export async function getPatientById(id) {
  validatePatientId(id)

  const patient = await PatientRepository.findById(id)
  if (!patient) {
    throw new Errors.PatientNotFoundError()
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
    throw new Errors.PatientAlreadyExistsError()
  }

  try {
    const updated = await PatientRepository.update(id, updateData)
    if (!updated) {
      throw new Errors.PatientNotFoundError()
    }

    return updated
  } catch (err) {
    if (err.code === 11000) {
      throw new Errors.PatientAlreadyExistsError()
    }

    throw err
  }
}

export async function deletePatient(id) {
  validatePatientId(id)

  const deleted = await PatientRepository.delete(id)
  if (!deleted) {
    throw new Errors.PatientNotFoundError()
  }

  return deleted
}

function validatePatientId(id) {
  if (!id || !isValidObjectId(id)) {
    throw new Errors.InvalidPatientIdError()
  }
}
