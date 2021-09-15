/*
 * KONGSBERG PROPRIETARY. This document and its accompanying elements, contain KONGSBERG information which is proprietary and confidential.
Any disclosure, copying, distribution or use is prohibited if not otherwise explicitly agreed with KONGSBERG in writing.
Any authorized reproduction, in whole or in part, must include this legend. © [year of creation] KONGSBERG – All rights reserved.
 */
interface IVesselUploadStatus {
    TotalFilesOnVessel: number,
    TotalFilesUploaded: number,
    TotalFilesNotUploaded: number,
    TotalFilesInProgress: number,
    TotalFilesExcluded: number,
    LastContactDate:object,
    FileOnVessels: IFilesUploadStatus[]
}
interface IFilesUploadStatus {
    Id: number,
    VesselName: string,
    Mission: string,
    MissionNumber: number,
    FileName: string,
    FilePath: string,
    FileUploadedDate: object,
    FileCreatedDate: string,
    FileModifiedDate: string,
    FileType: string,
    UploadedSize: number,
    FileSize: number,
    UploadStatus: string,
    IsMoved: boolean,
    UploadCount: number,
    RecordCreatedDate: string,
    RecordModifiedDate: string,
    MarkedForUpload : boolean
}
