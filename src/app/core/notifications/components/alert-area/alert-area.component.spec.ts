import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AlertAreaComponent} from '@app/core/notifications/components/alert-area/alert-area.component';
import {AlertComponent} from '@app/core/notifications/components/alert/alert.component';
import {NotificationService} from '@app/core/notifications/domain/notification.service';
import {Alert, AlertType} from '@app/core/notifications/domain/notifications.model';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('AlertAreaComponent', () => {
    let service: NotificationService;
    let componentFixture: ComponentFixture<AlertAreaComponent>;
    let component: AlertAreaComponent;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule],
            declarations: [AlertAreaComponent, AlertComponent],
            providers: [NotificationService]
        });
    }));
    beforeEach(() => {
        service = TestBed.get(NotificationService);
        componentFixture = TestBed.createComponent(AlertAreaComponent);
        component = componentFixture.componentInstance;
        componentFixture.detectChanges();
    });

    it('should created', function() {
        expect(component).toBeTruthy();
    });


    it('should show notifications ,dismiss after 5000 ms and close by user action', function() {
        jest.useFakeTimers();

        service.show(new Alert(AlertType.SUCCESS, 'Alert Success', 'Show Alert Success'));

        setTimeout(() => {
            service.show(new Alert(AlertType.DANGER, 'Alert Danger', 'Show Alert Danger'));

        }, 1000);
        setTimeout(() => {
            service.show(new Alert(AlertType.INFO, 'Alert Info', 'Show Alert Info'));

        }, 2000);
        setTimeout(() => {
            service.show(new Alert(AlertType.WARNING, 'Alert Warning', 'Show Alert Warning'));

        }, 3000);

        jest.advanceTimersByTime(4000);

        componentFixture.detectChanges();

        expect(componentFixture.nativeElement.querySelectorAll('alert').length).toEqual(4);

        // To dismiss Alert Success
        jest.advanceTimersByTime(1000);
        componentFixture.detectChanges();
        expect(componentFixture.nativeElement.querySelector('alert-success')).toBeFalsy();
        expect(componentFixture.nativeElement.querySelectorAll('alert').length).toEqual(3);

        // To dismiss next one, Alert Danger
        jest.advanceTimersByTime(1000);
        componentFixture.detectChanges();
        expect(componentFixture.nativeElement.querySelector('alert-danger')).toBeFalsy();
        expect(componentFixture.nativeElement.querySelectorAll('alert').length).toEqual(2);

        // To dismiss next one, Alert Info
        jest.advanceTimersByTime(1000);
        componentFixture.detectChanges();
        expect(componentFixture.nativeElement.querySelector('alert-info')).toBeFalsy();
        expect(componentFixture.nativeElement.querySelectorAll('alert').length).toEqual(1);

        // To dismiss next one, Alert Warning
        jest.advanceTimersByTime(1000);
        componentFixture.detectChanges();
        expect(componentFixture.nativeElement.querySelector('alert-warning')).toBeFalsy();
        expect(componentFixture.nativeElement.querySelector('alert')).toBeFalsy();

        const successAlert = new Alert(AlertType.SUCCESS, 'Alert Success', 'Show Alert Success');
        const dangerAlert = new Alert(AlertType.DANGER, 'Alert Danger', 'Show Alert Danger');
        service.show(successAlert);
        setTimeout(() => {
            service.show(dangerAlert);
        }, 1000);

        jest.advanceTimersByTime(1000);
        componentFixture.detectChanges();
        expect(componentFixture.nativeElement.querySelectorAll('alert').length).toEqual(2);

        // Close Danger Alert after 1000 ms
        jest.advanceTimersByTime(1000);
        componentFixture.detectChanges();

        componentFixture.nativeElement.querySelector('.alert-danger .btn-close img').click();
        componentFixture.detectChanges();

        expect(componentFixture.nativeElement.querySelector('alert-danger')).toBeFalsy();
        expect(componentFixture.nativeElement.querySelectorAll('alert').length).toEqual(1);

        jest.advanceTimersByTime(1000);
        componentFixture.detectChanges();

        // Close Success Alert 1000 ms later
        componentFixture.nativeElement.querySelector('.alert-success .btn-close img').click();

        componentFixture.detectChanges();
        expect(componentFixture.nativeElement.querySelector('alert-success')).toBeFalsy();
        expect(componentFixture.nativeElement.querySelectorAll('alert').length).toEqual(0);

    });

    // it('should close alert by user action', function() {
    //
    //
    //     jest.useFakeTimers();
    //
    //     const successAlert = new Alert(AlertType.SUCCESS, 'Alert Success', 'Show Alert Success');
    //     const dangerAlert = new Alert(AlertType.DANGER, 'Alert Danger', 'Show Alert Danger');
    //     service.show(successAlert);
    //     setTimeout(() => {
    //         service.show(dangerAlert);
    //     }, 1000);
    //
    //     jest.advanceTimersByTime(1000);
    //     componentFixture.detectChanges();
    //     expect(componentFixture.nativeElement.querySelectorAll('alert').length).toEqual(2);
    //
    //     // Close Danger Alert after 1000 ms
    //     jest.advanceTimersByTime(1000);
    //     componentFixture.detectChanges();
    //
    //     componentFixture.nativeElement.querySelector('.alert-danger .btn-close img').click();
    //     componentFixture.detectChanges();
    //
    //     expect(componentFixture.nativeElement.querySelector('alert-danger')).toBeFalsy();
    //     expect(componentFixture.nativeElement.querySelectorAll('alert').length).toEqual(1);
    //
    //     jest.advanceTimersByTime(1000);
    //     componentFixture.detectChanges();
    //
    //     // Close Success Alert 1000 ms later
    //     componentFixture.nativeElement.querySelector('.alert-success .btn-close img').click();
    //
    //     componentFixture.detectChanges();
    //     expect(componentFixture.nativeElement.querySelector('alert-success')).toBeFalsy();
    //     expect(componentFixture.nativeElement.querySelectorAll('alert').length).toEqual(0);
    //
    //     jest.clearAllTimers();
    // });


});
