/*
 * KONGSBERG PROPRIETARY. This document and its accompanying elements, contain KONGSBERG information which is proprietary and confidential.
Any disclosure, copying, distribution or use is prohibited if not otherwise explicitly agreed with KONGSBERG in writing.
Any authorized reproduction, in whole or in part, must include this legend. © [year of creation] KONGSBERG – All rights reserved.
 */
interface IPortMeteorology
{
    Id: number,
    OperationId: number,
    AirTemp: string,
    Humidity: string,
    Precipitation: string,
    WindSpeed: string,
    WindDirection: string,
    Date: Date,
    BerthDepth: number,
    ModifiedDate: Date
}
