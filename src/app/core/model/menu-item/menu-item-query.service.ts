import {Injectable} from '@angular/core';
import {AppointmentState, MenuItemStore} from './menu-item-store.service';
import {BaseQuery} from '@app/core/datasource/redux/base.query';

@Injectable({
    providedIn: 'root'
})
export class MenuItemQuery extends BaseQuery<AppointmentState> {

    constructor(protected store: MenuItemStore) {
        super(store);
    }
}
