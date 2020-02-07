import {Injectable} from '@angular/core';
import {MenuItemState, MenuItemStore} from './menu-item-store.service';
import {MenuItemQuery} from './menu-item-query.service';
import {createMenuItem, MenuItemModel} from './menu-item.model';
import {BaseService} from '@app/core/datasource/redux/base.service';
import {DatasourceService} from '@app/core/datasource/domain/datasource.service';
import {DATASOURCE_NAMES} from '@app/core/datasource/datasource.url.config';

const model = DATASOURCE_NAMES.MODEL_MENU_ITEM;

@Injectable({providedIn: 'root'})
export class MenuItemService extends BaseService<MenuItemState, MenuItemModel> {

    constructor(private menuItemStore: MenuItemStore
        , private menuItemQuery: MenuItemQuery
        , datasource: DatasourceService) {
        super(menuItemStore, menuItemQuery, datasource);
    }

    createFunction(): Function {
        return createMenuItem;
    }

    model(): string {
        return model;
    }
}
