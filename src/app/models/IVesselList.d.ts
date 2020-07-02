interface IVesselList {   //Change this to ConnectivityControlView
    Id: number,
    VesselName: string,
    IpAddress: string,
    EnabledTime: string,
    TimeLimit: number,
    IsUploadEnabled: boolean,
    RemainingMinutes: number,
    RemainingTime: string,
    DisableTime: any,
    EnabledBy: string,
    NodeNumber: number,
    ImoNumber: number
}