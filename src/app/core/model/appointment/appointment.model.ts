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
