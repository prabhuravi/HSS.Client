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