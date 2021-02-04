export class VesselSection {
    constructor(
        public id: number,
        public vesselId: number,
        public sectionId: number,
        public name: string,
        public sectionStatus: SectionStatus,
        public section: Section,
        public selected: boolean = false,
        public foulingId: number,
        public foulingState: string,
        public jotunFoulingId: number,
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
        public subSectionNumber: number,
        public sectionStatus: SectionStatus
    ) { }
}
