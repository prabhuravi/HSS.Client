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
        public joturnFoulingState: IFoulingState
    ) { }
}
