import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AlertComponent} from '@app/core/notifications/components/alert/alert.component';
import {Alert, AlertType} from '@app/core/notifications/domain/notifications.model';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('AlertComponent', () => {
    let component: AlertComponent;
    let componentFixture: ComponentFixture<AlertComponent>;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule],
            declarations: [
                AlertComponent
            ]
        });

    }));

    beforeEach(async(() => {
        componentFixture = TestBed.createComponent(AlertComponent);
        component = componentFixture.componentInstance;
        componentFixture.detectChanges();

    }));

    it('should be created', function() {
        expect(component).toBeTruthy();
    });

    it('should show alert info', function() {
        const checkSpecificAlert = (alertClass, alertObject: Alert) => {
            component.alert = alertObject;
            componentFixture.detectChanges();
            expect(componentFixture.nativeElement.querySelector(`div.alert.alert-${alertClass}`)).toBeTruthy();
            expect(componentFixture.nativeElement.querySelector('div.title h3').innerHTML).toEqual(alert.title);
            expect(componentFixture.nativeElement.querySelector('div.message').innerHTML).toEqual(alert.message);

        };

        let alert: Alert = new Alert(AlertType.SUCCESS, 'Alert Success', 'Show Alert success');
        checkSpecificAlert('success', alert);

        alert = new Alert(AlertType.DANGER, 'Alert Danger', 'Show Alert Danger');
        checkSpecificAlert('danger', alert);

        alert = new Alert(AlertType.INFO, 'Alert Info', 'Show Alert Info');
        checkSpecificAlert('info', alert);

        alert = new Alert(AlertType.WARNING, 'Alert Warning', 'Show Alert Warning');
        checkSpecificAlert('warning', alert);


    });

});
