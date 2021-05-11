export class AppConstants {
    public static PRIMENG_CONSTANTS = {
        datepickerFormat: 'mm/dd/yy',
        rowCount: 10
    };
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
