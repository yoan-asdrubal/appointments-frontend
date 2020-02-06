import {inject, TestBed} from '@angular/core/testing';

import {DatasourceService} from './datasource.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {DATASOURCE_ROOT_CONFIG, DatasourceConfig} from '../datasource.config';

describe('DatasourceService', () => {
    const DATASOURCE_CONFIG_TEST: DatasourceConfig = {
        datasources: {
            TodoModel: {
                model: 'TodoModel',
                url: 'http://localhost:8080/api/test',
                api: {
                    LIST: {method: 'GET', url: '/', name: 'List Todo'},
                    GET: {method: 'GET', url: '/{id}', name: 'Get Todo info'},
                    POST: {method: 'POST', url: '/', name: 'Save Todo'},
                    PUT: {method: 'POST', url: '/', name: 'Update Todo'},
                    DELETE: {method: 'DELETE', url: '/{id}', name: 'Delete Todo'},
                },
            }
        }
    };
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [{provide: DATASOURCE_ROOT_CONFIG, useValue: DATASOURCE_CONFIG_TEST}
            ]
        });
    });

    it('should be created', inject([DatasourceService], (service: DatasourceService) => {
        expect(service).toBeTruthy();
    }));
});
