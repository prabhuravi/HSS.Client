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