import {ID} from '@datorama/akita';

export interface MenuItemModel {
    id: ID;
    route: string;
    label: string;
    cy: string;
}

/**
 * A factory function that creates MenuItemModel
 */
export function createMenuItem({id, route, label, cy}: Partial<MenuItemModel>) {
    return {id: id, route: route, label: label, cy: cy} as MenuItemModel;
}
