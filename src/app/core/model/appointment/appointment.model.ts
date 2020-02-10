import {ID} from '@datorama/akita';
import {prop, required} from '@rxweb/reactive-form-validators';

export interface AppointmentModel {
    id: ID;
    date: string;
    timeInit: string;
    timeEnd: string;
    subject: string;
    description: string;
    area: string;
}

export class AppointmentFormModel {
    @prop()
    id: ID;

    @required()
    date: string;

    @required()
    timeInit: string;

    @required()
    timeEnd: string;

    @required()
    subject: string;

    @prop()
    description: string;

    @prop()
    area: string;
}

/**
 * A factory function that creates PersonaModel
 */
export function createAppointment({id, date, timeInit, timeEnd, subject, description, area}: Partial<AppointmentModel>) {
    return {
        id: id,
        date: date,
        timeInit: timeInit,
        timeEnd: timeEnd,
        subject: subject,
        description: description,
        area: area
    } as AppointmentModel;
}


export const appointmentMockData = [
        {
            id: 'id1',
            date: new Date(2020, 1, 7).toLocaleString(),
            timeInit: '10:55 AM',
            timeEnd: '3 PM',
            subject: 'Task',
            description: 'Run task number 1',
            area: '',
        },
        {
            id: 'id2',
            date: new Date(2020, 1, 10).toLocaleString(),
            timeInit: '8:55 AM',
            timeEnd: '5 PM',
            subject: 'TODO',
            description: 'Go for todo number 1',
            area: '',
        },
        {
            id: 'id3',
            date: new Date(2020, 1, 15).toLocaleString(),
            timeInit: '12:00 PM',
            timeEnd: '2:00 PM',
            subject: 'Launch',
            description: 'Get Launch at 12:00 PM',
            area: '',
        },
    ]
;
