/*
 * KONGSBERG PROPRIETARY. This document and its accompanying elements, contain KONGSBERG information which is proprietary and confidential.
Any disclosure, copying, distribution or use is prohibited if not otherwise explicitly agreed with KONGSBERG in writing.
Any authorized reproduction, in whole or in part, must include this legend. © [year of creation] KONGSBERG – All rights reserved.
 */
export class Mission {
    constructor(
        public id: number,
        public operationId: number,
        public missionNumber: number,
        public name: string,
        public missionPath: string,
        public address: string,
        public type: string,
        public description: string,
        public startTime: Date,
        public endTime: Date,
        public uploadedDate: Date
    ) { }
}
