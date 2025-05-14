import AppError from './appError.js'

export class InvalidDoctorIdError extends AppError {
  constructor(message = 'ID do doutor inválido.') {
    super(message, 400)
  }
}

export class InvalidPatientIdError extends AppError {
  constructor(message = 'ID do paciente inválido.') {
    super(message, 400)
  }
}

export class PatientAlreadyExistsError extends AppError {
  constructor(message = 'CPF já cadastrado') {
    super(message, 409)
  }
}

export class PatientNotFoundError extends AppError {
  constructor(message = 'Paciente não encontrado.') {
    super(message, 404)
  }
}
