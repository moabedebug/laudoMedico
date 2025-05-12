import AppError from './appError.js';

class UnauthorizedError extends AppError {
    constructor(message = "Usuário não autenticado."){
        super(message, 401)
    }
}

export default UnauthorizedError;
