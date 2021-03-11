import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentServices';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    const {name, email, password} = request.body;
    
    return response.send();
  } catch(err) {
     return response.status(400).json({ error: err.message });
  }
});

export default usersRouter;