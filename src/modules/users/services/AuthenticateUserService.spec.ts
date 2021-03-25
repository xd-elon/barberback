import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUsersService from './AuthenticateUserService';
import CreateUsersService from './CreateUserService';

describe('AuthenticateUser', () => {
    it('authenticate user', async() => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const authenticateUser = new AuthenticateUsersService(
            fakeUsersRepository,
            fakeHashProvider,
        );

        const createUser = new CreateUsersService(
            fakeUsersRepository,
            fakeHashProvider,
        );

       const user =  await createUser.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456'
        });

        const response = await authenticateUser.execute({
            email: 'johndoe@example.com',
            password: '123456'
        });

        expect(response).toHaveProperty('token')
        expect(response.user).toEqual(user);
    });
});