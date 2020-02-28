import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppointmentService} from '@app/core/model/appointment/appointment.service';
import {Observable} from 'rxjs';
import {AppointmentModel} from '@app/core/model/appointment/appointment.model';
import {CalendarView} from 'angular-calendar';
import {MatDialog} from '@angular/material/dialog';
import {AppointmentDialogComponent} from '@app/application/appointment/component/appointment-dialog/appointment-dialog.component';
import {
  startOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import {CalendarEvent, EventAction, WeekDay, MonthView, MonthViewDay, ViewPeriod} from 'calendar-utils';
import {filter, map, tap} from 'rxjs/operators';
import {DatePipe} from '@angular/common';
import {untilDestroyed} from 'ngx-take-until-destroy';

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
export class AppointmentContainerComponent implements OnInit, OnDestroy {
  appointments$: Observable<AppointmentModel[]>;

  datePipe = new DatePipe('EN');

  view: CalendarView = CalendarView.Month;

  action = 'today';

  calendarView = CalendarView;

  viewDate: Date = new Date();

  activeDayIsOpen = true;

  excludeDays: number[] = [0, 6];

  dayStartHour = 8;

  dayEndHour = 17;

  actions: EventAction[] | any[] = [
    {
      label: 'Edit',
      icon: 'edit',
      a11yLabel: 'Edit',
      onClick: ({event}: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: 'Remove',
      icon: 'delete',
      a11yLabel: 'Remove',
      onClick: ({event}: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Removed', event);
      }
    }
  ];

  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: colors.red,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    }
  ];

  constructor(private appointmentS: AppointmentService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.appointments$ = this.appointmentS.list();
    this.appointments$
      .pipe(
        untilDestroyed(this),
        map((apps: AppointmentModel[]) => {
          return apps.map(ap => {
              const date = this.datePipe.transform(ap.date, 'MM-dd-yyyy');
              // console.log('ap date', ap, date);
              return {
                start: new Date(`${date} ${ap.timeInit}`),
                end: new Date(`${date} ${ap.timeEnd}`),
                title: ap.subject,
                color: colors.red,
                actions: this.actions,
                allDay: false,
                resizable: {
                  beforeStart: false,
                  afterEnd: false
                },
                draggable: false
              };
            }
          )
            ;
        }),
        tap((events: CalendarEvent[]) => this.events = events)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
  }

  dayClicked({date, events}: { date: Date; events: any[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
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
      width: '300px',
      data: {date: date}
    });

    dialogRef.afterClosed()
      .pipe(
        filter(result => !!result)
      )
      .subscribe(result => {
        console.log('result', result);
        this.appointmentS.add(result).subscribe();
      });
  }
}
