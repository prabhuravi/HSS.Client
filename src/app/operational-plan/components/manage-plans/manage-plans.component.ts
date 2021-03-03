// import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { OperationalPlanService } from 'src/app/services/operational-plan.service';
// import { Router } from '@angular/router';
// import { MessageService } from 'primeng/api';
// import { AppConstants } from 'src/app/app.constants';
// import * as moment from 'moment';

// @Component({
//   selector: 'app-manage-plans',
//   templateUrl: './manage-plans.component.html',
//   styleUrls: ['./manage-plans.component.scss']
// })
// export class ManagePlansComponent implements OnInit {

//   form: FormGroup;
//   isFormSubmitted = false;
//   operationalPlansList: IOperationalPlan[] = [];
//   cols = [
//     { field: 'VesselName', sortfield: 'VesselName', header: 'Vessel', filterMatchMode: 'contains' },
//     { field: 'ImoNumber', sortfield: '', header: 'IMO', filterMatchMode: 'contains' },
//     { field: 'OperationDate', sortfield: '', header: 'Operation Date', filterMatchMode: 'contains' },
//     { field: 'ETADate', sortfield: '', header: 'Vessel ETA Date', filterMatchMode: 'contains' },
//     { field: 'OperationLoc', sortfield: '', header: 'Location', filterMatchMode: 'contains' },
//     { field: 'OperationTypeName', sortfield: '', header: 'Operation Type', filterMatchMode: 'contains' },
//     { field: 'OperationDes', sortfield: '', header: 'Description', filterMatchMode: 'contains' },
//     { field: 'Status', sortfield: '', header: 'Status', filterMatchMode: 'contains' },
//     { field: 'OperatorName', sortfield: '', header: 'Operator', filterMatchMode: 'contains' },
//     { field: 'PlannerName', sortfield: '', header: 'Planner', filterMatchMode: 'contains' },
//     { field: 'CreatedBy', sortfield: '', header: 'Created By', filterMatchMode: 'contains' },
//     { field: 'LastUpdatedBy', sortfield: '', header: 'Updated By', filterMatchMode: 'contains' },
//     { field: 'ModifiedDate', sortfield: '', header: 'Updated Date', filterMatchMode: 'contains' },
//     { field: 'Id', sortfield: '', header: 'Action', filterMatchMode: 'contains' }
//   ];
//   subOperationsList: ISubOperations[] = [];
//   subOperationCols = [
//     { field: 'SubOperationStartTime', sortfield: 'SubOperationStartTime', header: 'Sub Operation Start Time' },
//     { field: 'SubOperationEndTime', sortfield: '', header: 'Sub Operation End Time' },
//     { field: 'SubOperationDes', sortfield: '', header: 'Description' },
//     { field: 'Status', sortfield: '', header: 'Status' },
//     { field: 'CreatedBy', sortfield: '', header: 'Created By' },
//     { field: 'LastUpdatedBy', sortfield: '', header: 'Updated By' },
//     { field: 'ModifiedDate', sortfield: '', header: 'Updated Date' },
//     { field: 'Id', sortfield: '', header: 'Action' }
//   ];
//   showLogs = false;
//   isDataLoading: boolean;
//   isSubOperationDataLoading: boolean;
//   PRIMENG_CONSTANTS = AppConstants.PRIMENG_CONSTANTS;

//   constructor(
//     private operationalPlanService: OperationalPlanService,
//     private fb: FormBuilder,
//     private router: Router,
//     private messageService: MessageService
//   ) { }

//   ngOnInit(): void {
//     this.getPlanList();
//     this.form = this.buildForm();
//   }

//   getPlanList(): void {
//     this.isDataLoading = true;
//     this.operationalPlanService.getOperationPlans().subscribe((data) => {
//       this.isDataLoading = false;
//       this.operationalPlansList = data;
//     });
//   }

//   loadSubOperations(planId): void {
//     this.isSubOperationDataLoading = true;
//     this.operationalPlanService.getSubOperations(planId).subscribe((data) => {
//       this.isSubOperationDataLoading = false;
//       this.subOperationsList = data;
//     });
//   }

//   buildForm() {
//     const group = this.fb.group({});
//     group.addControl('OperationFromDate', this.fb.control({ value: '', disabled: false }, [Validators.required]));
//     group.addControl('OperationToDate', this.fb.control({ value: '', disabled: false }, [Validators.required]));
//     return group;
//   }

//   searchFormOnSubmit() {
//     const searchData = {
//       fromDate: this.form.value.OperationFromDate,
//       toDate: this.form.value.OperationToDate,
//       showLogs: this.showLogs,
//     };
//     if (this.form.valid) {
//       // this.form.value.showLogs = this.showLogs;
//       if (searchData.fromDate instanceof Date) {
//         const OperationFromDate = moment(searchData.fromDate).format().split('+');
//         searchData.fromDate = `${OperationFromDate[0]}`;
//       }
//       if (searchData.toDate instanceof Date) {
//         const OperationToDate = moment(searchData.toDate).format().split('+');
//         searchData.toDate = `${OperationToDate[0]}`;
//       }
//     }
//     else {
//       searchData.fromDate = '';
//       searchData.toDate = '';
//     }
//     this.isDataLoading = true;
//     this.operationalPlanService.searchOperationPlans(searchData).subscribe((data) => {
//       this.isDataLoading = false;
//       this.operationalPlansList = data;
//     });
//   }

//   completeOperation(PlanId: number) {
//     this.operationalPlanService.completeOperationPlan(PlanId).subscribe((data) => {
//       this.getPlanList();
//     });
//   }

//   completeSubOperation(SubPlanId: number): void {
//     this.operationalPlanService.completeSubOperationPlan(SubPlanId).subscribe((data) => {
//       this.triggerToast('success', 'Success Message', `Data Updated Successfully`);
//     });
//   }

//   triggerToast(severity: string, summary: string, detail: string): void {
//     this.messageService.add(
//       {
//         severity,
//         summary,
//         detail
//       });
//   }
// }
