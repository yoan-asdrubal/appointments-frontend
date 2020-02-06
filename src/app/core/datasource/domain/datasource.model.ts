/**
 * Define interface to manage item data of  datasource with static values
 */
export interface DataItem {
    value: any;
    label: string;
    id: any;
}

/**
 * Define datasource interface to represent specific model datasource config
 */
export class Datasource {
    api?: { [key: string]: DatasourceAPI };
    url?: string;
    model?: any;
    items?: DataItem[];
}

/**
 * Definte interface to specific datasource action configuration
 */
export interface DatasourceAPI {
    url: string;
    method: string;
    contentType?: 'json' | 'formData';
    name?: string;
}

/**
 * Interface to define options to use in datasource action execution
 */
export interface DatasourceOption {
    urlParams?: any;
    queryParams?: any;
    body?: any;
}
