/*
 * KONGSBERG PROPRIETARY. This document and its accompanying elements, contain KONGSBERG information which is proprietary and confidential.
Any disclosure, copying, distribution or use is prohibited if not otherwise explicitly agreed with KONGSBERG in writing.
Any authorized reproduction, in whole or in part, must include this legend. © [year of creation] KONGSBERG – All rights reserved.
 */
interface IVesselList {   //Change this to ConnectivityControlView
    Id: number,
    VesselName: string,
    IpAddress: string,
    EnabledTime: string,
    TimeLimit: number,
    IsUploadEnabled: boolean,
    RemainingMinutes: number,
    RemainingTime: string,
    DisableTime: any,
    EnabledBy: string,
    NodeNumber: number,
    ImoNumber: number
}
