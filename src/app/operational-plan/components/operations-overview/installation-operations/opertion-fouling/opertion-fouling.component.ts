/*
 * KONGSBERG PROPRIETARY. This document and its accompanying elements, contain KONGSBERG information which is proprietary and confidential.
Any disclosure, copying, distribution or use is prohibited if not otherwise explicitly agreed with KONGSBERG in writing.
Any authorized reproduction, in whole or in part, must include this legend. © [year of creation] KONGSBERG – All rights reserved.
 */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { take } from 'rxjs/operators';
import { AppConstants } from 'src/app/app.constants';
import { VesselSection } from 'src/app/models/Section';
import { OperationalPlanService } from 'src/app/services/operational-plan.service';
import { SectionService } from 'src/app/services/section.service';

@Component({
  selector: 'app-opertion-fouling',
  templateUrl: './opertion-fouling.component.html',
  styleUrls: ['./opertion-fouling.component.scss']
})
export class OpertionFoulingComponent implements OnInit {
  constructor(public sectionService: SectionService,
              private operationalPlanService: OperationalPlanService,
              public fb: FormBuilder, private messageService: MessageService, private router: Router) { }

  isDataLoading = false;
  appConstants = AppConstants;
  @Input() sections: VesselSection[];
  foulingStates: any[]= [];
  @Input() operation: any;
  operationSections: any[] = [];
  @Output() foulingStateEdited: EventEmitter<any> = new EventEmitter<any>();
  PRIMENG_CONSTANTS = AppConstants.PRIMENG_CONSTANTS;

  cols = [
    { field: 'name', header: 'Section', sortfield: 'name', filterMatchMode: 'contains' },
    { field: 'subSections', header: 'Sub-Section', sortfield: '', filterMatchMode: '' },
    { field: 'VesselSectionOldFoulingState.State', header: 'Prev Fouling State', sortfield: 'VesselSectionOldFoulingState.State', filterMatchMode: 'contains' },
    { field: 'VesselSectionNewFoulingState.State', header: 'Aft Fouling State', sortfield: 'VesselSectionNewFoulingState.State', filterMatchMode: 'contains' },
    { field: 'modifiedDate', header: 'Last Modified Date', sortfield: 'modifiedDate', filterMatchMode: 'contains' }
  ];

  vesselId = 0;

  ngOnInit() {
    this.operationalPlanService.getFoulingStates().pipe(take(1)).subscribe((data) => {
      this.foulingStates = data;
      this.onOperationSectionLoad(null);
    });
  }
  onOperationSectionLoad(op : any) {
    if(op){
      this.operation = op;
    }
    this.operationSections = [];
    if (this.operation.OperationSections) {
      this.operation.OperationSections.forEach((opSection: any) => {
        opSection.OperationSubSections.sort((a, b) => (a.SubSection.SubSectionNumber < b.SubSection.SubSectionNumber ? -1 : 1));
        this.operationSections.push(opSection);
      });
     }
    }

    onFoulingStateChanged(rowData: any){
      let operationSectionId = 0;
      rowData.SubSectionNewFoulingId = rowData.SubSectionNewFoulingState.Id;
      let vesselSection ;
      this.operationSections.forEach((operationSec) => {
        operationSec.VesselSection.SubSections.forEach((opSubsection) => {
          if(opSubsection.Id === rowData.SubSectionId){
            operationSectionId = operationSec.Id;
            vesselSection = operationSec;
          }
        });
      });
      this.isDataLoading = true;
      this.operationalPlanService.UpdateOperationFouling(operationSectionId, rowData).pipe(take(1)).subscribe((data) => {
        const newVesselSectionFouling = this.foulingStates.find((x) => x.Id === data.FoulingId);
        vesselSection.VesselSectionNewFoulingState.State = newVesselSectionFouling.State;
        vesselSection.VesselSectionNewFoulingState.Id = newVesselSectionFouling.Id;
        vesselSection.VesselSectionNewFoulingId = data.FoulingId;
        vesselSection.VesselSection.ModifiedDate = data.ModifiedDate;
        rowData.SubSection.ModifiedDate = new Date();
        this.triggerToast('success', 'Success Message', `Fouling updated successfully`);
        this.isDataLoading = false;
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
  goToListOperations(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/operational-plan/operations-overview/' + this.operation.VesselId])
    );
  }

}
