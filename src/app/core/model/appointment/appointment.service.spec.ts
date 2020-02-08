import {TestBed} from '@angular/core/testing';

import {AppointmentService} from './appointment.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AppointmentStore} from '@app/core/model/appointment/appointment.store';
import {AppointmentQuery} from '@app/core/model/appointment/appointment.query';
import {DatasourceService} from '@app/core/datasource/domain/datasource.service';
import {DATASOURCE_CONFIG, DATASOURCE_NAMES} from '@app/core/datasource/datasource.url.config';
import {DATASOURCE_ROOT_CONFIG} from '@app/core/datasource/datasource.config';
import {Datasource} from '@app/core/datasource/domain/datasource.model';
import {appointmentMockData} from '@app/core/model/appointment/appointment.model';

describe('AppointmentService', () => {
    const model = DATASOURCE_NAMES.MODEL_APPOINTMENT;
    const datasource: Datasource = DATASOURCE_CONFIG.datasources[model];
    const data = appointmentMockData;

    let httpClientController: HttpTestingController;
    let service: AppointmentService;
    beforeEach(() => TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
        , providers: [
            AppointmentStore,
            AppointmentQuery,
            AppointmentService,
            {
                provide: DATASOURCE_ROOT_CONFIG, useValue: DATASOURCE_CONFIG
            },
            DatasourceService]
    }));

    beforeEach(() => {
        service = TestBed.get(AppointmentService);
        httpClientController = TestBed.get(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return list of appointment when list', function() {

        service.list()
            .subscribe((response: any[]) => {
                expect(response.length).toEqual(3);
                expect(response).toEqual(data);
            });

        const req = httpClientController.expectOne(`${datasource.url}${datasource.api['LIST'].url}`);
        expect(req.request.method).toEqual('GET');
        req.flush(data);
    });
});
