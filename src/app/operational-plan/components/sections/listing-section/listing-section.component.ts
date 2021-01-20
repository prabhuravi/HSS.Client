import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { take } from 'rxjs/operators';
import { AppConstants } from 'src/app/app.constants';
import { Section, SectionStatus, SubSection } from 'src/app/models/Section';
import { FromBuilderService } from 'src/app/services/from-builder-service';
import { SectionService } from 'src/app/services/section.service';

@Component({
  selector: 'app-listing-section',
  templateUrl: './listing-section.component.html',
  styleUrls: ['./listing-section.component.scss']
})
export class ListingSectionComponent implements OnInit {

  constructor(public sectionService: SectionService,
              public fb: FormBuilder) { }

  @Input() sections: Section[];
  @Input() section: Section;
  @Output() sectionOnEdit: EventEmitter<any> = new EventEmitter<any>();
  @Output() subSectionOnEdit: EventEmitter<any> = new EventEmitter<any>();
  @Output() subSectionOnAdd: EventEmitter<any> = new EventEmitter<any>();
  public subSectionFlag: boolean = false;
  clonedSections: { [s: string]: Section; } = {};
  PRIMENG_CONSTANTS = AppConstants.PRIMENG_CONSTANTS;

  cols = [
    { field: 'Section', header: 'Section' },
    { field: 'SubSection', header: 'Sub-Section' },
    { field: 'Status', header: 'Status' },
    { field: 'Action', header: 'Action' }

  ];

  ngOnInit() {
    this.sectionService.getSections().pipe(take(1)).subscribe((data) => {
      this.sections = data;
    });

  }

  onSectionRowEditInit(rowData: Section): void {
    this.subSectionFlag = false;
    console.log(rowData);
    this.section = rowData;
    this.sectionOnEdit.emit(rowData);
    rowData.selected = true;
    this.clonedSections[rowData.id] = rowData;
  }

  onSectionDataUpdated(sectionData: any): void {
    let rowData = this.sections.find( (x) => x.id ===  sectionData.id);
    if (rowData) {
      rowData = sectionData;
    } else {
      this.sections.push(sectionData);
    }
  }

  onSubSectionAddInit(SectionRow: Section): void {
      this.subSectionOnAdd.emit(SectionRow);
      this.subSectionFlag = true;
  }

  onSubSectionEditInit(rowData: SubSection): void {
  const sectionRow  =   this.sections.find((x) => x.id === rowData.sectionId);
  this.subSectionOnEdit.emit({sectionRow, rowData});
  this.subSectionFlag = true;

  }

  onSubSectionDataUpdated(subSection: SubSection): void {
       const sectionItem  =   this.sections.find((x) => x.id === subSection.sectionId);
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
  
  onSubSectionCancelled(): void{
    this.subSectionFlag = false;
  }
}
