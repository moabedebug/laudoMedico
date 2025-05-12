import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export function generateToken(user){
    const payload = {
        id: user._id,
        name: user.name,
        email: user.email
    };

    const options = {
        expiresIn: '24h'
    };

    const token = jwt.sign(payload, env.JWT_SECRET, options);

    return token;
}
