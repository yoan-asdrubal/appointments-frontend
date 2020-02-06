import {EntityState, EntityStore} from '@datorama/akita';


export interface BaseState extends EntityState {

}

export const baseInitialState = {};


export class BaseStore<T extends BaseState | EntityState> extends EntityStore<T> {
    constructor(initialState: any = baseInitialState) {
        super(initialState);
    }
}

export const createInitialState = (state: any) => Object.assign({}, baseInitialState, state);
