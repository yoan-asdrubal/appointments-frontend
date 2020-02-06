import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AlertAreaComponent} from '@app/core/notifications/components/alert-area/alert-area.component';
import {AlertComponent} from '@app/core/notifications/components/alert/alert.component';
import {NotificationsService} from '@app/core/notifications/domain/notifications.service';
import {Alert, AlertType} from '@app/core/notifications/domain/notifications.model';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('AlertAreaComponent', () => {
    let service: NotificationsService;
    let componentFixture: ComponentFixture<AlertAreaComponent>;
    let component: AlertAreaComponent;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule],
            declarations: [AlertAreaComponent, AlertComponent],
            providers: [NotificationsService]
        });
    }));
    beforeEach(() => {
        service = TestBed.get(NotificationsService);
        componentFixture = TestBed.createComponent(AlertAreaComponent);
        component = componentFixture.componentInstance;
        componentFixture.detectChanges();
    });

    afterEach(() => {
        jest.clearAllTimers();
    });
    it('should created', function() {
        expect(component).toBeTruthy();
    });
    it('should show notifications and dismiss each one after 5000 ms', function() {
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


    });
});
