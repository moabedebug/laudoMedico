import AppError from './appError.js'

export class InvalidDoctorIdError extends AppError {
  constructor(message = 'ID do doutor inválido.') {
    super(message, 400)
  }
}

export class DoctorNotPermission extends AppError {
  constructor(message = 'Você não tem permissão para criar este relatório') {
    super(message, 403)
  }
}
