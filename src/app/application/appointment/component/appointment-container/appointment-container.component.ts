import {Component, OnInit} from '@angular/core';
import {AppointmentService} from '@app/core/model/appointment/appointment.service';
import {Observable, Subject} from 'rxjs';
import {AppointmentModel} from '@app/core/model/appointment/appointment.model';
import {CalendarEventTimesChangedEvent, CalendarView} from 'angular-calendar';
import {addDays, addHours, endOfDay, endOfMonth, isSameDay, isSameMonth, startOfDay, subDays} from 'date-fns';

const colors: any = {
    red: {
        primary: '#ad2121',
        secondary: '#FAE3E3'
    },
    blue: {
        primary: '#1e90ff',
        secondary: '#D1E8FF'
    },
    yellow: {
        primary: '#e3bc08',
        secondary: '#FDF1BA'
    }
};

@Component({
    selector: 'app-appointment-container',
    templateUrl: './appointment-container.component.html',
    styleUrls: ['./appointment-container.component.scss']
})
export class AppointmentContainerComponent implements OnInit {
    appointments$: Observable<AppointmentModel[]>;


    view: CalendarView = CalendarView.Month;

    calendarView = CalendarView;

    viewDate: Date = new Date();

    activeDayIsOpen = true;

    constructor(private appointmentS: AppointmentService) {
    }

    ngOnInit() {
        this.appointments$ = this.appointmentS.list();
    }


    handleEvent(action: string, event: any): void {
        console.log('handleEvent', action, event);
    }


    setView(view: CalendarView) {
        this.view = view;
    }

    closeOpenMonthViewDay() {
        this.activeDayIsOpen = false;
    }
}
