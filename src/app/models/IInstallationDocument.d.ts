/*
 * KONGSBERG PROPRIETARY. This document and its accompanying elements, contain KONGSBERG information which is proprietary and confidential.
Any disclosure, copying, distribution or use is prohibited if not otherwise explicitly agreed with KONGSBERG in writing.
Any authorized reproduction, in whole or in part, must include this legend. © [year of creation] KONGSBERG – All rights reserved.
 */
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
