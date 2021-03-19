import { getRepository, Repository } from 'typeorm';

//  IAppointmentsrepository , principio de liskov
import IAppointmentsRepository from '@modules/appointments/repositories/IApointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

import Appointment from '../entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
    private ormRepositry: Repository<Appointment>

    constructor() {
        this.ormRepositry = getRepository(Appointment);
    }

    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const findAppointment = await this.ormRepositry.findOne({
            where: { date },
        });

        return findAppointment;
    }

    public async create({ provider_id, date}: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = await this.ormRepositry.create({provider_id, date});

        await this.ormRepositry.save(appointment);

        return appointment;
    }
}

export default AppointmentsRepository;