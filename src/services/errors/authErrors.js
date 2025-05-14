import AppError from './appError.js'

export class InvalidCredentialsError extends AppError {
  constructor(message = 'Email ou senha inválidos.') {
    super(message, 401)
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Usuário não autenticado.') {
    super(message, 401)
  }
}

export class UserAlreadyExistsError extends AppError {
  constructor(message = 'Email já cadastrado.') {
    super(message, 409)
  }
}
