interface ISection {
    Id: number;
    Name: number;
    Status: string;
    Subsections: ISubSection[] =[];
    
}

interface ISubSection {
    Id: number;
    SubSectionId: number;
    Name: string;
    Status : string;
}