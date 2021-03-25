import {injectable, inject} from 'tsyringe';

import User from '../infra/typeorm/entities/User';

import AppError from '@shared/errors/AppError';
import IHasheProvider from '../providers/HashProvider/models/IHashedProvider';
import IUsersRepository from '../repositories/IUsersRepository';

interface RequestDTO {
    name: string;
    email: string;
    password: string;
}

@injectable()
class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        
        @inject('HasheProvider')
        private hashProvider: IHasheProvider,
        ) {}
    
    public async execute({name, email, password}: RequestDTO): Promise<User> {
        const checkUserExists = await this.usersRepository.findByEmail(email);

        if(checkUserExists) {
            throw new AppError("Este e-mail ja esta em Uso!!")
        }

        const hashedPassword = await this.hashProvider.generateHash(password);

        const user = await this.usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        return user;
    }
}

export default CreateUserService;