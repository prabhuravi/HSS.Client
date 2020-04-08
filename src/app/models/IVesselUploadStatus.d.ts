interface IVesselUploadStatus {
    FilesOnVessel: number,
    FilesUploaded: number,
    FilesNotUploaded: number,
    FilesInProgress: number,
    FilesExcluded: number,
    filesUploadStatus: IFilesUploadStatus[]
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
    RecordModifiedDate: string
}