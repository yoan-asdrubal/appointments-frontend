/*
 *
 * Yoan Asdrubal Quintana Ramirez.
 *  4/4/2019
 *
 */

import {InjectionToken} from '@angular/core';
import {Datasource} from './domain/datasource.model';


export const DATASOURCE_ROOT_CONFIG = new InjectionToken<DatasourceConfig>('DATASOURCE_ROOT_CONFIG');

export class DatasourceConfig {
	baseAbsoluteUrl?: string;
	datasources?: { [id: string]: Datasource };
}
