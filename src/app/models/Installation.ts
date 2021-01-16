import { IModelAdapter } from './IModelAdapter';

export  class Installation {
    constructor(
    id: number,
    name: string,
    displayName: string,
    imoNo: number,
    foulingId: number,
    joturnFoulingId: number,
    installationStatusId: number,
    installationId: string,
    installationStatus: InstallationStatus) {}

}

export class InstallationAdapter implements IModelAdapter<Installation> {

    adapt(item: any): Installation {
        return new Installation(
           item.Id ? item.id : 0,
            item.Name ? item.name : '',
            item.DisplayName ? item.DisplayName : '',
            item.ImoNo ? item.ImoNo : '',
           item.FoulingId ? item.FoulingId : 0,
            item.JoturnFoulingId ? item.JoturnFoulingId : 0,
            item.InstallationId ? item.InstallationId : 0 ,
            item.InstallationStatusId ? item.InstallationStatusId : 0,
            item.InstallationStatus ? item.InstallationStatus : null
           );
        }
}

export class InstallationStatus {
    id: number;
    name: string;
}
