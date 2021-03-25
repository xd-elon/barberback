import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';


describe('CreateUser', () => {
    it('create new user', async() => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();
        const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
        
        const user = await createUser.execute({
            name: 'John doe',
            email: 'johndoe@example.com',
            password: '123456'
        });

        expect(user).toHaveProperty('id');
    });

    it('not create user email exists', async() => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();
        const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
        
        await createUser.execute({
            name: 'John doe',
            email: 'johndoe@example.com',
            password: '123456'
        });

        expect(createUser.execute({
            name: 'John doe',
            email: 'johndoe@example.com',
            password: '123456'
        }),
        ).rejects.toBeInstanceOf(AppError);
    });
});