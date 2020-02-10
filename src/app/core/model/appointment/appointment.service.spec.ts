import {async, TestBed} from '@angular/core/testing';

import {AppointmentService} from './appointment.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AppointmentStore} from '@app/core/model/appointment/appointment.store';
import {AppointmentQuery} from '@app/core/model/appointment/appointment.query';
import {DatasourceService} from '@app/core/datasource/domain/datasource.service';
import {DATASOURCE_CONFIG, DATASOURCE_NAMES} from '@app/core/datasource/datasource.url.config';
import {DATASOURCE_ROOT_CONFIG} from '@app/core/datasource/datasource.config';
import {Datasource} from '@app/core/datasource/domain/datasource.model';
import {appointmentMockData} from '@app/core/model/appointment/appointment.model';
import {skip} from 'rxjs/operators';

describe('AppointmentService', () => {
    /**
     * Get AppointmentModel datasource configuration
     */
    const model = DATASOURCE_NAMES.MODEL_APPOINTMENT;
    const datasource: Datasource = DATASOURCE_CONFIG.datasources[model];

    /**
     * Use same configuration from datasource.config.url,
     * declare local datasource config test to use only appointment datasource configuration
     */
    const DATASOURCE_CONFIG_TEST = {datasources: {}};
    DATASOURCE_CONFIG_TEST.datasources[model] = datasource;

    const keys = ['id', 'date', 'timeInit', 'timeEnd', 'subject', 'description', 'area'];

    let httpClientController: HttpTestingController;
    let service: AppointmentService;
    beforeEach(async(() => TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
        , providers: [
            AppointmentStore,
            AppointmentQuery,
            AppointmentService,
            {
                provide: DATASOURCE_ROOT_CONFIG, useValue: DATASOURCE_CONFIG_TEST
            },
            DatasourceService]
    })));

    beforeEach(() => {
        service = TestBed.get(AppointmentService);
        httpClientController = TestBed.get(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return list of appointment when list', async(function() {
        const data = appointmentMockData;
        service.list().pipe(skip(1))
            .subscribe((response: any[]) => {

                expect(response.length).toEqual(data.length);
                data.forEach((val, ind) => {
                    keys.forEach(prop => {
                        expect(val[prop]).toBeDefined();
                        expect(response[ind][prop]).toBeDefined();
                        expect(val[prop]).toEqual(response[ind][prop]);
                    });
                });
            });


        const req = httpClientController.expectOne(`${datasource.url}${datasource.api['LIST'].url}`);
        expect(req.request.method).toEqual('GET');

        req.flush(data);
    }));
});
