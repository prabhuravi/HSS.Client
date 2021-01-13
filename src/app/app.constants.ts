export class AppConstants {
    public static PRIMENG_CONSTANTS = {
        datepickerFormat: 'mm/dd/yy',
        rowCount: 10
    };
}

export enum FormType {
    text,
    dropdown,
    datepicker,
    checkbox,
    number,
    autocomplete,
    button
}
export function getInputTypes() {
    return FormType;
}
