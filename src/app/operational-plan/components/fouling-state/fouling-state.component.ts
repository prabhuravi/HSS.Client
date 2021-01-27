import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { take } from 'rxjs/operators';
import { Section } from 'src/app/models/Section';
import { OperationalPlanService } from 'src/app/services/operational-plan.service';

@Component({
  selector: 'app-fouling-state',
  templateUrl: './fouling-state.component.html',
  styleUrls: ['./fouling-state.component.scss']
})
export class FoulingStateComponent implements OnInit {

  vesselSections: Section[] = [];
  selectedSection: Section = null;
  foulingStates: IFoulingState[] = [];
  selectedfoulingState: IFoulingState = null;
  sectionFoulingStates: Section[] = [];

  isDataLoading = false;
  disableActivity: boolean;
  vesselId = 0;
  @Output() nextActiveTab: EventEmitter<any> = new EventEmitter();

  cols = [
    { field: 'name', sortfield: 'name', header: 'Section', filterMatchMode: 'contains' },
    { field: 'foulingState', sortfield: 'foulingState', header: 'Fouling State', filterMatchMode: 'contains' },
    { field: 'id', sortfield: '', header: 'Action' }
  ];

  constructor(private operationalPlanService: OperationalPlanService, private router: Router,
    private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit() {

    this.getVesselSections();
    this.getFoulingStates();
    this.getSectionFoulingStates();

    // this.sectionFoulingStates = [{ Id: 1, VesselId: 1, SectionName: 'Top', Status: null, FoulingId: 1, JotunFoulingId: null, FoulingState: 'Good', Subsections: null }, { Id: 2, VesselId: 1, SectionName: 'Bottom', Status: null, FoulingId: 2, JotunFoulingId: null, FoulingState: 'Poor', Subsections: null }];
    // this.vesselSections = [{ Id: 1, VesselId: 1, SectionName: 'Top', Status: null, FoulingId: null, JotunFoulingId: null, FoulingState: null, Subsections: null },
    // { Id: 2, VesselId: 1, SectionName: 'Bottom', Status: null, FoulingId: null, JotunFoulingId: null, FoulingState: null, Subsections: null }];
    // this.foulingStates = [{ Id: 1, State: 'Good', Code: '', Category: '', CreatedBy: '' }, { Id: 2, State: 'Poor', Code: '', Category: '', CreatedBy: '' }, { Id: 3, State: 'Fair', Code: '', Category: '', CreatedBy: '' }];
  }

  getSectionFoulingStates() {
    this.isDataLoading = true;
    this.operationalPlanService.getSectionFoulingStates(this.vesselId).pipe(take(1)).subscribe((data) => {
      this.sectionFoulingStates = data;
      this.isDataLoading = false;
      console.log(this.sectionFoulingStates);
    });
  }

  getVesselSections() {
    this.isDataLoading = true;
    this.operationalPlanService.getVesselSections(this.vesselId).pipe(take(1)).subscribe((data) => {
      this.vesselSections = data;
      this.isDataLoading = false;
      console.log(this.vesselSections);
    });
  }

  getFoulingStates() {
    this.isDataLoading = true;
    this.operationalPlanService.getFoulingStates().pipe(take(1)).subscribe((data) => {
      this.foulingStates = data;
      this.isDataLoading = false;
      console.log(this.foulingStates);
    });
  }

  updateFoulingStateToSection() {
    console.log(this.selectedSection);
    console.log(this.selectedfoulingState);
    // if (this.sectionFoulingStates.findIndex(p => p.Id == this.selectedSection.Id) == -1) {

      this.isDataLoading = true;
      this.operationalPlanService.updateFoulingStateToSection({ SectionId: this.selectedSection.id, FoulingStateId: this.selectedfoulingState.Id, VesselId: this.vesselId }).subscribe((data) => {
        this.triggerToast('success', 'Success Message', `Fouling state updated for the section`);
        this.isDataLoading = false;
        this.getSectionFoulingStates();
      });

    // }
    // else {
    //   this.triggerToast('error', 'Failure Message', `Section is already assigned a fouling state. Please choose edit option from grid below to update it`);
    // }


    // this.isDataLoading = true;
    // this.operationalPlanService.updateSectionFoulingState(this.selectedSection.Id, { SectionId: this.selectedSection.Id, FoulingStateId: this.selectedfoulingState.Id, VesselId: this.vesselId }).subscribe((data) => {
    //   this.triggerToast('success', 'Success Message', `Fouling state updated for section `+ rowData.SectionName);
    //   this.isDataLoading = false;
    //   this.getSectionFoulingStates();
    // });


  }

  // deleteSection(rowData: ISection) {
  //   console.log(rowData);
  //   this.confirmationService.confirm({
  //     message: 'Are you sure you want to delete section ' + rowData.SectionName + '?',
  //     accept: () => {
  //       this.isDataLoading = true;
  //       this.operationalPlanService.deleteSection(rowData.Id).pipe(take(1)).subscribe(() => {
  //         this.triggerToast('success', 'Success Message', 'Section deleted');
  //         this.isDataLoading = false;
  //         this.getSectionFoulingStates();
  //       });
  //     }
  //   });
  // }

  editSectionFoulingState(rowData: Section) {
    console.log(rowData);
    this.selectedSection = this.vesselSections.find(v => v.id == rowData.id);
    console.log(this.selectedSection);

    this.selectedfoulingState = this.foulingStates.find(v => v.Id == rowData.id);
    console.log(this.selectedfoulingState);

    // this.isDataLoading = true;
    // this.operationalPlanService.updateSectionFoulingState(this.selectedSection.Id, { SectionId: this.selectedSection.Id, FoulingStateId: this.selectedfoulingState.Id, VesselId: this.vesselId }).subscribe((data) => {
    //   this.triggerToast('success', 'Success Message', `Fouling state updated for section `+ rowData.SectionName);
    //   this.isDataLoading = false;
    //   this.getSectionFoulingStates();
    // });

  }

  clear()
  {
    this.selectedSection = null;
    this.selectedfoulingState = null;
  }
  
  cancel()
  {
    this.router.navigateByUrl('/operational-plan');
  }

  next(): void {
    this.nextActiveTab.emit(4);
    this.router.navigateByUrl('/operational-plan/prepare-installation/create-documents');
  }

  anyFunction(){
    console.log('fouling state. called from parent - prepare installation')
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
