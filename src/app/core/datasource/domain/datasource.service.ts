import {Inject, Injectable, Optional} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Datasource, DatasourceAPI, DatasourceOption} from './datasource.model';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
// @ts-ignore
import {DATASOURCE_ROOT_CONFIG, DatasourceConfig} from '@app/core/datasource/datasource.config';
import {catchError, tap} from 'rxjs/operators';
import {NotificationsService} from '@app/core/notifications/domain/notifications.service';
import {Alert} from '@app/core/notifications/domain/notifications.model';

@Injectable({
    providedIn: 'root'
})
export class DatasourceService {

    constructor(
        private _http: HttpClient,
        @Inject(DATASOURCE_ROOT_CONFIG) private _dsConfig: DatasourceConfig,
        @Optional() private notificationS: NotificationsService
    ) {
        this._setBaseHrefToUrls();
    }

    request(model: string, action: string, options: DatasourceOption = {},
            staticOptions: { showError?: boolean } = {showError: true}): Observable<any> {

        const ds = this._dsConfig.datasources[model];

        if (ds.items) {
            return of(ds.items);
        }

        const api: DatasourceAPI = this.getDatasourceApi(model, action);
        const url = this._resolveUrl(api, options);

        const requestOptions = this._resolveReqOptions(options);

        // console.log('BODY', api, url, requestOptions);
        return this._http.request(api.method, url, requestOptions)
            .pipe(
                tap((response: any) => {
                    if (response.statusCode !== 200 && response !== true) {
                        throw response;
                    }
                }),
                catchError((err: HttpErrorResponse) => {
                    if (staticOptions.showError && !!this.notificationS) {
                        const a: Alert = Alert.of(api.method, err, api.name);
                        this.notificationS.show(a);
                    }
                    throw err;

                })
            );


    }


    get(model: string): Datasource {
        return this._dsConfig.datasources[model];
    }


    getDatasourceApi(model: string, action: string): DatasourceAPI {
        return this.get(model).api[action];
    }


    baseHref() {
        return this._dsConfig.baseAbsoluteUrl;
    }


    private _resolveUrl(api: DatasourceAPI, options: DatasourceOption): string {
        const url = api.url;

        if (!options.urlParams) {
            return url;
        }

        return this._resolveUrlParams(url, options.urlParams);
    }


    private _resolveParams(options: DatasourceOption): HttpParams {

        let config = {};
        const queryParams = options.queryParams;

        if (options.queryParams) {
            config = Object.assign({}, config, queryParams);
        }

        let params = new HttpParams();
        const keys = Object.keys(config);

        for (let i = 0; i < keys.length; i++) {
            const newParam: any = config[keys[i]];
            params = params.append(keys[i], newParam);
        }

        return params;
    }

    private _resolveHeaders(): HttpHeaders {

        let headers = new HttpHeaders();

        headers = headers.set('Content-Type', 'application/json');

        return headers;
    }

    private _resolveUrlParams(url: string, urlParams: any) {
        if (!urlParams) {
            return url;
        }

        return Object.keys(urlParams).reduce((_url, key) => {
            return _url.replace(new RegExp('{' + key + '}', 'g'), urlParams[key]);
        }, url);
    }

    private _resolveBodyParam(options: DatasourceOption) {
        return options.body || {};
    }

    private _resolveReqOptions(options: DatasourceOption) {

        return {
            params: this._resolveParams(options),
            headers: this._resolveHeaders(),
            body: this._resolveBodyParam(options)
        };

    }

    private _setBaseHrefToUrls() {

        const absUrl = this.baseHref();
        const dsIds = Object.keys(this._dsConfig.datasources);


        for (let i = 0; i < dsIds.length; i++) {
            const datasource = this.get(dsIds[i]);
            const api = this.get(dsIds[i]).api;

            if (!api) {
                continue;
            }

            const actions = Object.keys(api);

            for (let j = 0; j < actions.length; j++) {

                const action = api[actions[j]];

                if (action.url.indexOf(absUrl) < 0) {
                    action.url = datasource.url + action.url;
                }

            }
        }
    }

    getDatasourceConfig() {
        return this._dsConfig;
    }
}
