import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { element } from 'protractor';
import { take } from 'rxjs/operators';
import { AppConstants } from 'src/app/app.constants';
import { SubSection, VesselSection } from 'src/app/models/Section';
import { SectionService } from 'src/app/services/section.service';

@Component({
  selector: 'app-opertion-section',
  templateUrl: './opertion-section.component.html',
  styleUrls: ['./opertion-section.component.scss']
})
export class OpertionSectionComponent implements OnInit {

  constructor(public sectionService: SectionService,
              public fb: FormBuilder, private confirmationService: ConfirmationService,
              private messageService: MessageService, private route: ActivatedRoute) { }

isDataLoading = false;
@Input() vesselSections: VesselSection[];
@Input() vesselSection: VesselSection;
@Input() operation: any;
@Input() gobalSelectedSubSectionId: number[] = [];
operationSections: any[] = [];
@Output() sectionOnEdit: EventEmitter<any> = new EventEmitter<any>();
@Output() subSectionOnEdit: EventEmitter<any> = new EventEmitter<any>();
@Output() subSectionOnAdd: EventEmitter<any> = new EventEmitter<any>();
public subSectionFlag: boolean = false;
clonedSections: { [s: string]: VesselSection; } = {};
PRIMENG_CONSTANTS = AppConstants.PRIMENG_CONSTANTS;

cols = [
{ field: 'VesselSection.Name', header: 'Section', sortfield: 'VesselSection.Name', filterMatchMode: 'contains'  },
{ field: 'subSection', header: 'Sub-Section', sortfield: '', filterMatchMode: '' },
{ field: 'VesselSection.SectionStatus.Name', header: 'Status' , sortfield: 'VesselSection.SectionStatus.Name', filterMatchMode: 'contains'},
{ field: 'action', header: 'Action', sortfield: '', filterMatchMode: '' }

];

ngOnInit() {
  this.onOperationSectionLoad();
}
onOperationSectionLoad() {
if (this.operation.OperationSections) {
  this.operation.OperationSections.forEach((opSection: any) => {
    this.operationSections.push(opSection);
  });
 }

if (this.operation.SecondaryOperations) {
   if (this.operation.SecondaryOperations.OperationSections) {
    this.operation.SecondaryOperations.OperationSections.forEach((opSection: any) => {
      this.operationSections.push(opSection);
  });
   }
 }
}
isBookedSubsection(rowsubSection: SubSection) {
  console.log(rowsubSection);
  console.log(this.gobalSelectedSubSectionId);
  return this.gobalSelectedSubSectionId.find((x) => x === rowsubSection.id);
}

isBookingSectionsValid() {
  let vaild = false;
  this.vesselSections.forEach((section) => {
    section.subSections.forEach((sub) => {
      if (sub.selected) {
        vaild = true;
      }
    });
  });
  return vaild;
}

isBookedSection(rowsection: VesselSection) {
  if (!rowsection || !rowsection.subSections) {
    return false;
  }
  let booked = true;
  rowsection.subSections.forEach((element) => {
    const subSectionid = this.gobalSelectedSubSectionId.find((x) => x === element.id);
    if (!subSectionid) {
      booked = false;
    }
  });
  return booked;
}

private loadVesselSections() {
this.isDataLoading = true;
let vesselId = 0;
if (this.route !== undefined && this.route !== null) {
const params = this.route.snapshot.paramMap.get('vesselId');
vesselId = parseInt(params, null);
this.sectionService.getVesselSections(vesselId).pipe(take(1)).subscribe((data) => {
this.isDataLoading = false;
this.vesselSections = data;
});
}
}

onSectionRowDelete(vesselSectionRow: VesselSection) {
this.confirmationService.confirm({
message: 'Are you sure you want to delete this section?',
accept: () => {
this.isDataLoading = true;
this.vesselSections = this.vesselSections.filter((x) => x !== vesselSectionRow);
this.triggerToast('success', 'Success Message', `Section deleted successfully`);
this.isDataLoading = false;
// this.sectionService.deleteVesselSection(vesselSectionRow.id).pipe(take(1)).subscribe((data) => {
// this.isDataLoading = false;
// this.vesselSections = this.vesselSections.filter((x) => x !== vesselSectionRow);
// this.subSectionFlag = false;
// this.loadVesselSections();
// this.triggerToast('success', 'Success Message', `Section deleted successfully`);
// });
}
});
}

onSubSectionDelete(subSectionRow: SubSection) {

this.confirmationService.confirm({
message: 'Are you sure you want to delete this sub-section?',
accept: () => {
this.isDataLoading = true;
const sectionRow =  this.vesselSections.find((x) => x.id === subSectionRow.vesselSectionId);
let subsections = sectionRow.subSections;
subsections = subsections.filter((x) => x !== subSectionRow);
sectionRow.subSections = subsections;
this.isDataLoading = false;
this.triggerToast('success', 'Success Message', `Sub-section deleted successfully`);
// this.sectionService.deleteSubSection(subSectionRow.id).pipe(take(1)).subscribe((data) => {
// this.isDataLoading = false;
// this.loadVesselSections();
// this.triggerToast('success', 'Success Message', `Sub-section deleted successfully`);
// });
// }
// });

}
});
}

triggerToast(severity: string, summary: string, detail: string): void {
this.messageService.add(
{
severity,
summary,
detail
});
}

}
