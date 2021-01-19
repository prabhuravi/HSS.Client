export class Section {
    id: number;
    name: string;
    status: SectionStatus;
    selected: boolean = false;
    subSections: SubSection[] = [];

}

export class SectionStatus {
    constructor(
        public id: number,
        public name: string
    ) { }
}

export class SubSection {
    id: number;
    sectionId: number;
    name: string;
    status: SectionStatus;
}
