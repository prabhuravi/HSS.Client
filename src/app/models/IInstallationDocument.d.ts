interface IInstallationDocument
{
    Id: number;
    VesselId: number;
    DocumentId: number;
    DocumentTypeId: number;
    DocumentTypeName: string;
    DocumentName: string;
    FileName: string;
    Version: string;
    DocumentPath: string
    Date: Date;
    UploadSource: string
    CopyVesselId: number
}