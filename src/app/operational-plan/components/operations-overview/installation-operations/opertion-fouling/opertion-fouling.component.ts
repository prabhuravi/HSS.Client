import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
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
              public fb: FormBuilder, private confirmationService: ConfirmationService, private route: ActivatedRoute,
              private messageService: MessageService) { }

  isDataLoading = false;
  @Input() sections: VesselSection[];
  foulingStates: any[]= [];
  @Input() operation: any;
  operationSections: any[] = [];
  @Output() foulingStateEdited: EventEmitter<any> = new EventEmitter<any>();
  PRIMENG_CONSTANTS = AppConstants.PRIMENG_CONSTANTS;

  cols = [
    { field: 'name', header: 'Section', sortfield: 'name', filterMatchMode: 'contains' },
    { field: 'subSections', header: 'Sub-Section', sortfield: '', filterMatchMode: '' },
    { field: 'foulingState.State', header: 'Fouling State', sortfield: 'foulingState.State', filterMatchMode: 'contains' },
    { field: 'modifiedDate', header: 'Modified Date', sortfield: 'modifiedDate', filterMatchMode: 'contains' }
  
  ];

  vesselId = 0;

  ngOnInit() {
    this.operationalPlanService.getFoulingStates().pipe(take(1)).subscribe((data) => {
      this.foulingStates = data;
      this.onOperationSectionLoad();
    });    
  }
  onOperationSectionLoad() {
    if (this.operation.OperationSections) {
      this.operation.OperationSections.forEach((opSection: any) => {
        this.operationSections.push(opSection);
      });
     }
    }

    onFoulingStateChanged(rowData: any){
      let operationSectionId = 0;
      let vesselSection ;
      this.operationSections.forEach((operationSec) => {
        operationSec.VesselSection.SubSections.forEach((opSubsection) => {
          if(opSubsection.Id === rowData.Id){
            operationSectionId = operationSec.Id;
            vesselSection = operationSec;
          }

        });
      });
      this.operationalPlanService.UpdateOperationFouling(operationSectionId, rowData).pipe(take(1)).subscribe((data) => {
        vesselSection.FoulingState = this.foulingStates.find((x) => x.Id === data.FoulingId);
        vesselSection.FoulingId = data.FoulingId;
        console.log(data);
        rowData.ModifiedDate = new Date();
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
