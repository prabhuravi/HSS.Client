interface ISection {
    Id: number;
    VesselId: number;
    SectionName: string;
    Status: string;
    FoulingId: number,
    FoulingState: string;
    JotunFoulingId: number,
    Subsections: ISubSection[] =[];
    
}

interface ISubSection {
    Id: number;
    SubSectionId: number;
    Name: string;
    Status : string;
}