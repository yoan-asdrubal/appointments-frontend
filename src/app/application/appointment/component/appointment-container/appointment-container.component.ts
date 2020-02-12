import {Component, OnInit} from '@angular/core';
import {AppointmentService} from '@app/core/model/appointment/appointment.service';
import {Observable} from 'rxjs';
import {AppointmentModel} from '@app/core/model/appointment/appointment.model';
import {CalendarView} from 'angular-calendar';
import {MatDialog} from '@angular/material/dialog';
import {AppointmentDialogComponent} from '@app/application/appointment/component/appointment-dialog/appointment-dialog.component';

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

    action = 'today';

    calendarView = CalendarView;

    viewDate: Date = new Date();

    activeDayIsOpen = true;

    excludeDays: number[] = [0, 6];

    dayStartHour = 8;

    dayEndHour = 17;

    constructor(private appointmentS: AppointmentService, public dialog: MatDialog) {
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

    openAppointmentDialog(date) {
        console.log('openAppointmentDialog', date);
        const dialogRef = this.dialog.open(AppointmentDialogComponent, {
            width: '250px',
            data: {date: date}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed', result);
        });
    }
}
