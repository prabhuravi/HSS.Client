/*
 * KONGSBERG PROPRIETARY. This document and its accompanying elements, contain KONGSBERG information which is proprietary and confidential.
Any disclosure, copying, distribution or use is prohibited if not otherwise explicitly agreed with KONGSBERG in writing.
Any authorized reproduction, in whole or in part, must include this legend. © [year of creation] KONGSBERG – All rights reserved.
 */
import { Node } from './Node';
import { Operation } from './Operation';

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
        public installationType: InstallationType,
        public aisData: InstallationAISData,
        public operation: Operation) { }

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

export class InstallationAISData {
    constructor(
     public destination: string,
     public eta: Date,
     public latitude: string,
     public longitude: string,
     public speed: string,
     public draft: string,
     public messageTimestamp: Date,
     public heading: string
    ) {}
}


