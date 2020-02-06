import {TestBed} from '@angular/core/testing';
import {NotificationsService} from '@app/core/notifications/domain/notifications.service';

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

});
