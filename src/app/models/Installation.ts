import { Node } from './Node';

export class Installation {
    constructor(
        public id: number,
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
        public foulingState: IFoulingState) { }

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
