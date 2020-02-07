import {Injectable} from '@angular/core';
import {AppointmentState, AppointmentStore} from './appointment.store';
import {AppointmentQuery} from './appointment.query';
import {AppointmentModel, createAppointment} from './menu-item.model';
import {BaseService} from '@app/core/datasource/redux/base.service';
import {DatasourceService} from '@app/core/datasource/domain/datasource.service';
import {DATASOURCE_NAMES} from '@app/core/datasource/datasource.url.config';

const model = DATASOURCE_NAMES.MODEL_APPOINTMENT;

@Injectable({providedIn: 'root'})
export class AppointmentService extends BaseService<AppointmentState, AppointmentModel> {

    constructor(private appointmentStore: AppointmentStore
        , private appointmentQuery: AppointmentQuery
        , datasource: DatasourceService) {
        super(appointmentStore, appointmentQuery, datasource);
    }

    createFunction(): Function {
        return createAppointment;
    }

    model(): string {
        return model;
    }
}
