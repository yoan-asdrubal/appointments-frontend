import {Injectable} from '@angular/core';
import {AppointmentState, AppointmentStore} from './appointment.store';
import {BaseQuery} from '@app/core/datasource/redux/base.query';

@Injectable({
    providedIn: 'root'
})
export class AppointmentQuery extends BaseQuery<AppointmentState> {

    constructor(protected store: AppointmentStore) {
        super(store);
    }
}
