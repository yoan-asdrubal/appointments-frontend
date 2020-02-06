/*
 *
 * Yoan Asdrubal Quintana Ramirez.
 *  4/4/2019
 *
 */

import {ModuleWithProviders, NgModule} from '@angular/core';
import {DatasourceService} from './domain/datasource.service';
import {DATASOURCE_ROOT_CONFIG, DatasourceConfig} from './datasource.config';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
    imports: [
        HttpClientModule,
    ],
    providers: [DatasourceService]
})
export class DatasourceModule {

    static forRoot(datasourceConfig: DatasourceConfig): ModuleWithProviders {
        return {
            ngModule: DatasourceModule,
            providers: [{provide: DATASOURCE_ROOT_CONFIG, useValue: datasourceConfig}]
        };
    }

}
