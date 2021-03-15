import {Router} from 'express';

import appointmentsRouter from './appointments.routes';
import usersRouter from './users.routes';
import sessiosRouter from './sessions.routes'


const  routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessiosRouter);

export default routes;