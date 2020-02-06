import {TestBed} from '@angular/core/testing';

import {DatasourceService} from './datasource.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {DATASOURCE_ROOT_CONFIG, DatasourceConfig} from '../datasource.config';
import {DatasourceOption} from '@app/core/datasource/domain/datasource.model';

describe('DatasourceService', () => {
    const apiUrl = 'http://localhost:8080/api/todo';

    const DATASOURCE_CONFIG_TEST: DatasourceConfig = {
        datasources: {
            TodoModel: {
                model: 'TodoModel',
                url: apiUrl,
                api: {
                    LIST: {method: 'GET', url: '', name: 'List Todo'},
                    GET: {method: 'GET', url: '/{id}', name: 'Get Todo info'},
                    POST: {method: 'POST', url: '', name: 'Save Todo'},
                    PUT: {method: 'POST', url: '', name: 'Update Todo'},
                    DELETE: {method: 'DELETE', url: '/{id}', name: 'Delete Todo'},
                    CHECK_ALL: {method: 'POST', url: '/{id}', name: 'Save Todo'},
                },
            },
            StaticModel: {
                model: 'StaticModel',
                items: [
                    {
                        id: 1,
                        label: 'Static 1',
                        value: 'Static1'
                    }, {
                        id: 2,
                        label: 'Static 2',
                        value: 'Static2'
                    }
                ]
            }
        }
    };
    let service: DatasourceService;
    let httpTestingController: HttpTestingController;
    const model = 'TodoModel';
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [{provide: DATASOURCE_ROOT_CONFIG, useValue: DATASOURCE_CONFIG_TEST}
                , DatasourceService
            ]
        });
        service = TestBed.get(DatasourceService);
        httpTestingController = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });


    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should GET request without params', function() {
        const todos = [
            'Todo 1', 'Todo 2', 'Todo 3'
        ];

        service.request(model, 'LIST')

            .subscribe(response => expect(response).toEqual(todos));

        const req = httpTestingController.expectOne(`${apiUrl}`);

        expect(req.request.method).toEqual('GET');
        expect(req.request.params.keys.length).toEqual(0);

        req.flush(todos);
    });

    it('should GET request with url params', function() {
        const todo = {
            id: 1,
            subject: 'Todo to test request with url params'
        };

        const datasourceOption: DatasourceOption = {
            urlParams: {
                id: todo.id
            }
        };
        service.request(model, 'GET', datasourceOption)

            .subscribe(response => {
                expect(response.id).toEqual(todo.id);
                expect(response.subject).toEqual(todo.subject);
            });

        const req = httpTestingController.expectOne(`${apiUrl}/${todo.id}`);

        expect(req.request.method).toEqual('GET');

        req.flush(todo);
    });

    it('should POST request with body params', function() {
        const todo = {
            id: 1,
            subject: 'Todo test',
            description: 'Todo to test request with url params'
        };

        const datasourceOption: DatasourceOption = {
            body: todo
        };
        service.request(model, 'POST', datasourceOption)

            .subscribe(response => {
                expect(response.id).toEqual(todo.id);
                expect(response.subject).toEqual(todo.subject);
                expect(response.description).toEqual(todo.description);
            });

        const req = httpTestingController.expectOne(`${apiUrl}`);

        expect(req.request.method).toEqual('POST');

        const body = req.request.body;

        expect(body.id).toEqual(todo.id);
        expect(body.subject).toEqual(todo.subject);
        expect(body.description).toEqual(todo.description);

        req.flush(todo);
    });

    it('should  request with url params, query params and body', function() {
        const todo = {
            id: 1,
            subject: 'Todo test',
            description: 'Todo to test request with url params'
        };

        const datasourceOption: DatasourceOption = {
            queryParams: {
                tested: true,
                search: 'test',
                size: 1
            },
            urlParams: {
                id: todo.id
            },
            body: todo
        };
        service.request(model, 'CHECK_ALL', datasourceOption)

            .subscribe(response => {
                expect(response.id).toEqual(todo.id);
                expect(response.subject).toEqual(todo.subject);
                expect(response.description).toEqual(todo.description);
            });

        const req = httpTestingController.expectOne(`${apiUrl}/${todo.id}?tested=true&search=test&size=1`);

        expect(req.request.method).toEqual('POST');

        const body = req.request.body;

        expect(body.id).toEqual(todo.id);
        expect(body.subject).toEqual(todo.subject);
        expect(body.description).toEqual(todo.description);

        const params = req.request.params;
        expect(params.get('tested')).toBeTruthy();
        expect(+params.get('size')).toEqual(1);
        expect(params.get('search')).toBe('test');

        req.flush(todo);
    });

    it('should return items of static model', function() {
        service.request('StaticModel', '')

            .subscribe((response: any[]) => {
                expect(response.length).toEqual(2);
                const item1 = response[0];
                expect(item1.id).toEqual(1);
                expect(item1.label).toEqual('Static 1');
                expect(item1.value).toEqual('Static1');

                const item2 = response[1];
                expect(item2.id).toEqual(2);
                expect(item2.label).toEqual('Static 2');
                expect(item2.value).toEqual('Static2');
            });
    });
});
