import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IApointmentsRepository from '@modules/appointments/repositories/IApointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

//import IUserTokensRepository from '@modules/users/repositories/IUsersTokenRepository';
//import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';


container.registerSingleton<IApointmentsRepository>(
    'AppointmentsRepository',
     AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
     UsersRepository,
);