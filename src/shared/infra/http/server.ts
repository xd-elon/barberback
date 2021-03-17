import 'reflect-metadata';

import express, {Request, Response, NextFunction} from 'express';
import cors from 'cors';
import 'express-async-errors';

import uploadConfig from '@config/upload';
import routes from './routes'
import AppError from '@shared/errors/AppError';

import '@shared/infra/typeorm';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory))
app.use(routes);

app.use((err: Error, request: Request, response: Response, next:NextFunction) => {
    if(err instanceof AppError){
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        })
    }
});

app.listen(3333, () => {
    console.log("server is runnning")
});