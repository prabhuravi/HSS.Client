import { Node } from './Node';

export class Installation {
    constructor(
        public id: number,
        public vesselNodeId: number,
        public nodeId: number,
        public name: string,
        public displayName: string,
        public imoNo: number,
        public foulingId: number,
        public joturnFoulingId: number,
        public installationStatusId: number,
        public installationId: string,
        public vesselTypeId: number,
        public vesselType: VesselType,
        public installationStatus: InstallationStatus,
        public node: Node,
        public foulingState: IFoulingState,
        public installationTypeId: number,
        public installationType: InstallationType) { }

}

export class InstallationStatus {
    constructor(
   public id: number,
   public  name: string
    ) {}
}

export class VesselType {
    constructor(
        public id: number,
        public name: string
    ) {}

}

export class InstallationType {
    constructor(
        public id: number,
        public name: string
    ) {}

}
