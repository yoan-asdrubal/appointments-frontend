import {Injectable} from '@angular/core';
import {StoreConfig} from '@datorama/akita';
import {BaseState, BaseStore, createInitialState} from "../../core/redux/base.store";

export interface PersonaState extends BaseState {

}

const initialState = createInitialState({})

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'persona'})
export class PersonaStore extends BaseStore<PersonaState> {

    constructor() {
        super(initialState);
    }

}

