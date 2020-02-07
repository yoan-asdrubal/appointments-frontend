/*
 *
 * Yoan Asdrubal Quintana Ramirez.
 *  4/4/2019
 *
 */


// Nombres de datasources para ser referenciados desde cualquier parte de la app

import {DatasourceConfig} from './datasource.config';
// @ts-ignore
import {environment} from '@env/environment';

export const DATASOURCE_NAMES = {
    MODEL_APPOINTMENT: 'AppointmentModel',
    MODEL_MENU_ITEM: 'MenuItemModel'
};

export const DATASOURCE_CONFIG: DatasourceConfig = {
    datasources: {
        AppointmentModel: {
            model: DATASOURCE_NAMES.MODEL_APPOINTMENT,
            url: environment.api.appointment,
            api: {
                LIST: {method: 'GET', url: '', name: 'List Appointment'},
                GET: {method: 'GET', url: '/{id}', name: 'Get Appointment info'},
                POST: {method: 'POST', url: '', name: 'Save Appointment'},
                PUT: {method: 'POST', url: '', name: 'Update Appointment'},
                DELETE: {method: 'DELETE', url: '/{id}', name: 'Delete Appointment'},
            },
        },
        MenuItemModel: {
            model: DATASOURCE_NAMES.MODEL_MENU_ITEM,
            url: environment.api.menu,
            api: {
                LIST: {method: 'GET', url: '', name: 'List Menu Navigation'},
            }
        }
    }
};
