interface IInstallationDocument
{
    Id: number;
    DocumentTypeId: number;
    DocumentName: string;
    DocumentType: string;
    Version: string;
    DocumentPath: string
    Date: Date;
    File: string;
    UploadSource: string
}