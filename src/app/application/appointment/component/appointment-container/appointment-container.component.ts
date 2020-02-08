import {Component, OnInit} from '@angular/core';
import {AppointmentService} from '@app/core/model/appointment/appointment.service';
import {Observable} from 'rxjs';
import {AppointmentModel} from '@app/core/model/appointment/appointment.model';

@Component({
    selector: 'app-appointment-container',
    templateUrl: './appointment-container.component.html',
    styleUrls: ['./appointment-container.component.css']
})
export class AppointmentContainerComponent implements OnInit {
    appointments$: Observable<AppointmentModel[]>;

    constructor(private appointmentS: AppointmentService) {
    }

    ngOnInit() {
        this.appointments$ = this.appointmentS.list();
    }

}
