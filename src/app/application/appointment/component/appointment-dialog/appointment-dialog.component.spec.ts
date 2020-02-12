import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AppointmentDialogComponent} from './appointment-dialog.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule} from '@angular/material/dialog';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {OverlayContainer} from '@angular/cdk/overlay';
import {NgModule} from '@angular/core';
import {RxReactiveFormsModule} from '@rxweb/reactive-form-validators';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@NgModule({
    imports: [MatDialogModule, NoopAnimationsModule],
    exports: [MatDialogModule],
    entryComponents: [
        AppointmentDialogComponent
    ],
})
class DialogTestModule {
}

describe('AppointmentDialogComponent', () => {
    let component: AppointmentDialogComponent;
    let fixture: ComponentFixture<AppointmentDialogComponent>;
    let dialog: MatDialog;
    let overlayContainerElement: HTMLElement;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [DialogTestModule, RxReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule],
            declarations: [AppointmentDialogComponent],
            providers: [
                {
                    provide: OverlayContainer, useFactory: () => {
                        overlayContainerElement = document.createElement('div');
                        return {getContainerElement: () => overlayContainerElement};
                    }
                },
                {
                    provide: MAT_DIALOG_DATA, useValue: {}
                }
            ],
        })
        ;
    }));

    const initValues = () => {
        fixture = TestBed.createComponent(AppointmentDialogComponent);
        component = fixture.componentInstance;
        dialog = TestBed.inject(MatDialog);
        fixture.detectChanges();
    };

    it('should create', () => {
        TestBed.overrideProvider(MAT_DIALOG_DATA, {useValue: {}});
        TestBed.compileComponents();
        initValues();
        dialog.open(AppointmentDialogComponent);
        const appointmentDialog = overlayContainerElement.querySelector('app-appointment-dialog');
        expect(appointmentDialog).toBeTruthy();
    });

    it('should render with Date to create new Appointment ', async(function() {
        const data: any = {date: '2020-02-10'};
        TestBed.overrideProvider(MAT_DIALOG_DATA, {useValue: data});
        TestBed.compileComponents();
        initValues();
        dialog.open(AppointmentDialogComponent);
        fixture.detectChanges();

        const appointmentDialog = overlayContainerElement.querySelector('app-appointment-dialog');
        expect(appointmentDialog).toBeTruthy();
        expect(component.data).toEqual(data);
        const formValue = component.form.value;

        expect(formValue.date).toEqual(data.date);
        expect(formValue.id).toEqual('');
        expect(formValue.timeInit).toEqual('');
        expect(formValue.timeEnd).toEqual('');
        expect(formValue.subject).toEqual('');
        expect(formValue.description).toEqual('');
        expect(formValue.area).toEqual('');

        // const selectFormControlValue = (selector) => {
        //     const element = fixture.debugElement.query(By.css(`#${selector}`));
        //     expect(element).toBeTruthy();
        //     return element.nativeElement.value;
        // };
        // fixture.detectChanges();
        //
        // fixture.whenStable().then(() => {
        //     console.log('selectFormControlValue()', selectFormControlValue('date'));
        //     console.log('textContent', overlayContainerElement.querySelector('app-appointment-dialog').textContent);
        //
        //     expect(selectFormControlValue('date')).toEqual(data.date);
        //
        // });
    }));

    it('should init formGroup with default values to edit appointment', async(function() {
        const data: any = {
            id: 'id1',
            date: '2020-02-10',
            timeInit: '10:00 AM',
            timeEnd: '12:00 PM',
            subject: 'Todo Time',
            description: 'Time to make some todos',
            area: 'TodoArea'
        };
        TestBed.overrideProvider(MAT_DIALOG_DATA, {useValue: data});
        TestBed.compileComponents();
        initValues();
        dialog.open(AppointmentDialogComponent);
        fixture.detectChanges();

        const appointmentDialog = overlayContainerElement.querySelector('app-appointment-dialog');
        expect(appointmentDialog).toBeTruthy();
        expect(component.data).toEqual(data);
        const formValue = component.form.value;

        expect(formValue.date).toEqual(data.date);
        expect(formValue.id).toEqual(data.id);
        expect(formValue.timeInit).toEqual(data.timeInit);
        expect(formValue.timeEnd).toEqual(data.timeEnd);
        expect(formValue.subject).toEqual(data.subject);
        expect(formValue.description).toEqual(data.description);
        expect(formValue.area).toEqual(data.area);


    }));

});
