import {TestBed} from '@angular/core/testing';
import {NotificationsService} from '@app/core/notifications/domain/notifications.service';
import {Alert, AlertType} from '@app/core/notifications/domain/notifications.model';

describe('DatasourceService', () => {
    let service: NotificationsService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [NotificationsService]
        });
        service = TestBed.get(NotificationsService);
    });


    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should add Alert and delete after 5000 ms', function() {
        jest.useFakeTimers();
        const alert: Alert = new Alert(AlertType.SUCCESS, 'Message', 'Testing Alert success');
        service.show(alert);
        expect(service.alerts.length).toEqual(1);

        jest.advanceTimersByTime(2000);

        expect(service.alerts.length).toEqual(1);

        jest.advanceTimersByTime(3000);
        // jest.runAllTimers();
        expect(service.alerts.length).toEqual(0);
    });
});
