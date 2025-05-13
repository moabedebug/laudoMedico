import AppError from '../appError.js'

class PatientNotFoundError extends AppError {
  constructor(message = 'Paciente não encontrado.') {
    super(message, 404)
  }
}

export default PatientNotFoundError
