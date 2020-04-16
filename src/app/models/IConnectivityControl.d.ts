interface IConnectivityControl {
    Id: number;
    VesselName: string;
    IpAddress: string;
    EnabledTime: string;
    TimeLimit: number;
    IsUploadEnabled: boolean;
    RemainingMinutes: number;
    RemainingTime: object;
    DisableTime: any;
    EnabledBy: string;
    NodeNumber: number;
    IMONumber: number;
    AlwaysOn: boolean;
}