interface IOperationalPlan {
    Id: number,
    VesselName: string,
    ImoNumber: number,
    VesselId: number,
    RobotSystemId: number,
    RobotSerialNumber: string,
    OperationDes: string,
    OperationDate: string,
    OperationLoc: string,
    PortCode: string,
    LocalTimeZone: string,
    OperationTypeId: number,
    OperationTypeName: string,
    Status: string,
    ETADate: string,
    OperatorId: number,
    OperatorName: string,
    PlannerId: number,
    PlannerName: string,
    Comments: string,
    CreatedBy: string,
    CreatedDate: string,
    LastUpdatedBy: string,
    ModifiedDate: string,
    Action: object
}