import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { take } from 'rxjs/operators';
import { AppConstants } from 'src/app/app.constants';
import { VesselSection, SectionStatus, SubSection } from 'src/app/models/Section';
import { FromBuilderService } from 'src/app/services/from-builder-service';
import { SectionService } from 'src/app/services/section.service';

@Component({
  selector: 'app-listing-section',
  templateUrl: './listing-section.component.html',
  styleUrls: ['./listing-section.component.scss']
})
export class ListingSectionComponent implements OnInit {

  constructor(public sectionService: SectionService,
              public fb: FormBuilder, private confirmationService: ConfirmationService,
              private messageService: MessageService) { }

 isDataLoading = false;
  @Input() vesselSections: VesselSection[];
  @Input() vesselSection: VesselSection;
  @Output() sectionOnEdit: EventEmitter<any> = new EventEmitter<any>();
  @Output() subSectionOnEdit: EventEmitter<any> = new EventEmitter<any>();
  @Output() subSectionOnAdd: EventEmitter<any> = new EventEmitter<any>();
  public subSectionFlag: boolean = false;
  clonedSections: { [s: string]: VesselSection; } = {};
  PRIMENG_CONSTANTS = AppConstants.PRIMENG_CONSTANTS;

  cols = [
    { field: 'name', header: 'Section', sortfield: 'name', filterMatchMode: 'contains'  },
    { field: 'subSection', header: 'Sub-Section', sortfield: '', filterMatchMode: '' },
    { field: 'sectionStatus.name', header: 'Status' , sortfield: 'sectionStatus.name', filterMatchMode: 'contains'},
    { field: 'action', header: 'Action', sortfield: '', filterMatchMode: '' }

  ];

  ngOnInit() {
    this.isDataLoading = true;
    this.sectionService.getSections().pipe(take(1)).subscribe((data) => {
      this.isDataLoading = false;
      this.vesselSections = data;
    });

  }

  onSectionRowEditInit(rowData: VesselSection): void {
    this.subSectionFlag = false;
    console.log(rowData);
    this.vesselSection = rowData;
    this.sectionOnEdit.emit(rowData);
    rowData.selected = true;
    this.clonedSections[rowData.id] = rowData;
  }

  onSectionDataUpdated(sectionData: any): void {
    let rowData = this.vesselSections.find( (x) => x.id ===  sectionData.id);
    if (rowData) {
      rowData = sectionData;
    } else {
      this.vesselSections.push(sectionData);
    }
  }

  onSubSectionAddInit(SectionRow: VesselSection): void {
      this.subSectionOnAdd.emit(SectionRow);
      this.subSectionFlag = true;
  }

  onSubSectionEditInit(rowData: SubSection): void {
  const sectionRow  =   this.vesselSections.find((x) => x.id === rowData.vesselSectionId);
  this.subSectionOnEdit.emit({sectionRow, rowData});
  this.subSectionFlag = true;

  }

  onSubSectionDataUpdated(subSection: SubSection): void {
       const sectionItem  =   this.vesselSections.find((x) => x.id === subSection.vesselSectionId);
       console.log(sectionItem);
       if (!sectionItem.subSections) {
      sectionItem.subSections = [];
      sectionItem.subSections.push(subSection);
    } else {
     let subsectionItem =  sectionItem.subSections.find((x) => x.id === subSection.id);
     if (subsectionItem) {
      subsectionItem = subSection;
     } else {
      sectionItem.subSections.push(subSection);
     }

    }

       this.subSectionFlag = false;
  }

  onSubSectionCancelled(): void {
    this.subSectionFlag = false;
  }
  onSectionRowDelete(vesselSectionRow: VesselSection) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this section?',
      accept: () => {

        this.isDataLoading = true;
        this.isDataLoading = false;

        this.vesselSections = this.vesselSections.filter((x) => x !== vesselSectionRow);
        this.subSectionFlag = false;
        this.triggerToast('success', 'Success Message', `Section deleted successfully`);
      }
    });
  }

  onSubSectionDelete(subSectionRow: SubSection) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this sub-section?',
      accept: () => {

        this.isDataLoading = true;
        this.isDataLoading = false;
        const sectionRow =  this.vesselSections.find((x) => x.id === subSectionRow.vesselSectionId);
        let subsections = sectionRow.subSections;
        subsections = subsections.filter((x) => x !== subSectionRow);
        sectionRow.subSections = subsections;
        this.triggerToast('success', 'Success Message', `Sub-section deleted successfully`);
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
