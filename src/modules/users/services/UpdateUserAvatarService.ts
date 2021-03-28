import path from 'path';
import fs from 'fs';
import {injectable, inject} from 'tsyringe';

import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import User from '../infra/typeorm/entities/User';

import IUsersRepository from '../repositories/IUsersRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

interface Request {
    user_id: string;
    filename: string;
}

@injectable()
class UpdateUserAvatarService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('StorageProvider')
        private storageProvider: IStorageProvider,
        ) {}

     public async execute({ user_id, filename}: Request): Promise<User> {

        const user = await this.usersRepository.findById(user_id)

        if(!user){
             throw new AppError('only authenticated users can change avatar', 401);
        }

        if (user.avatar) {
            await this.storageProvider.deleteFile(user.avatar)
        }

        const avatarfilename = await this.storageProvider.saveFile(filename);
         
        user.avatar = avatarfilename;

        await this.usersRepository.save(user);

        return user;
     }
}
export default UpdateUserAvatarService;