export class Section {
    id: number;
    name: string;
    status: SectionStatus;
    selected: boolean = false;
    subSections: ISubSection[] =[];
    
}

export class SubSection {
    id: number;
    sectionId: number;
    name: string;
    status : SectionStatus;
}

