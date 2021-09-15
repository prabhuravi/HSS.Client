/*
 * KONGSBERG PROPRIETARY. This document and its accompanying elements, contain KONGSBERG information which is proprietary and confidential.
Any disclosure, copying, distribution or use is prohibited if not otherwise explicitly agreed with KONGSBERG in writing.
Any authorized reproduction, in whole or in part, must include this legend. © [year of creation] KONGSBERG – All rights reserved.
 */
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
