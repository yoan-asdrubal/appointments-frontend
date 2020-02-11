import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AppointmentFormModel} from '@app/core/model/appointment/appointment.model';
import {FormGroup} from '@angular/forms';
import {RxFormBuilder} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-appointment-dialog',
    templateUrl: './appointment-dialog.component.html',
    styleUrls: ['./appointment-dialog.component.css']
})
export class AppointmentDialogComponent implements OnInit {

    form: FormGroup;

    constructor(private formB: RxFormBuilder,
                @Optional() @Inject(MAT_DIALOG_DATA) public data: AppointmentFormModel | any) {
    }

    ngOnInit() {
        const appointments = new AppointmentFormModel();
        if (!!this.data) {
            // console.log('ngOnInit', this.data);

            appointments.id = this.data.id || '';
            appointments.date = this.data.date || '';
            appointments.timeInit = this.data.timeStart || '';
            appointments.timeEnd = this.data.timeEnd || '';
            appointments.subject = this.data.subject || '';
            appointments.description = this.data.description || '';
            appointments.area = this.data.area || '';

        }
        this.form = this.formB.formGroup(appointments);
        // console.log('this.form.value', this.form.get('date').value);

    }


}
