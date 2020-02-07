import {Injectable} from '@angular/core';
import {PersonaState, PersonaStore} from './persona.store';
import {BaseQuery} from "../../core/redux/base.query";

@Injectable({
    providedIn: 'root'
})
export class PersonaQuery extends BaseQuery<PersonaState> {

    constructor(protected store: PersonaStore) {
        super(store);
    }
}
