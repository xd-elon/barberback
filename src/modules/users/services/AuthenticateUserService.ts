import { sign } from 'jsonwebtoken';
import {injectable, inject} from 'tsyringe';

import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IHasheProvider from '../providers/HashProvider/models/IHashedProvider';

interface RequestDTO {
    email: string;
    password: string;
}

interface Response {
    user: User;
    token: string;
}

@injectable()
class AuthenticateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        private hashProvider: IHasheProvider
        ) {}

    public async execute({email, password}: RequestDTO): Promise<Response> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user ) {
            throw new AppError('e-mail ou password incorreto!', 401);
        }

        const passwordMatch = await this.hashProvider.compareHash(
            password,
             user.password
        );

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