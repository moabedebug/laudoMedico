import AppError from "./appError.js";

class InvalidCredentialsError extends AppError {
    constructor(message = "Email ou senha inválidos"){
        super(message, 401)
    }
}

export default InvalidCredentialsError;
