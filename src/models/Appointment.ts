import { uuid } from 'uuidv4';

interface AppointConstrutor {
    provider: string;
    date: Date;
}

class Appointment {

    id: string;

    provider: string;

    date: Date;

    constructor({provider, date}: Omit<AppointConstrutor, 'id'>)  {
        this.id = uuid();
        this.provider = provider;
        this.date = date;
    }
}

export default Appointment;