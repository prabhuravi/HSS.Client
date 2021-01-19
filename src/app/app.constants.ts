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
// export enum SectionStatus{
//     Active,
//     Obsolete
// }
export function getInputTypes() {
    return FormType;
}
