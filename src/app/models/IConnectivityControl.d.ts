interface IConnectivityControl {
    Id: number;
    VesselName: string;
    IpAddress: string;
    EnabledTime: string;
    TimeLimit: number;
    IsUploadEnabled: boolean;
    RemainingMinutes: number;
    RemainingTime: object;
    DisableTime: string;
    EnabledBy: string;
    NodeNumber: number;
    IMONumber: number;
}