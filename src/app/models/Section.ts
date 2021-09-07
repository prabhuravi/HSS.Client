/*
 * KONGSBERG PROPRIETARY. This document and its accompanying elements, contain KONGSBERG information which is proprietary and confidential.
Any disclosure, copying, distribution or use is prohibited if not otherwise explicitly agreed with KONGSBERG in writing.
Any authorized reproduction, in whole or in part, must include this legend. © [year of creation] KONGSBERG – All rights reserved.
 */
export class VesselSection {
    constructor(
        public id: number,
        public vesselId: number,
        public sectionStatusId: number,
        public foulingId: number,
        public sectionId: number,
        public name: string,
        public sectionStatus: SectionStatus,
        public section: Section,
        public selected: boolean = false,
        public foulingState: IFoulingState,
        public modifiedDate: Date,
        public subSections: SubSection[] = []
    ) { }
}

export class SectionStatus {
    constructor(
        public id: number,
        public name: string
    ) { }
}

export class Section {
    constructor(
        public id: number,
        public name: string
    ) { }
}
export class SubSection {
    constructor(
        public id: number,
        public vesselSectionId: number,
        public sectionStatusId: number,
        public foulingId: number,
        public joturnFoulingId: number,
        public subSectionNumber: number,
        public sectionStatus: SectionStatus,
        public foulingState: IFoulingState,
        public joturnFoulingState: IFoulingState,
        public modifiedDate: Date,
        public selected: boolean = false
    ) { }
}
