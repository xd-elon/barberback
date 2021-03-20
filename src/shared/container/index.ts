import { container } from 'tsyringe';

import IApointmentsRepository from '@modules/appointments/repositories/IApointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';


container.registerSingleton<IApointmentsRepository>(
    'AppointmentsRepository',
     AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
     UsersRepository,
);