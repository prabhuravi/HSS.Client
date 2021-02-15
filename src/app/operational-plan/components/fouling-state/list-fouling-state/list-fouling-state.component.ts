import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { take } from 'rxjs/operators';
import { AppConstants } from 'src/app/app.constants';
import { SubSection, VesselSection } from 'src/app/models/Section';
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
    private prepareInstallationService: PrepareInstallationService, private operationalPlanService: OperationalPlanService,
    public fb: FormBuilder, private confirmationService: ConfirmationService,
    private messageService: MessageService) { }

  isDataLoading = false;
  @Input() sections: VesselSection[];
  @Output() foulingStateEdited: EventEmitter<any> = new EventEmitter<any>();
  PRIMENG_CONSTANTS = AppConstants.PRIMENG_CONSTANTS;

  cols = [
    { field: 'name', header: 'Section', sortfield: 'name', filterMatchMode: 'contains' },
    { field: 'subSections', header: 'Sub-Section', sortfield: '', filterMatchMode: '' },
    { field: 'foulingState.State', header: 'Fouling State', sortfield: 'foulingState.State', filterMatchMode: 'contains' },
    { field: 'action', header: 'Action', sortfield: '', filterMatchMode: '' }
  ];

  vesselId = 0;

  ngOnInit() {
    this.vesselId = this.prepareInstallationService.installation.id;
    this.isDataLoading = true;
    this.operationalPlanService.getSectionFoulingState(this.vesselId).pipe(take(1)).subscribe((data) => {
      this.isDataLoading = false;
      this.sections = data;
    });
  }

  editSubSectionFoulingState(subSection: SubSection): void {
    const section = this.sections.find((x) => x.id === subSection.vesselSectionId);
    this.foulingStateEdited.emit({ section, subSection });
  }

  onSubSectionFoulingStateUpdated(data: boolean): void {
    if (data) {
      this.isDataLoading = true;
      this.operationalPlanService.getSectionFoulingState(this.vesselId).pipe(take(1)).subscribe((data) => {
        this.isDataLoading = false;
        this.sections = data;
      });
    }
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
