import {ID} from '@datorama/akita';

export interface AppointmentModel {
    id: ID;
    from: string;
    to: string;
    subject: string;
    description: string;
    area: string;
}

/**
 * A factory function that creates PersonaModel
 */
export function createAppointment({id, from, to, subject, description, area}: Partial<AppointmentModel>) {
    return {id: id, from: from, to: to, subject: subject, description: description, area: area} as AppointmentModel;
}


export const appointmentMockData = [
        {
            id: 'id1',
            from: new Date(2020, 1, 7, 8).toLocaleString(),
            to: new Date(2020, 1, 7, 13).toLocaleString(),
            subject: 'Task',
            description: 'Run task number 1',
            area: '',
        },
        {
            id: 'id2',
            from: new Date(2020, 1, 10, 10, 30).toLocaleString(),
            to: new Date(2020, 1, 10, 16).toLocaleString(),
            subject: 'TODO',
            description: 'Go for todo number 1',
            area: '',
        },
        {
            id: 'id3',
            from: new Date(2020, 1, 15, 12).toLocaleString(),
            to: new Date(2020, 1, 15, 14).toLocaleString(),
            subject: 'Launch',
            description: 'Get Launch at 12:00 PM',
            area: '',
        },
    ]
;
