import {Injectable} from '@angular/core';
import {PersonaState, PersonaStore} from './persona.store';
import {AppointmentQuery} from "./appointment.query";
import {BaseService} from "../../core/redux/base.service";
import {createPersona, AppointmentModel} from "./appointment.model";

@Injectable({providedIn: 'root'})
export class PersonaService extends BaseService<PersonaState, AppointmentModel> {

    constructor(private personaStore: PersonaStore, private personaQuery: AppointmentQuery) {
        super(personaStore, personaQuery)
    }

    createFunction(): Function {
        return createPersona;
    }
}
