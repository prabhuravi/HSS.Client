import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { element } from 'protractor';
import { take } from 'rxjs/operators';
import { AppConstants } from 'src/app/app.constants';
import { SubSection, VesselSection } from 'src/app/models/Section';
import { OperationalPlanService } from 'src/app/services/operational-plan.service';
import { SectionService } from 'src/app/services/section.service';

@Component({
  selector: 'app-opertion-section',
  templateUrl: './opertion-section.component.html',
  styleUrls: ['./opertion-section.component.scss']
})
export class OpertionSectionComponent implements OnInit {

  constructor(public sectionService: SectionService,
    public fb: FormBuilder, private confirmationService: ConfirmationService,
    private messageService: MessageService, private route: ActivatedRoute,
    private operationalPlanService: OperationalPlanService, private router: Router) { }

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
    { field: 'VesselSection.Name', header: 'Section', sortfield: 'VesselSection.Name', filterMatchMode: 'contains' },
    { field: 'subSection', header: 'Sub-Section', sortfield: '', filterMatchMode: '' },
    { field: 'VesselSection.SectionStatus.Name', header: 'Status', sortfield: 'VesselSection.SectionStatus.Name', filterMatchMode: 'contains' },
    { field: 'action', header: 'Action', sortfield: '', filterMatchMode: '' }

  ];

  ngOnInit() {
    this.onOperationSectionLoad(null);
  }

  onOperationSectionLoad(op: any) {
    if (op) {
      this.operation = op;
    }
    this.operationSections = [];
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

  onSectionRowDelete(operationSection: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to remove this section from this operation?',
      accept: () => {
        this.operationalPlanService.deleteOperationSection(operationSection.Id).pipe(take(1)).subscribe((data) => {
          this.isDataLoading = true;
          this.operationSections = this.operationSections.filter((x) => x !== operationSection);
          this.triggerToast('success', 'Success Message', `Section deleted successfully`);
          this.operation.OperationSections =  this.operationSections;
          this.sectionOnEdit.emit(this.operation);
          this.isDataLoading = false;
        });

      }
    });
  }

  onSubSectionDelete(operationSubSection: any) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to remove this sub-section from this operation?',
      accept: () => {
        this.operationalPlanService.deleteOperationSubSection(operationSubSection.Id).pipe(take(1)).subscribe((data) => {
          this.isDataLoading = true;
          const sectionRow = this.operationSections.find((x) => x.Id === operationSubSection.OperationSectionId);
          let subsections = sectionRow.OperationSubSections;
          subsections = subsections.filter((x) => x !== operationSubSection);
          if (subsections.length > 0) {
            sectionRow.OperationSubSections = subsections;
            sectionRow.VesselSection.SubSections = sectionRow.VesselSection.SubSections.filter((x) => x.Id !== operationSubSection.SubSectionId);
          } else {
            this.operationSections = this.operationSections.filter((x) => x !== sectionRow);
          }
          this.isDataLoading = false;
          this.operation.OperationSections =  this.operationSections;
          this.sectionOnEdit.emit(this.operation);
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
  
  goToListOperations() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/operational-plan/operations-overview/' + this.operation.VesselId])
    );
  }

}
