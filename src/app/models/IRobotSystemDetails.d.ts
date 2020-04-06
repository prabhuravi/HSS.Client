interface IRobotSystemDetails {
    RobotSystemId: number,
    RobotSerialNumber: string,
    IPAddress: string,
    NodeNumber: number,
    ConnectivityControl: boolean,
    ConnectivityMonitoring: boolean,
    CreatedBy: object,
    CreatedDate: string,
    LastUpdatedBy: object,
    LastUpdatedDate: string
}