import { compare } from 'bcryptjs';
import { getRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';
import User from '../infra/typeorm/entities/User';

interface RequestDTO {
    email: string;
    password: string;
}

interface Response {
    user: User;
    token: string;
}

class AuthenticateUserService {
    public async execute({email, password}: RequestDTO): Promise<Response> {
        const usersRepository = getRepository(User);
         const user = await usersRepository.findOne({ where: { email} });

        if (!user ) {
            throw new AppError('e-mail ou password incorreto!', 401);
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new AppError('e-mail ou password incorreto!', 401);
        }

        const {secret, expired} = authConfig.jwt;

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn: expired,
        });

        return {
            user,
            token,
        };
    }
}

export default AuthenticateUserService;