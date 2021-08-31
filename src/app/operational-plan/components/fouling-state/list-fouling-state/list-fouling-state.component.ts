import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
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
    public fb: FormBuilder, private route: ActivatedRoute,
    private messageService: MessageService) { }

  isDataLoading = false;
  @Input() sections: VesselSection[];
  @Output() foulingStateEdited: EventEmitter<any> = new EventEmitter<any>();
  PRIMENG_CONSTANTS = AppConstants.PRIMENG_CONSTANTS;
  appConstants = AppConstants;
  foulingStates: IFoulingState[] = [];
  overallFoulingState: string = 'Not Rated';

  cols = [
    { field: 'name', header: 'Section', sortfield: 'name', filterMatchMode: 'contains' },
    { field: 'subSections', header: 'Sub-Section', sortfield: '', filterMatchMode: '' },
    { field: 'foulingState.State', header: 'Fouling State', sortfield: 'foulingState.State', filterMatchMode: 'contains' },
    { field: 'modifiedDate', header: 'Modified Date', sortfield: 'modifiedDate', filterMatchMode: 'contains' }
  ];

  vesselId = 0;

  ngOnInit() {
    if (!this.prepareInstallationService.installation) {
      this.prepareInstallationService.setInstallationFromRoute(this.route);
    }
    if (this.route !== undefined && this.route !== null) {
      const params = this.route.snapshot.paramMap.get('vesselId');
      this.vesselId = parseInt(params, null);
      this.isDataLoading = true;
      this.getSectionwithFouling();
    }
    this.operationalPlanService.getFoulingStates().pipe(take(1)).subscribe((data) => {
      this.foulingStates = data;
    });
  }

  private getSectionwithFouling() {
    this.isDataLoading = true;
    this.operationalPlanService.getSectionFoulingState(this.vesselId).pipe(take(1)).subscribe((data) => {
      this.isDataLoading = false;
      this.sections = data;
      this.sections.forEach((opSection: VesselSection) => {
        opSection.subSections.sort((a, b) => (a.subSectionNumber < b.subSectionNumber ? -1 : 1));
        this.calculateVesselFoulingState();
      });
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
  onFoulingStateChanged(rowdata: SubSection) {
    this.isDataLoading = true;
    rowdata.foulingId = rowdata.foulingState.Id;
    this.operationalPlanService.updateSubSectionFoulingState(rowdata.id, rowdata).pipe(take(1)).subscribe((data) => {
      this.triggerToast('success', 'Success Message', `Sub Section fouling state updated successfully`);
      this.isDataLoading = false;
      this.getSectionwithFouling();
    });
  }
  
  calculateVesselFoulingState() {
    if (this.sections.some((p) => p.foulingState.State === 'Not Rated')) {
      this.overallFoulingState = 'Not Rated';
    } else if (this.sections.some((p) => p.foulingState.State === 'Poor')) {
      this.overallFoulingState = 'Poor';
    } else if (this.sections.some((p) => p.foulingState.State === 'Fair')) {
      this.overallFoulingState = 'Fair';
    } else if (this.sections.some((p) => p.foulingState.State === 'Good')) {
      this.overallFoulingState = 'Good';
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
