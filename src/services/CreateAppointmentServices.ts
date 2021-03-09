import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface RequestDTO {
    provider: string;
    date: Date
}

class CreateAppointments {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
        this.appointmentsRepository = appointmentsRepository;
  }

  public execute({provider, date}: RequestDTO): Appointment {
    const appointmentDate = startOfHour(date);
    
    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(appointmentDate);

    if(findAppointmentInSameDate){
        throw Error('this appointment is already booked')
    }
    
    const appointment  = this.appointmentsRepository.create({
        provider, 
        date: appointmentDate,
    });

    return appointment;
    }
}

export default CreateAppointments;