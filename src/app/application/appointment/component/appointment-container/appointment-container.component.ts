import {Component, OnInit} from '@angular/core';
import {AppointmentService} from '@app/core/model/appointment/appointment.service';
import {Observable} from 'rxjs';
import {AppointmentModel} from '@app/core/model/appointment/appointment.model';
import {CalendarView} from 'angular-calendar';
import {MatDialog} from '@angular/material/dialog';
import {AppointmentDialogComponent} from '@app/application/appointment/component/appointment-dialog/appointment-dialog.component';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import {CalendarEvent, EventAction, WeekDay, MonthView, MonthViewDay, ViewPeriod} from 'calendar-utils';

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
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: colors.yellow,
      actions: this.actions
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: colors.blue,
      allDay: true
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: addHours(new Date(), 2),
      title: 'A draggable and resizable event',
      color: colors.yellow,
      actions: this.actions,
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

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }
}
