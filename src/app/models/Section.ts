export class Section {
    constructor(
        public id: number,
        public vesselId: number,
        public name: string,
        public sectionStatus: SectionStatus,
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

export class SubSection {
    constructor(
        public id: number,
        public sectionId: number,
        public name: string,
        public sectionStatus: SectionStatus,
        public foulingState: IFoulingState,
    ) { }
}
