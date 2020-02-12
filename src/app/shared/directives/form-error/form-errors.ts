
import {InjectionToken} from '@angular/core';


export const defaultErrors = {
    required: (error) => `Field Required.`,
    minlength: ({requiredLength, actualLength}) => `Min Length ${requiredLength} allowed.`,
    maxlength: ({requiredLength, actualLength}) => `Max Length ${requiredLength} allowed`,
    email: (error) => `Invalid Email.`,
    min: ({min}) => `Min value allowed ${min}`,
    max: ({max}) => `Max value allowed ${max}`,
    pattern: (pat) => 'Invalid data type',
    matDatepickerParse: (text) => 'Invalid date value',
    alphaNumeric: (val) => val.message || `Field alphanumeric`,
};

export const FORM_ERRORS = new InjectionToken('FORM_ERRORS', {
    providedIn: 'root',
    factory: () => defaultErrors
});


