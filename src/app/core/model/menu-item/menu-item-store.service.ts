import {Injectable} from '@angular/core';
import {StoreConfig} from '@datorama/akita';
import {BaseState, BaseStore, createInitialState} from '@app/core/datasource/redux/base.store';

export interface AppointmentState extends BaseState {

}

const initialState = createInitialState({});

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'appointment'})
export class AppointmentStore extends BaseStore<AppointmentState> {

    constructor() {
        super(initialState);
    }

}

