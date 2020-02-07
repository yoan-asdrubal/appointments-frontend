import {Injectable} from '@angular/core';
import {StoreConfig} from '@datorama/akita';
import {BaseState, BaseStore, createInitialState} from '@app/core/datasource/redux/base.store';

export interface MenuItemState extends BaseState {

}

const initialState = createInitialState({});

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'appointment'})
export class MenuItemStore extends BaseStore<MenuItemState> {

    constructor() {
        super(initialState);
    }

}

