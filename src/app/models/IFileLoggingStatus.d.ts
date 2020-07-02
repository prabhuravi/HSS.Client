interface IFileLoggingStatus {
    TotalFileSize: number,
    TotalFileCount: number,
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