import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AppointmentFormModel} from '@app/core/model/appointment/appointment.model';
import {FormGroup} from '@angular/forms';
import {RxFormBuilder} from '@rxweb/reactive-form-validators';
import {DatePipe} from '@angular/common';

@Component({
    selector: 'app-appointment-dialog',
    templateUrl: './appointment-dialog.component.html',
    styleUrls: ['./appointment-dialog.component.scss']
})
export class AppointmentDialogComponent implements OnInit {

    form: FormGroup;

    minDate = new Date();

    constructor(private formB: RxFormBuilder,
                private dialogRef: MatDialogRef<AppointmentDialogComponent>,
                @Optional() @Inject(MAT_DIALOG_DATA) public data: AppointmentFormModel | any) {
    }

    ngOnInit() {
        const appointment = new AppointmentFormModel();
        if (!!this.data) {
            // console.log('ngOnInit', this.data);
            appointment.id = this.data.id || '';
            appointment.date = this.data.date || '';
            appointment.timeInit = this.data.timeInit || '';
            appointment.timeEnd = this.data.timeEnd || '';
            appointment.subject = this.data.subject || '';
            appointment.description = this.data.description || '';
            appointment.area = this.data.area || '';
        }
        if ((!appointment.id || appointment.id === '') && !!appointment.date) {
            const pipe = new DatePipe('en');
            let timeInit = pipe.transform(appointment.date, 'hh:mm');
            let date = appointment.date;
            const hour = new Date(date).getHours();
            if (date.toString().indexOf('00:00:00') > -1) {
                timeInit = '8:00 AM';
            } else if (hour > 12) {
                timeInit = `${hour - 12}:${new Date(date).getMinutes()} PM`;
            } else if (hour === 12) {
                timeInit += ' PM';
            } else {
                timeInit += ' AM';
            }

            date = pipe.transform(appointment.date, 'MM-dd-yyyy');


            appointment.date = date;
            appointment.timeInit = timeInit;
            appointment.timeEnd = '05:00 PM';
        }
        this.form = this.formB.formGroup(appointment);

    }

    submit() {
        if (this.form.valid) {
            this.dialogRef.close(this.form.value);
        } else {
            console.log('INVALID', this.form.value);
        }
    }

}
