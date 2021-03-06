/*
 * KONGSBERG PROPRIETARY. This document and its accompanying elements, contain KONGSBERG information which is proprietary and confidential.
Any disclosure, copying, distribution or use is prohibited if not otherwise explicitly agreed with KONGSBERG in writing.
Any authorized reproduction, in whole or in part, must include this legend. © [year of creation] KONGSBERG – All rights reserved.
 */
export class AppConstants {
    public static PRIMENG_CONSTANTS = {
        datepickerFormat: 'dd/mm/yy',
        rowCount: 10
    };
    public static dateFormatWithTime = 'dd/MM/yyyy HH:mm';
    public static dateFormatWithoutTime = 'dd/MM/yyyy';
}



export enum FormType {
    text,
    textarea,
    dropdown,
    multiSelect,
    datepicker,
    checkbox,
    number,
    autocomplete,
    button,
    phone
}
export function getInputTypes() {
    return FormType;
}

export enum HSSRoleEnum {
    OperatorManager = "Operator Manager",
    SkateOperator = "Skate Operator",
    ShipMaster = "Ship Master",
    CrewMate = "Crew Mate",
    PortAuthority = "Port Authority",
    PortContact = "Port Contact",
}

export enum OperationStatusEnum {
    Requested = "Requested",
    Pending = "Pending",
    Confirmed = "Confirmed",
    Running = "Running",
    Completed = "Completed",
    Aborted = "Aborted",
}
