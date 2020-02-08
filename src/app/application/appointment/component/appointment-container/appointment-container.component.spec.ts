import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AppointmentContainerComponent} from './appointment-container.component';
import {appointmentMockData} from '@app/core/model/appointment/appointment.model';
import {AppointmentService} from '@app/core/model/appointment/appointment.service';
import {of} from 'rxjs';

describe('AppointmentContainerComponent', () => {
    let component: AppointmentContainerComponent;
    let fixture: ComponentFixture<AppointmentContainerComponent>;
    let service: AppointmentService | any;
    const data = appointmentMockData;
    beforeEach(async(() => {
        service = {
            list: jest.fn(() => {
                return of(data);
            })
        };

        TestBed.configureTestingModule({
            declarations: [AppointmentContainerComponent]
            , providers: [
                {provide: AppointmentService, useValue: service}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppointmentContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get list of appointments', function() {
        const appointments$ = component.appointments$;
        appointments$.pipe().subscribe((items: any[]) => {
            expect(items.length).toEqual(3);
            expect(items).toEqual(data);
        });
        expect(service.list).toHaveBeenCalled();
        expect(service.list).toHaveBeenCalledTimes(1);
    });
});
