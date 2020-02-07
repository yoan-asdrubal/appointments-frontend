import {guid, ID} from '@datorama/akita';

export interface PersonaModel {
    id: ID;
    nombre: string;
    edad: number;
}

/**
 * A factory function that creates PersonaModel
 */
export function createPersona({nombre, edad}: Partial<PersonaModel>) {
    return {id: guid(), nombre, edad} as PersonaModel;
}
