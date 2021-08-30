import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { take } from 'rxjs/operators';
import { AppConstants } from 'src/app/app.constants';
import { SectionStatus, SubSection, VesselSection } from 'src/app/models/Section';
import { PrepareInstallationService } from 'src/app/services/prepare-installation.service';
import { SectionService } from 'src/app/services/section.service';

@Component({
  selector: 'app-manage-section',
  templateUrl: './manage-section.component.html',
  styleUrls: ['./manage-section.component.scss']
})
export class ManageSectionComponent implements OnInit {
  vesselId = 0;
  isDataLoading = false;
  vesselSections: VesselSection[];
  constructor(public sectionService: SectionService,
    private prepareInstallationService: PrepareInstallationService,
    public fb: FormBuilder, private confirmationService: ConfirmationService,
    private messageService: MessageService, private route: ActivatedRoute) { }

  PRIMENG_CONSTANTS = AppConstants.PRIMENG_CONSTANTS;
  cols = [
    { field: 'name', header: 'Section', sortfield: 'name', filterMatchMode: 'contains' },
    { field: 'subSection', header: 'Sub-Section', sortfield: '', filterMatchMode: '' },
    { field: 'sectionStatus.name', header: 'Status', sortfield: 'sectionStatus.name', filterMatchMode: 'contains' },
    { field: 'action', header: 'Action', sortfield: '', filterMatchMode: '' }
  ];
  sectionName: string;
  sectionToEdit: VesselSection;
  subSectionNumbers = [];
  sectionStatus: SectionStatus[] = [];

  ngOnInit() {
    if (!this.prepareInstallationService.installation) {
      this.prepareInstallationService.setInstallationFromRoute(this.route);
    }
    this.loadVesselSections();
  }

  private loadVesselSections() {
    this.isDataLoading = true;
    if (this.route !== undefined && this.route !== null) {
      const params = this.route.snapshot.paramMap.get('vesselId');
      this.vesselId = parseInt(params, null);
      this.sectionService.getVesselSections(this.vesselId).pipe(take(1)).subscribe((data) => {
        this.isDataLoading = false;
        this.vesselSections = data;
        this.subSectionNumbers = new Array<number>(this.vesselSections.length);
        this.vesselSections.forEach(vesselSection => {
          vesselSection.subSections.sort((a, b) => (a.subSectionNumber > b.subSectionNumber) ? 1 : -1);
        });
        this.sectionService.getSectionStatus().pipe(take(1)).subscribe((data) => {
          this.isDataLoading = false;
          this.sectionStatus = data;
        });
      });
    }
  }

  onSectionRowEdit(rowData: VesselSection): void {
    this.sectionName = rowData.name;
    this.sectionToEdit = rowData;
  }

  onEditSaveSection(event) {
    event.data.sectionStatusId = event.data.sectionStatus.id;
    this.isDataLoading = true;
    this.sectionService.UpdateVesselSection(event.data).pipe(take(1)).subscribe((data) => {
      this.isDataLoading = false;
      if (data) {
        this.triggerToast('success', 'Success Message', `Section updated successfully`);
      }
      else {
        this.triggerToast('error', 'Message', `Section not updated`);
      }
    });
  }

  onEditSaveSubSection(event) {
    event.data.sectionStatusId = event.data.sectionStatus.id;
    this.isDataLoading = true;
    this.sectionService.UpdateVesselSubSection(event.data).pipe(take(1)).subscribe((data) => {
      this.isDataLoading = false;
      // this.loadVesselSections();
      if (data) {
        this.triggerToast('success', 'Success Message', `Sub-section updated successfully`);
      }
      else {
        this.triggerToast('error', 'Message', `Sub-section not updated`);
      }
    });
  }

  addSection(sectionName: string) {
    if (this.sectionToEdit) {
      //update section name
      this.confirmationService.confirm({
        message: 'Are you sure you want to update the section name ?',
        accept: () => {
          this.isDataLoading = true;
          this.sectionService.addVesselSection({ Id: this.sectionToEdit.id, Name: this.sectionName }).pipe(take(1)).subscribe((data) => {
            this.isDataLoading = false;
            this.sectionName = undefined;
            this.sectionToEdit = undefined;
            this.loadVesselSections();
            if (data) {
              this.triggerToast('success', 'Success Message', `Section name updated successfully`);
            }
            else {
              this.triggerToast('error', 'Message', `Could not update section name`);
            }
          });
        }
      });
    }
    else {
      // add new section
      this.confirmationService.confirm({
        message: 'Are you sure you want to add new section ?',
        accept: () => {
          this.isDataLoading = true;
          this.sectionService.addVesselSection({ VesselId: this.vesselId, Name: this.sectionName }).pipe(take(1)).subscribe((data) => {
            this.isDataLoading = false;
            this.sectionName = undefined;
            this.sectionToEdit = undefined;
            this.loadVesselSections();
            if (data) {
              this.triggerToast('success', 'Success Message', `Section added successfully`);
            }
            else {
              this.triggerToast('error', 'Message', `Section with this name already exists`);
            }
          });
        }
      });
    }
  }

  cancelEditSection() {
    this.sectionName = undefined;
    this.sectionToEdit = undefined;
  }

  addSubSection(subSectionNumber: string, vesselSection: VesselSection, sectionRowIndex): void {
    if (this.vesselSections.some(p => p.subSections.some(q => q.subSectionNumber == Number(subSectionNumber)))) {
      this.subSectionNumbers[sectionRowIndex] = undefined;
      this.triggerToast('error', 'Message', `Section number should be unique across all sections`);
    }
    else {
      const newSubSection = new SubSection(0, vesselSection.id, 1, 1, 1,
        Number(subSectionNumber), null, null, null, null);
      this.isDataLoading = true;
      this.sectionService.CreateVesselSubSection(newSubSection).pipe(take(1)).subscribe((data) => {
        this.isDataLoading = false;
        // this.loadVesselSections();
        if (data.id) {
          this.subSectionNumbers[sectionRowIndex] = undefined;
          newSubSection.id = data.id;
          newSubSection.sectionStatus = this.sectionStatus.find(p => p.id == newSubSection.sectionStatusId);
          let vesselSectionIndex = this.vesselSections.findIndex(v => v.id == vesselSection.id);
          this.vesselSections[vesselSectionIndex].subSections.push(newSubSection);
          this.vesselSections[vesselSectionIndex].subSections.sort((a, b) => (a.subSectionNumber > b.subSectionNumber) ? 1 : -1);
          this.triggerToast('success', 'Success Message', `Sub-section added successfully`);
        }
        else {
          this.subSectionNumbers[sectionRowIndex] = undefined;
          this.triggerToast('error', 'Message', `Sub-section with this number already exists`);
        }
      });
    }
  }
  
  onSectionRowDelete(vesselSectionRow: VesselSection) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this section?',
      accept: () => {
        this.isDataLoading = true;
        this.sectionService.deleteVesselSection(vesselSectionRow.id).pipe(take(1)).subscribe((data) => {
          this.isDataLoading = false;
          this.loadVesselSections();
          this.cancelEditSection();
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
