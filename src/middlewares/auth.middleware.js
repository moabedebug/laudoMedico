import { verifyToken } from '../utils/auth.utils.js';

export function authenticate(res, req, next){
    const token = req.cookies.token;

    if(!token) {
        return res.status(401).json({ message: "Token não encontrado. Usuário não autenticado." });
    }

    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Token inválido ou expirado." })
    }
}
