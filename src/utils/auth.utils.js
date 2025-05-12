import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export function generateToken(user){
    const payload = {
        id: user._id,
        name: user.name,
        email: user.email
    };

    return jwt.sign(payload, env.JWT_SECRET, { expiresIn: "15m" });
}

export function generateRefreshToken(user){
    const payload = {
        id: user._id
    };
    return jwt.sign(payload, env.JWT_SECRET, { expiresIn: "7d" })
}

export function verifyToken(token) {
  return jwt.verify(token, env.JWT_SECRET);
}
