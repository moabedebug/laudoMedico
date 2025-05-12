import AppError from "./appError.js";

class UserAlreadyExistsError extends AppError {
    constructor(message = "Email já cadastrado"){
        super(message, 400)
    }
}

export default UserAlreadyExistsError;
