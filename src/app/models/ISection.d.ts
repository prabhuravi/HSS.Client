interface ISection {
    id: number;
    vesselId: number;
    name: string;
    status: SectionStatus;
    selected: boolean = false;
    foulingId: number,
    foulingState: string;
    jotunFoulingId: number,
    subsections: ISubSection[] = [];
    
}

export class SubSection {
    id: number;
    sectionId: number;
    name: string;
    status : SectionStatus;
}

