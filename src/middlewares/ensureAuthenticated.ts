import { Request, Response, NextFunction} from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

interface tokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuthenticated(
    request: Request, 
    respose: Response, 
    next: NextFunction
): void {
    const authHeader = request.headers.authorization;

    if(!authHeader) {
        throw new Error('JWT token is missing')
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = verify(token, authConfig.jwt.secret);

        const { sub } = decoded as tokenPayload; 

        request.user = {
            id: sub,
        }

        return next();
    } catch(err){
        throw new Error('JWT invalid token')
    }
    
}