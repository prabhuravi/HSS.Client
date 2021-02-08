import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { take } from 'rxjs/operators';
import { AppConstants } from 'src/app/app.constants';
import {  SubSection, VesselSection } from 'src/app/models/Section';
import { OperationalPlanService } from 'src/app/services/operational-plan.service';
import { PrepareInstallationService } from 'src/app/services/prepare-installation.service';
import { SectionService } from 'src/app/services/section.service';

@Component({
  selector: 'app-list-fouling-state',
  templateUrl: './list-fouling-state.component.html',
  styleUrls: ['./list-fouling-state.component.scss']
})
export class ListFoulingStateComponent implements OnInit {

  constructor(public sectionService: SectionService,
              private prepareInstallationService: PrepareInstallationService,
              public fb: FormBuilder, private confirmationService: ConfirmationService,
              private messageService: MessageService) { }

  isDataLoading = false;
  @Input() sections: VesselSection[];
  @Input() section: VesselSection;
  // @Output() sectionOnEdit: EventEmitter<any> = new EventEmitter<any>();
  @Output() foulingStateEdited: EventEmitter<any> = new EventEmitter<any>();
  // @Output() subSectionOnAdd: EventEmitter<any> = new EventEmitter<any>();
  public subSectionFlag: boolean = false;
  PRIMENG_CONSTANTS = AppConstants.PRIMENG_CONSTANTS;

  cols = [
    { field: 'name', header: 'Section', sortfield: 'name', filterMatchMode: 'contains' },
    { field: 'subSection', header: 'Sub-Section', sortfield: '', filterMatchMode: '' },
    { field: 'foulingState.State', header: 'Fouling State', sortfield: 'foulingState.State', filterMatchMode: 'contains' },
    { field: 'action', header: 'Action', sortfield: '', filterMatchMode: '' }

  ];

  ngOnInit() {
    this.isDataLoading = true;
    this.sectionService.getVesselSections(this.prepareInstallationService.installation.id).pipe(take(1)).subscribe((data) => {
      this.isDataLoading = false;
      this.sections = data;
      console.log(this.sections);
    });

  }

  // onSectionRowEditInit(rowData: Section): void {
  // this.subSectionFlag = false;
  // console.log(rowData);
  // this.section = rowData;
  // this.sectionOnEdit.emit(rowData);
  // rowData.selected = true;
  // this.clonedSections[rowData.id] = rowData;
  // }

  // onSectionDataUpdated(sectionData: any): void {
  //   let rowData = this.sections.find((x) => x.id === sectionData.id);
  //   if (rowData) {
  //     rowData = sectionData;
  //   } else {
  //     this.sections.push(sectionData);
  //   }
  // }

  // onSubSectionAddInit(SectionRow: Section): void {
  // this.subSectionOnAdd.emit(SectionRow);
  // this.subSectionFlag = true;
  // }

  editSubSectionFoulingState(subSection: SubSection): void {
    console.log(subSection);
    const section = this.sections.find((x) => x.id === subSection.vesselSectionId);
    console.log(section);
    this.foulingStateEdited.emit({ section, subSection });
    this.subSectionFlag = true;
  }

  onSubSectionFoulingStateUpdated(data: SubSection): void {
    console.log(data);
    const sectionItem = this.sections.find((x) => x.id === data.vesselSectionId);

    this.sections.forEach((section) => {
      if (section.id === data.vesselSectionId) {
        console.log(section);
        section.subSections.forEach((subSection) => {
          if (subSection.id === data.id) {
            subSection = data;
            console.log(subSection);
          }
        });
      }
    });

    console.log(this.sections);

    // if (!sectionItem.subSections) {
    //   sectionItem.subSections = [];
    //   sectionItem.subSections.push(subSection);
    // } else {
    //   let subsectionItem = sectionItem.subSections.find((x) => x.id === subSection.id);
    //   if (subsectionItem) {
    //     subsectionItem = subSection;
    //   } else {
    //     sectionItem.subSections.push(subSection);
    //   }

    // }

    this.subSectionFlag = false;
  }

  onFoulingStateCancelled(): void {
  this.subSectionFlag = false;
  }

  // onSectionRowDelete(sectionRow: Section) {
  // this.confirmationService.confirm({
  // message: 'Are you sure you want to delete this section?',
  // accept: () => {

  // this.isDataLoading = true;
  // this.isDataLoading = false;

  // this.sections = this.sections.filter((x) => x !== sectionRow);
  // this.subSectionFlag = false;
  // this.triggerToast('success', 'Success Message', `Section deleted successfully`);
  // }
  // });
  // }

  // onSubSectionDelete(subSectionRow: SubSection) {

  // this.confirmationService.confirm({
  // message: 'Are you sure you want to delete this sub-section?',
  // accept: () => {

  // this.isDataLoading = true;
  // this.isDataLoading = false;
  // const sectionRow =  this.sections.find((x) => x.id === subSectionRow.vesselSectionId);
  // let subsections = sectionRow.subSections;
  // subsections = subsections.filter((x) => x !== subSectionRow);
  // sectionRow.subSections = subsections;
  // this.triggerToast('success', 'Success Message', `Sub-section deleted successfully`);
  // }
  // });

  // }

  triggerToast(severity: string, summary: string, detail: string): void {
    this.messageService.add(
      {
        severity,
        summary,
        detail
      });
  }

}
