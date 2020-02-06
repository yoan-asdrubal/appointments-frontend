import {EntityState, QueryEntity} from '@datorama/akita';
import {BaseState, BaseStore} from './base.store';


export class BaseQuery<T extends BaseState | EntityState> extends QueryEntity<T> {

    constructor(protected store: BaseStore<T>) {
        super(store);
    }
    selectUltimo = this.selectLast();
}
