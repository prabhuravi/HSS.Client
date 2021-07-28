import { Injectable } from '@angular/core';
import { Contact, ContactRole, OperatorBooking } from './Contact';
import { IModelAdapter } from './IModelAdapter';
import { Installation, InstallationAISData, InstallationStatus, InstallationType, VesselType } from './Installation';
import { Mission } from './mission';
import { Node } from './Node';
import { Operation, OperationStatus } from './Operation';
import { DocumentType, OperationDocument } from './OperationDocument';
import { VesselSection, SectionStatus, SubSection, Section } from './Section';

@Injectable({
    providedIn: 'root'
})
export class VesselTypeAdapter implements IModelAdapter<VesselType> {
    adapt(item: any): VesselType {
        return new VesselType(
            item.Id ? item.Id : item.id ? item.id : 0,
            item.Name ? item.Name : item.name ? item.name : ''
        );
    }

}

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
export class InstallationAISDataAdapter implements IModelAdapter<InstallationAISData> {
    adapt(item: any): InstallationAISData {
        return new InstallationAISData(
            item.destination ? item.destination : item.Destination ? item.Destination : '',
            item.Eta ? item.Eta : item.eta ? item.eta : '',
            item.Latitude ? item.Latitude : item.latitude ? item.latitude : '',
            item.longitude ? item.longitude : item.Longitude ? item.Longitude : '',
            item.speed ? item.speed : item.Speed ? item.Speed : '',
            item.draft ? item.draft : item.Draft ? item.Draft : '',
            item.MessageTimestamp ? item.MessageTimestamp : item.messageTimestamp ? item.messageTimestamp : '',
            item.Heading ? item.Heading : item.heading ? item.heading : ''
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
            item.RobotIP ? item.RobotIP : item.robotIP ? item.robotIP : '',
            item.InstallationId ? item.InstallationId : item.installationId ? item.installationId : '',
            item.Status ? item.Status : item.status ? item.status : ''
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
export class SectionAdapter implements IModelAdapter<Section> {
    adapt(item: any): Section {
        return new Section(item.Id ? item.Id : item.id ? item.id : 0,
            item.Name ? item.Name : item.name ? item.name : ''
        );
    }

}
@Injectable({
    providedIn: 'root'
})
export class SubSectionAdapter implements IModelAdapter<SubSection> {
    constructor(private sectionStatusAdapter: SectionStatusAdapter, private foulingStateAdapter: FoulingStateAdapter) { }
    adapt(item: any): SubSection {
        return new SubSection(item.Id ? item.Id : item.id ? item.id : 0,
            item.vesselSectionId ? item.vesselSectionId : item.VesselSectionId ? item.VesselSectionId : 0,
            item.sectionStatusId ? item.sectionStatusId : item.SectionStatusId ? item.SectionStatusId : 0,
            item.foulingId ? item.foulingId : item.FoulingId ? item.FoulingId : 0,
            item.joturnFoulingId ? item.joturnFoulingId : item.JoturnFoulingId ? item.JoturnFoulingId : 0,
            item.subSectionNumber ? item.subSectionNumber : item.SubSectionNumber ? item.SubSectionNumber : 0,
            item.SectionStatus ? this.sectionStatusAdapter.adapt(item.SectionStatus) : item.sectionStatus ? this.sectionStatusAdapter.adapt(item.sectionStatus) : null,
            item.FoulingState ? this.foulingStateAdapter.adapt(item.FoulingState) : item.foulingState ? this.foulingStateAdapter.adapt(item.foulingState) : null,
            item.JoturnFoulingState ? this.foulingStateAdapter.adapt(item.JoturnFoulingState) : item.joturnFoulingState ? this.foulingStateAdapter.adapt(item.joturnFoulingState) : null,
            item.modifiedDate ? item.modifiedDate : item.ModifiedDate ? item.ModifiedDate : null
        );
    }

}

@Injectable({
    providedIn: 'root'
})
export class VesselSectionAdapter implements IModelAdapter<VesselSection> {
    constructor(private sectionStatusAdapter: SectionStatusAdapter,
                private subSectionAdapter: SubSectionAdapter,
                private sectionAdapter: SectionAdapter,
                private foulingStateAdapter: FoulingStateAdapter
    ) { }
    adapt(item: any): VesselSection {
        return new VesselSection(item.Id ? item.Id : item.id ? item.id : 0,
            item.VesselId ? item.VesselId : item.vesselId ? item.vesselId : 0,
            item.sectionStatusId ? item.sectionStatusId : item.SectionStatusId ? item.SectionStatusId : 0,
            item.foulingId ? item.foulingId : item.FoulingId ? item.FoulingId : 0,
            item.SectionId ? item.SectionId : item.sectionId ? item.sectionId : 0,
            item.Name ? item.Name : item.name ? item.name : '',
            item.SectionStatus ? this.sectionStatusAdapter.adapt(item.SectionStatus) : item.sectionStatus ? this.sectionStatusAdapter.adapt(item.sectionStatus) : null,
            item.Section ? this.sectionAdapter.adapt(item.Section) : item.section ? this.sectionAdapter.adapt(item.section) : null,
            false,
            item.FoulingState ? this.foulingStateAdapter.adapt(item.FoulingState) : item.foulingState ? this.foulingStateAdapter.adapt(item.foulingState) : null,
            item.modifiedDate ? item.modifiedDate : item.ModifiedDate ? item.ModifiedDate : null,
            item.SubSections ? item.SubSections.map((x) => this.subSectionAdapter.adapt(x)) : item.subSections ? item.subSections.map((x) => this.subSectionAdapter.adapt(x)) : []

        );
    }

}
@Injectable({
    providedIn: 'root'
})
export class ContactRoleAdapter implements IModelAdapter<ContactRole> {
    adapt(item: any): ContactRole {
       return new ContactRole (item.Id ? item.Id : item.id ? item.id : 0,
        item.Name ? item.Name : item.name ? item.name : '');
    }
}
@Injectable({
    providedIn: 'root'
})
export class OperatorBookingAdapter implements IModelAdapter<OperatorBooking> {
    adapt(item: any): OperatorBooking {
        return new OperatorBooking(item.OperationBookingId ? item.OperationBookingId : item.operationBookingId ? item.operationBookingId : 0,
            item.OperationId ? item.OperationId : item.operationId ? item.operationId : 0,
            item.date ? item.date : item.Date ? item.Date : null,
            item.status ? item.status : item.Status ? item.Status : null,
            item.installationName ? item.installationName : item.InstallationName ? item.InstallationName : '');
    }
}
@Injectable({
    providedIn: 'root'
})
export class ContactAdapter implements IModelAdapter<Contact> {
    constructor(private contactRoleAdapter: ContactRoleAdapter,
                private operatorBookingAdapter: OperatorBookingAdapter) { }
    adapt(item: any): Contact {
        return new Contact(item.Id ? item.Id : item.id ? item.id : 0,
            item.VesselId ? item.VesselId : item.vesselId ? item.vesselId : 0,
            item.OperationId ? item.OperationId : item.operationId ? item.operationId : 0,
            item.contactId ? item.contactId : item.ContactId ? item.ContactId : 0,
            item.VesselContactId ? item.VesselContactId : item.vesselContactId ? item.vesselContactId : 0,
            item.ContactTypeId ? item.ContactTypeId : item.contactTypeId ? item.contactTypeId : 0,
            item.Name ? item.Name : item.name ? item.name : '',
            item.SurName ? item.SurName : item.surName ? item.surName : '',
            item.Email ?  item.Email : item.email ? item.email : '',
            item.Phone ? item.Phone : item.phone ? item.phone : '',
            item.AlternativePhone ? item.AlternativePhone : item.alternativePhone ? item.alternativePhone : '',
            item.ContactType ? this.contactRoleAdapter.adapt(item.ContactType) : item.contactType ? this.contactRoleAdapter.adapt(item.contactType) : null,
            item.TagTraining ? item.TagTraining : item.tagTraining ? item.tagTraining : false,
            item.availability ? item.availability : item.Availability ? item.Availability : false,
            item.operatorBooking ? this.operatorBookingAdapter.adapt(item.operatorBooking) : item.OperatorBooking ? this.operatorBookingAdapter.adapt(item.OperatorBooking) : null
            );

    }
}

@Injectable({
    providedIn: 'root'
})
export class OperationStatusAdapter implements IModelAdapter<OperationStatus> {
    constructor() { }
    adapt(item: any): OperationStatus {
        return new OperationStatus(
            item.Id ? item.Id : item.id ? item.id : 0,
            item.Name ? item.Name : item.name ? item.name : ''
            );
    }
}

@Injectable({
    providedIn: 'root'
})
export class OperationAdapter implements IModelAdapter<Operation> {
    constructor(private operationStatusAdapter: OperationStatusAdapter) { }
    adapt(item: any): Operation {
        return new Operation(
            item.Id ? item.Id : item.id ? item.id : 0,
            item.VesselId ? item.VesselId : item.vesselId ? item.vesselId : 0,
            item.OperationName ? item.OperationName : item.operationName ? item.operationName : '',
            item.OperationTypeId ? item.OperationTypeId : item.operationTypeId ? item.operationTypeId : 0,
            item.date ? item.date : item.Date ? item.Date : null,
            item.StatusId ? item.StatusId : item.statusId ? item.statusId : 0,
            item.PortId ? item.PortId : item.portId ? item.portId : 0,
            item.OperatorId ? item.OperatorId : item.operatorId ? item.operatorId : 0,
            0,
            item.RequestedById ? item.RequestedById : item.requestedById ? item.requestedById : 0,
            item.Description ? item.Description : item.description ? item.description : '',
            item.ETA ? item.ETA : item.eta ? item.eta : null,
            item.ETB ? item.ETB : item.etb ? item.etb : null,
            item.CreatedBy ? item.CreatedBy : item.createdBy ? item.createdBy : '',
            null,
            null,
            null,
            item.OperationStatus ? this.operationStatusAdapter.adapt(item.OperationStatus) : item.operationStatus ? this.operationStatusAdapter.adapt(item.operationStatus) : null,
            item.PortLocation ? item.PortLocation : item.portLocation ? item.portLocation : null,
            null,
            null,
            null

            );
    }
}

@Injectable({
    providedIn: 'root'
})
export class DocumentTypeAdapter implements IModelAdapter<DocumentType> {
    constructor() { }
    adapt(item: any): DocumentType {
        return new DocumentType(
            item.Id ? item.Id : item.id ? item.id : 0,
            item.TypeName ? item.TypeName : item.typeName ? item.typeName : ''
            );
    }
}
@Injectable({
    providedIn: 'root'
})
export class OperationDocumentAdapter implements IModelAdapter<OperationDocument> {
    constructor(
        private documentTypeAdapter: DocumentTypeAdapter
    ) { }
    adapt(item: any): OperationDocument {
        return new OperationDocument(
            item.Id ? item.Id : item.id ? item.id : 0,
            item.OperationId ? item.OperationId : item.operationId ? item.operationId : 0,
            item.DocumentTypeId ? item.DocumentTypeId : item.documentTypeId ? item.documentTypeId : 0,
            item.File ? item.File : item.file ? item.file : '',
            item.CreatedDate ? item.CreatedDate : item.createdDate ? item.createdDate : null,
            item.ModifiedDate ? item.ModifiedDate : item.modifiedDate ? item.modifiedDate : null,
            item.DocumentType ? this.documentTypeAdapter.adapt(item.DocumentType) : item.documentType ?  this.documentTypeAdapter.adapt(item.documentType) : null
            );
    }
}
@Injectable({
    providedIn: 'root'
})
export class OperationMissionAdapter implements IModelAdapter<Mission> {
    constructor(
        private documentTypeAdapter: DocumentTypeAdapter
    ) { }
    adapt(item: any): Mission {
        return new Mission(
            item.Id ? item.Id : item.id ? item.id : 0,
            item.OperationId ? item.OperationId : item.operationId ? item.OperationId : 0,
            item.Number ? item.Number : item.number ? item.number : 0,
            item.Name ? item.Name : item.name ? item.name : '',
            item.MissionPath ? item.MissionPath : item.missionPath ? item.missionPath : '',
            item.Address ? item.Address : item.address ? item.address : '',
            item.Type ? item.Type : item.type ? item.type : '',
            item.Description ? item.Description : item.description ? item.description : '',
            item.StartTime ? item.StartTime : item.startTime ? item.startTime : null,
            item.EndTime ? item.EndTime : item.endTime ? item.endTime : null,
            item.UploadedDate ? item.UploadedDate : item.uploadedDate ? item.uploadedDate : null
            );
    }
}
@Injectable({
    providedIn: 'root'
})
export class InstallationAdapter implements IModelAdapter<Installation> {

    constructor(
        private vesselTypeAdpater: VesselTypeAdapter,
        private installationStatusAdapter: InstallationStatusAdapter,
        private nodeAdapter: NodeAdapter,
        private foulingStateAdapter: FoulingStateAdapter,
        private installationTypeAdapter: InstallationTypeAdapter,
        private aisDataAdapter: InstallationAISDataAdapter,
        private operationAdapter: OperationAdapter    ) {

    }
    adapt(item: any): Installation {

        return new Installation(
            item.Id ? item.Id : item.id ? item.id : 0,
            item.vesselNodeId ? item.vesselNodeId : item.VesselNodeId ? item.VesselNodeId : 0,
            item.NodeId ? item.NodeId : item.nodeId ? item.nodeId : 0,
            item.Name ? item.Name : item.name ? item.name : '',
            item.DisplayName ? item.DisplayName : '',
            item.ImoNo ? item.ImoNo : 0,
            item.FoulingId ? item.FoulingId : item.foulingId ? item.foulingId : 0,
            item.JoturnFoulingId ? item.JoturnFoulingId : item.joturnFoulingId ? item.joturnFoulingId : 0,
            item.InstallationStatusId ? item.InstallationStatusId : item.installationStatusId ? item.installationStatusId : 0,
            item.InstallationId ? item.InstallationId : item.installationId ? item.installationId : '',
            item.VesselTypeId ? item.VesselTypeId : item.vesselTypeId ? item.vesselTypeId : 0,
            item.VesselType ? this.vesselTypeAdpater.adapt(item.VesselType) : item.vesselType ? this.vesselTypeAdpater.adapt(item.vesselType) : null,
            item.InstallationStatus ? this.installationStatusAdapter.adapt(item.InstallationStatus) : null,
            item.Node ? this.nodeAdapter.adapt(item.Node) : item.node ? this.nodeAdapter.adapt(item.node) : null,
            item.foulingState ? this.foulingStateAdapter.adapt(item.foulingState) : item.FoulingState ? this.foulingStateAdapter.adapt(item.FoulingState) : null,
            item.installationTypeId ? item.installationTypeId : item.InstallationTypeId ? item.InstallationTypeId : 0,
            item.installationType ? this.installationTypeAdapter.adapt(item.installationType) : item.InstallationType ? this.installationTypeAdapter.adapt(item.InstallationType) : null,
            item.AISData ? this.aisDataAdapter.adapt(item.AISData) : item.aisData ? this.aisDataAdapter.adapt(item.aisData) : null,
            item.Operation ? this.operationAdapter.adapt(item.Operation) : item.operation ? this.operationAdapter.adapt(item.operation) : null

        );
    }
}
