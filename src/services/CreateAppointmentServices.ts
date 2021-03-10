import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface RequestDTO {
    provider: string;
    date: Date
}

class CreateAppointments {
  public async execute({provider, date}: RequestDTO): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository)

    const appointmentDate = startOfHour(date);
    
    const findAppointmentInSameDate = appointmentsRepository.findByDate(
        appointmentDate
    );

    if(findAppointmentInSameDate){
        throw Error('this appointment is already booked')
    }
    
    const appointment  = appointmentsRepository.create({
        provider, 
        date: appointmentDate,
    });

    await appointmentsRepository.save(appointment)

    return appointment;
    }
}

export default CreateAppointments;