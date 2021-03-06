import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

interface tokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuthenticated(
    request: Request,
    respose: Response,
    next: NextFunction,
): void {
    const authHeader = request.headers.authorization;

    if(!authHeader) {
        throw new AppError('JWT token is missing', 401);
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = verify(token, authConfig.jwt.secret);

        const { sub } = decoded as tokenPayload;

        request.user = {
            id: sub,
        };

        return next();
    } catch (err) {
        throw new AppError('JWT invalid token', 401);
    }
}