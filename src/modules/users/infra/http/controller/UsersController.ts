import {Request, Response} from 'express';
import { container } from 'tsyringe';

import CreateUseService from '@modules/users/services/CreateUserService';

export default class UsersController {
    public async create(request:Request, response:Response): Promise<Response> {
        const {name, email, password} = request.body;

        const createUser = container.resolve(CreateUseService)
    
        const user = await  createUser.execute({
          name,
          email,
          password,
        })
    
        //delete user.password;
    
        return response.send(user);
    }
}