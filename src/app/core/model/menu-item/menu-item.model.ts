import {ID} from '@datorama/akita';

export interface MenuItemModel {
    id: ID;
    route: string;
    label: string;
}

/**
 * A factory function that creates MenuItemModel
 */
export function createAppointment({id, route, label}: Partial<MenuItemModel>) {
    return {id: id, route: route, label: label} as MenuItemModel;
}
