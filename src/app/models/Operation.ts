export class Operation {
    constructor(
        public Id: number,
        public VesselId: number,
        public OperationName: string,
        public OperationTypeId: number,
        public Date: Date,
        public StatusId: number,
        public PortId: number,
        public OperatorId: number,
        public HullSkaterId: number,
        public RequestedById: number,
        public Description: string,
        public ETA: Date,
        public ETB: Date,
        public CreatedBy: string,
        public Vessel: Vessel,
        public HullSkater: HullSkater,
        public OperationType: OperationType,
        public OperationStatus: OperationStatus,
        public PortLocation: PortLocation,
        public VesselContact: VesselContact,
        public RequestedBy: RequestedBy,
        public SecondaryOperations: SecondaryOperation[] = []
    ) { }
}

export class SecondaryOperation {
    constructor(
        public Id: number,
        public OperationId: number,
        public OperationTypeId: number,
        public StatusId: number,
        public CreatedBy: string,
        public Operation:  Operation,
        public OperationType: OperationType,
        public OperationStatus: OperationStatus,
    ) { }
}

export class Vessel {
    constructor(
        public Id: number,
        public Name: string,
        public DisplayName: string,
        public ImoNo: number
    ) { }
}
export class HullSkater {
    constructor(
        public Id: number,
        public SerialNumber: string,
        public Name: string,
        public Version: string
    ) { }
}
export class OperationType {
    constructor(
        public Id: number,
        public OperationTypeName: string,
    ) { }
}
export class OperationStatus {
    constructor(
        public Id: number,
        public Name: string,
    ) { }
}
export class PortLocation {
    constructor(
        public Id: number,
        public PortName: string,
        public PortCode: string,
    ) { }
}
export class VesselContact {
    constructor(
        public Id: number,
        public ContactId: number,
        public VesselId: number,
    ) { }
}
export class RequestedBy {
    constructor(
        public Id: number,
        public Name: string,
    ) { }
}