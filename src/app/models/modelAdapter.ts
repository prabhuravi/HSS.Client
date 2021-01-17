import { Injectable } from '@angular/core';
import { IModelAdapter } from './IModelAdapter';
import { Installation, InstallationStatus, InstallationType } from './Installation';
import { Node } from './Node';

@Injectable({
    providedIn: 'root'
})
export class InstallationTypeAdapter implements IModelAdapter<InstallationType> {
    adapt(item: any): InstallationType {
        return new InstallationType(
            item.Id ? item.Id : 0,
            item.Name ? item.Name : ''
        );
    }

}

@Injectable({
    providedIn: 'root'
})
export class InstallationStatusAdapter implements IModelAdapter<InstallationStatus> {
    adapt(item: any): InstallationStatus {
        return new InstallationStatus(
            item.Id ? item.Id : 0,
            item.Name ? item.Name : ''
        );
    }

}

@Injectable({
    providedIn: 'root'
})
export class FoulingStateAdapter implements IModelAdapter<IFoulingState> {
    adapt(item: any): IFoulingState {
        console.log(item);
        const foulingstate: IFoulingState = {
            Id: item.Id ? item.Id :  0,
            Code: item.Code ? item.Code :  '',
            State: item.State ? item.State :  '',
            Category: item.Category ? item.Category :  '',
            CreatedBy: item.CreatedBy ? item.CreatedBy :  ''

        };
        return foulingstate;

    }
}

@Injectable({
    providedIn: 'root'
})
export class NodeAdapter implements IModelAdapter<Node> {
    adapt(item: any): Node {

        return new Node(
            item.Id ? item.Id : 0,
            item.NodeNumber ? item.NodeNumber : 0,
            item.GatewayIP ? item.GatewayIP : '',
            item.InstallationId ? item.InstallationId : ''
        );

    }

}

@Injectable({
    providedIn: 'root'
})
export class InstallationAdapter implements IModelAdapter<Installation> {

    constructor(
        private installationTypeAdpater: InstallationTypeAdapter,
        private installationStatusAdapter: InstallationStatusAdapter,
        private nodeAdapter: NodeAdapter
    ) {

    }
    adapt(item: any): Installation {

        return new Installation(
            item.Id ? item.Id : 0,
            item.Name ? item.Name : '',
            item.DisplayName ? item.DisplayName : '',
            item.ImoNo ? item.ImoNo : '',
            item.FoulingId ? item.FoulingId : 0,
            item.JoturnFoulingId ? item.JoturnFoulingId : 0,
            item.InstallationId ? item.InstallationId : 0,
            item.InstallationStatusId ? item.InstallationStatusId : 0,
            item.InstallationTypeId ? item.InstallationTypeId : 0,
            item.InstallationType ? this.installationTypeAdpater.adapt(item.InstallationType) : null,
            item.InstallationStatus ? this.installationStatusAdapter.adapt(item.InstallationStatus) : null,
            item.Node ? this.nodeAdapter.adapt(item.Node) : null
        );
    }
}
