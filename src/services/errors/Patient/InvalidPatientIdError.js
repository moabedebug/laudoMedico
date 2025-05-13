import AppError from '../appError.js'

class InvalidPatientIdError extends AppError {
  constructor(message = 'ID do paciente inválido.') {
    super(message, 400)
  }
}

export default InvalidPatientIdError
