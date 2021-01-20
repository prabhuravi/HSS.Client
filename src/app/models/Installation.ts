import { Node } from "./Node";

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
        public installationTypeId: number,
        public installationType: InstallationType,
        public installationStatus: InstallationStatus,
        public node: Node) { }

}

export class InstallationStatus {
    constructor(
   public id: number,
   public  name: string
    ) {}
}

export class InstallationType {
    constructor(
        public id: number,
        public name: string
    ) {}

}
