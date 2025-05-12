import { env } from "../config/env.js";

export function sendTokenReponse(res, user, token, message, statusCode = 200){
    res.cookie("token", token, {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 1000 // 1 Hours
    })
    .status(statusCode)
    .json({
        message,
        user
    });
}
