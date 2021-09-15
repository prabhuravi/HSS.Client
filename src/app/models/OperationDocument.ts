/*
 * KONGSBERG PROPRIETARY. This document and its accompanying elements, contain KONGSBERG information which is proprietary and confidential.
Any disclosure, copying, distribution or use is prohibited if not otherwise explicitly agreed with KONGSBERG in writing.
Any authorized reproduction, in whole or in part, must include this legend. © [year of creation] KONGSBERG – All rights reserved.
 */
export class OperationDocument {
    constructor(
        public id: number,
        public operationId: number,
        public documentTpyeId: number,
        public file: string,
        public createdDate: Date,
        public modifiedDate: Date,
        public documentType: DocumentType
    ) { }
}

export class DocumentType {
    constructor(
       public id: number,
       public typeName: string
    ) { }
}
