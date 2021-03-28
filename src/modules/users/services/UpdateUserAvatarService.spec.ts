import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

describe('UpdateUserAvatar', () => {
    it('update user', async() => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeStorageProvider = new FakeStorageProvider();

        const updateUser = new UpdateUserAvatarService(
            fakeUsersRepository,
            fakeStorageProvider,
        );

        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456'
        })
   
        await updateUser.execute({
            user_id: user.id,
            filename: 'avatar.jpg'
        });

        expect(user.avatar).toBe('avatar.jpg');
    });

    it('should not able to update avatar from non existing user', async() => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeStorageProvider = new FakeStorageProvider();

        const updateUser = new UpdateUserAvatarService(
            fakeUsersRepository,
            fakeStorageProvider,
        );

        expect(updateUser.execute({
            user_id: 'non-existing-user',
            filename: 'avatar.jpg'
        }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('delete old avatar user', async() => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeStorageProvider = new FakeStorageProvider();

        const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

        const updateUserAvatar = new UpdateUserAvatarService(
            fakeUsersRepository,
            fakeStorageProvider,
        );

        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456'
        })
   
        await updateUserAvatar.execute({
            user_id: user.id,
            filename: 'avatar.jpg'
        });

        await updateUserAvatar.execute({
            user_id: user.id,
            filename: 'avatar2.jpg'
        });
        expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');

        expect(user.avatar).toBe('avatar2.jpg');
    });
});