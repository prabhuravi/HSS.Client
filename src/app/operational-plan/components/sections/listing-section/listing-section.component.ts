import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { take } from 'rxjs/operators';
import { AppConstants } from 'src/app/app.constants';
import { VesselSection, SectionStatus, SubSection } from 'src/app/models/Section';
import { FromBuilderService } from 'src/app/services/from-builder-service';
import { PrepareInstallationService } from 'src/app/services/prepare-installation.service';
import { SectionService } from 'src/app/services/section.service';

@Component({
  selector: 'app-listing-section',
  templateUrl: './listing-section.component.html',
  styleUrls: ['./listing-section.component.scss']
})
export class ListingSectionComponent implements OnInit {

  constructor(public sectionService: SectionService,
    private prepareInstallationService: PrepareInstallationService,
    public fb: FormBuilder, private confirmationService: ConfirmationService,
    private messageService: MessageService, private route: ActivatedRoute) { }

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
    { field: 'name', header: 'Section', sortfield: 'name', filterMatchMode: 'contains' },
    { field: 'subSection', header: 'Sub-Section', sortfield: '', filterMatchMode: '' },
    { field: 'sectionStatus.name', header: 'Status', sortfield: 'sectionStatus.name', filterMatchMode: 'contains' },
    { field: 'action', header: 'Action', sortfield: '', filterMatchMode: '' }

  ];

  ngOnInit() {
    if (!this.prepareInstallationService.installation) {
      this.prepareInstallationService.setInstallationFromRoute(this.route);
    }
    this.loadVesselSections();

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

  onSectionRowEditInit(rowData: VesselSection): void {
    this.subSectionFlag = false;
    this.vesselSection = rowData;
    this.sectionOnEdit.emit(rowData);
    rowData.selected = true;
    this.clonedSections[rowData.id] = rowData;
  }

  onSectionDataUpdated(sectionData: any): void {
    const rowData = this.vesselSections.find((x) => x.id === sectionData.id);
    if (!rowData) {
      this.triggerToast('success', 'Success Message', `Section added successfully`);
    } else {
      this.triggerToast('success', 'Success Message', `Section updated successfully`);
    }
    this.loadVesselSections();
  }

  onSubSectionAddInit(SectionRow: VesselSection): void {
    this.subSectionOnAdd.emit(SectionRow);
    this.subSectionFlag = true;
  }

  onSubSectionEditInit(rowData: SubSection): void {
    const sectionRow = this.vesselSections.find((x) => x.id === rowData.vesselSectionId);
    this.subSectionOnEdit.emit({ sectionRow, rowData });
    this.subSectionFlag = true;

  }

  onSubSectionDataUpdated(subSection: SubSection): void {
    const sectionItem = this.vesselSections.find((x) => x.id === subSection.vesselSectionId);
    if (!sectionItem.subSections) {
      this.triggerToast('success', 'Success Message', `Sub Section added successfully`);
    } else {
      const subsectionItem = sectionItem.subSections.find((x) => x.id === subSection.id);
      if (!subsectionItem) {
        this.triggerToast('success', 'Success Message', `Sub Section added successfully`);
      } else {
        this.triggerToast('success', 'Success Message', `Sub Section updated successfully`);
      }
      this.loadVesselSections();
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
        this.sectionService.deleteVesselSection(vesselSectionRow.id).pipe(take(1)).subscribe((data) => {
          this.isDataLoading = false;
          this.subSectionFlag = false;
          this.loadVesselSections();
          this.triggerToast('success', 'Success Message', `Section deleted successfully`);
        });
      }
    });
  }

  onSubSectionDelete(subSectionRow: SubSection) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this sub-section?',
      accept: () => {
        this.isDataLoading = true;
        this.sectionService.deleteSubSection(subSectionRow.id).pipe(take(1)).subscribe((data) => {
          this.isDataLoading = false;
          this.loadVesselSections();
          this.triggerToast('success', 'Success Message', `Sub-section deleted successfully`);
        });
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
