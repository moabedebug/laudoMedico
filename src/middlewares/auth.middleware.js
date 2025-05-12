import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export function authenticate(req, res, next){
    const token = req.cookies.token;

    if(!token) {
        return res.status(401).json({ message: "Token não encontrado. Usuário não autenticado." });
    }

    try {
        const decoded = jwt.verify(token, env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Token inválido ou expirado." })
    }
}
