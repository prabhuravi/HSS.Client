import { Injectable } from '@angular/core';
import { IModelAdapter } from './IModelAdapter';
import { Installation, InstallationStatus, InstallationType } from './Installation';
import { Node } from './Node';
import { Section, SectionStatus, SubSection } from './Section';

@Injectable({
    providedIn: 'root'
})
export class InstallationTypeAdapter implements IModelAdapter<InstallationType> {
    adapt(item: any): InstallationType {
        return new InstallationType(
            item.Id ? item.Id : item.id ? item.id : 0,
            item.Name ? item.Name : item.name ? item.name : ''
        );
    }

}

@Injectable({
    providedIn: 'root'
})
export class InstallationStatusAdapter implements IModelAdapter<InstallationStatus> {
    adapt(item: any): InstallationStatus {
        return new InstallationStatus(
            item.Id ? item.Id : item.id ? item.id : 0,
            item.Name ? item.Name : item.name ? item.name : ''
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
            Id: item.Id ? item.Id : item.id ? item.id : 0,
            Code: item.Code ? item.Code : item.code ? item.code : '',
            State: item.State ? item.State : item.state ? item.state : '',
            Category: item.Category ? item.Category : item.category ? item.category : '',
            CreatedBy: item.CreatedBy ? item.CreatedBy : item.createdBy ? item.createdBy : ''
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
            item.Id ? item.Id : item.id ? item.id : 0,
            item.NodeNumber ? item.NodeNumber : item.nodeNumber ? item.nodeNumber : 0,
            item.GatewayIP ? item.GatewayIP : item.gatewayIP ? item.gatewayIP : '',
            item.InstallationId ? item.InstallationId : item.installationId ? item.installationId : ''
        );

    }

}

@Injectable({
    providedIn: 'root'
})
export class SectionStatusAdapter implements IModelAdapter<SectionStatus> {
    adapt(item: any): SectionStatus {
        return new SectionStatus(item.Id ? item.Id : item.id ? item.id : 0,
            item.Name ? item.Name : item.name ? item.name : ''
        );
    }

}
@Injectable({
    providedIn: 'root'
})
export class SubSectionAdapter implements IModelAdapter<SubSection> {
    constructor(private sectionStatusAdapter: SectionStatusAdapter) { }
    adapt(item: any): SubSection {
        return new SubSection(item.Id ? item.Id : item.id ? item.id : 0,
            item.SectionId ? item.SectionId : item.sectionId ? item.sectionId : 0,
            item.Name ? item.Name : item.name ? item.name : '',
            item.SectionStatus ? this.sectionStatusAdapter.adapt(item.SectionStatus) : item.sectionStatus ? this.sectionStatusAdapter.adapt(item.sectionStatus) : null

        );
    }

}
@Injectable({
    providedIn: 'root'
})
export class SectionAdapter implements IModelAdapter<Section> {
    constructor(private sectionStatusAdapter: SectionStatusAdapter,
                private subSectionAdapter: SubSectionAdapter) { }
    adapt(item: any): Section {
        return new Section(item.Id ? item.Id : item.id ? item.id : 0,
            item.VesselId ? item.VesselId : item.vesselId ? item.vesselId : 0,
            item.Name ? item.Name : item.name ? item.name : '',
            item.SectionStatus ? this.sectionStatusAdapter.adapt(item.SectionStatus) : item.sectionStatus ? this.sectionStatusAdapter.adapt(item.sectionStatus) : null,
            false,
            item.FoulingId ? item.FoulingId : item.foulingId ? item.foulingId : 0,
            item.FoulingState ? item.FoulingState : item.foulingState ? item.foulingState : '',
            item.JoturnFoulingId ? item.JoturnFoulingId : item.joturnFoulingId ? item.joturnFoulingId : '',
            item.SubSections ? item.SubSections.map((x) => this.subSectionAdapter.adapt(x)) : item.subSections ? item.subSections.map((x) => this.subSectionAdapter.adapt(x)) : []

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
            item.Id ? item.Id : item.id ? item.id : 0,
            item.Name ? item.Name : item.name ? item.name : '',
            item.DisplayName ? item.DisplayName : '',
            item.ImoNo ? item.ImoNo : '',
            item.FoulingId ? item.FoulingId : item.foulingId ? item.foulingId : 0,
            item.JoturnFoulingId ? item.JoturnFoulingId : item.joturnFoulingId ? item.joturnFoulingId : 0,
            item.InstallationId ? item.InstallationId : item.installationId ? item.installationId : 0,
            item.InstallationStatusId ? item.InstallationStatusId : item.installationStatusId ? item.installationStatusId : 0,
            item.InstallationTypeId ? item.InstallationTypeId : item.installationTypeId ? item.installationTypeId : 0,
            item.InstallationType ? this.installationTypeAdpater.adapt(item.InstallationType) : null,
            item.InstallationStatus ? this.installationStatusAdapter.adapt(item.InstallationStatus) : null,
            item.Node ? this.nodeAdapter.adapt(item.Node) : null
        );
    }
}
