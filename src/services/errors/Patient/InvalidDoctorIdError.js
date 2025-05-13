import AppError from '../appError.js'

class InvalidDoctorIdError extends AppError {
  constructor(message = 'ID do doutor inválido.') {
    super(message, 400)
  }
}

export default InvalidDoctorIdError
