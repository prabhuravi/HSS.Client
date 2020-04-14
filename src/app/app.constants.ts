export class AppConstants {
    public static PRIMENG_CONSTANTS = {
        datepickerFormat: 'dd/mm/yy'
    };
}

export enum FormType {
    text,
    dropdown,
    datepicker,
    checkbox,
    number,
    autocomplete
}
export function getInputTypes() {
    return FormType;
}
