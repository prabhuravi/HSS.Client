
interface IVesselFoulingStates {
    Id: number;
    VesselId: number;
    SectionName: string;
    Status: string;
    Subsections: ISubSection[] =[];
    
}