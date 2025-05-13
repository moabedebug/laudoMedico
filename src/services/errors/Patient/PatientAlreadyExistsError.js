import AppError from '../appError.js'

class PatientAlreadyExistsError extends AppError {
  constructor(message = 'CPF já cadastrado') {
    super(message, 409)
  }
}

export default PatientAlreadyExistsError
