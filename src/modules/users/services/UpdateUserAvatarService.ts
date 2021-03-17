import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import User from '../infra/typeorm/entities/User';


interface Request {
    user_id: string;
    filename: string
}

class UpdateUserAvatarService {
     public async execute({ user_id, filename}: Request): Promise<User> {
         const usersRepository = getRepository(User);

         const user = await usersRepository.findOne(user_id)

         if(!user){
             throw new AppError('only authenticated users can change avatar', 401);
         }

         if (user.avatar) {
            
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
            const userAvatarFilesExists = await fs.promises.stat(userAvatarFilePath);

            if(userAvatarFilesExists){
                await fs.promises.unlink(userAvatarFilePath);
            }
         }
         
        user.avatar = filename;

        await usersRepository.save(user);

        return user;
     }
}
export default UpdateUserAvatarService;