import { getRepository, Repository } from 'typeorm';

//  IAppointmentsrepository , principio de liskov
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUsersDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '../entities/User';

class UsersRepository implements IUsersRepository {
    private ormRepositry: Repository<User>

    constructor() {
        this.ormRepositry = getRepository(User);
    }

    public async findById(id: string): Promise<User | undefined> {
        const user = await this.ormRepositry.findOne(id);

        return user;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.ormRepositry.findOne({
            where: { email },
        });

        return user;
    }

    public async create(userData: ICreateUsersDTO): Promise<User> {
        const appointment = await this.ormRepositry.create(userData);

        await this.ormRepositry.save(appointment);

        return appointment;
    }

    public async save(user: User): Promise<User> {
        return this.ormRepositry.save(user);
    }
}

export default UsersRepository;