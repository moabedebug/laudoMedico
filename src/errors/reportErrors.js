import AppError from './appError.js'

export class ReportNotFoundError extends AppError {
  constructor(message = 'Nenhum relatório encontrado.') {
    super(message, 404)
  }
}

export class InvalidReportIdError extends AppError {
  constructor(message = 'ID do relatório inválido.') {
    super(message, 401)
  }
}
