export class Section {
    constructor(
        public id: number,
        public vesselId: number,
        public name: string,
        public sectionStatus: SectionStatus,
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

export class SubSection {
    constructor(
        public id: number,
        public sectionId: number,
        public name: string,
        public sectionStatus: SectionStatus
    ) { }
}
