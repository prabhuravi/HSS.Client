
export interface IVesselDetails {   // Change this to SNMPDataView
    VesselName: string;
    NodeNumber: number;
    Latitude: string;
    Longitude: string;
    ProviderName: string;
    ApnName: string;
    SignalStrength: number;
    MCC: number;
    MNC: number;
    CountryName: string;
    NetworkTypeCode: number;
    NetworkType: string;
    LastLatency: number;
    LastUpdated: Date;
}
