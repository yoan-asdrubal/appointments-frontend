import {Injectable} from '@angular/core';
import {MenuItemState, MenuItemStore} from './menu-item-store.service';
import {BaseQuery} from '@app/core/datasource/redux/base.query';

@Injectable({
    providedIn: 'root'
})
export class MenuItemQuery extends BaseQuery<MenuItemState> {

    constructor(protected store: MenuItemStore) {
        super(store);
    }
}
