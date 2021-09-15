/*
 * KONGSBERG PROPRIETARY. This document and its accompanying elements, contain KONGSBERG information which is proprietary and confidential.
Any disclosure, copying, distribution or use is prohibited if not otherwise explicitly agreed with KONGSBERG in writing.
Any authorized reproduction, in whole or in part, must include this legend. © [year of creation] KONGSBERG – All rights reserved.
 */
interface IFileLoggingStatus {
    TotalFileSize: number,
    TotalFileCount: number,
    LastContactDate:object,
    FileLogs: IFileLogs[]
}
interface IFileLogs {
    Id: number,
    VesselName: string,
    Mission: string,
    MissionNumber: number,
    FileName: string,
    FilePath: string,
    Date: object,
    FileType: string,
    FileSize: number,
    UploadCount: number,
}
