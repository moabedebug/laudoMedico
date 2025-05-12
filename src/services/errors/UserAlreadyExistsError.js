import AppError from "./appError.js";

class UserAlreadyExistsError extends AppError {
    constructor(message = "Email já cadastrado"){
        super(message, 409)
    }
}

export default UserAlreadyExistsError;
