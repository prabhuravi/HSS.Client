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
