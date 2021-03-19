import { startOfHour } from 'date-fns';

import AppError from '@shared/errors/AppError';

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IApointmentsRepository';

interface RequestDTO {
    provider_id: string;
    date: Date
}

class CreateAppointmentServices {
    constructor(private appointmentsRepository: IAppointmentsRepository) {}

  public async execute({provider_id, date}: RequestDTO): Promise<Appointment> {
    const appointmentDate = startOfHour(date);
    
    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
        appointmentDate,
    );

    if(findAppointmentInSameDate){
        throw new AppError('this appointment is already booked')
    }
    
    const appointment = await this.appointmentsRepository.create({
        provider_id, 
        date: appointmentDate,
    });

    return appointment;
    }
}

export default CreateAppointmentServices;