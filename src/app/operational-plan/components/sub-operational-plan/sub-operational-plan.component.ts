// import { Component, OnInit } from '@angular/core';
// import { OperationalPlanService } from 'src/app/services/operational-plan.service';
// import { FormType, AppConstants } from '../../../app.constants';
// import { ConfirmationService, MessageService } from 'primeng/api';
// import { take } from 'rxjs/operators';
// import { ActivatedRoute, Router } from '@angular/router';
// import { Subscription } from 'rxjs';

// @Component({
//   selector: 'app-sub-operational-plan',
//   templateUrl: './sub-operational-plan.component.html',
//   styleUrls: ['./sub-operational-plan.component.scss']
// })
// export class SubOperationalPlanComponent implements OnInit {
//   planStatusList: IPlanStatus[] = [];
//   planDetails: any;
//   subOperationsList: ISubOperations[] = [];
//   formType = FormType;
//   config = {
//     formTitle: 'Sub Operation',
//     formList: []
//   };

//   subOperationCols = [
//     { field: 'SubOperationStartTime', header: 'Start Time' },
//     { field: 'SubOperationEndTime', header: 'End Time' },
//     { field: 'SubOperationDes', header: 'Description' },
//     { field: 'Status', header: 'Status' },
//     { field: 'OperatorName', header: 'Operator' },
//     { field: 'Action', header: 'Action' }
//   ];

//   isDataLoading: boolean;
//   formValues: any = null;
//   activeId = 0;
//   PRIMENG_CONSTANTS = AppConstants.PRIMENG_CONSTANTS;
//   allSubscription: Subscription[] = [];
//   planId = 0;
//   formReset: any;

//   constructor(
//     private operationalPlanService: OperationalPlanService,
//     private confirmationService: ConfirmationService,
//     private route: ActivatedRoute,
//     private router: Router, public messageService: MessageService
//   ) { }

//   ngOnInit() {
//     this.planStatusList = this.operationalPlanService.getPlanStatus();
//     if (this.route && this.route.params) {
//       this.allSubscription.push(
//         this.route.params.subscribe((params) => {
//           // tslint:disable-next-line:radix
//           this.planId = parseInt(params.planid);
//           this.loadData();
//         })
//       );
//     }
//   }

//   loadData(): void {
//     this.isDataLoading = true;
//     this.operationalPlanService.getOperationPlanById(this.planId).pipe(take(1)).subscribe((data) => {
//       this.planDetails = data;
//       this.constructForm();
//       this.operationalPlanService.getSubOperations(this.planId).subscribe((data) => {
//         this.isDataLoading = false;
//         this.subOperationsList = data;
//       });
//     });
//   }
//   constructForm(): void {
//     if (!this.planDetails) {
//       return;
//     }
//     this.config.formList = [
//       {
//         type: FormType.datepicker,
//         label: 'Start Time',
//         labelSmall: '(Start and End Time should be greater than Operation End Time)',
//         value: '',
//         key: 'SubOperationStartTime',
//         validators: ['required'],
//         disabled: false,
//         mindate: new Date(this.planDetails.OperationDate)
//       },
//       {
//         type: FormType.datepicker,
//         label: 'End Time',
//         labelSmall: '(Start and End Time should be greater than Operation End Time)',
//         value: '',
//         key: 'SubOperationEndTime',
//         validators: ['required'],
//         disabled: false,
//         mindate: new Date(this.planDetails.OperationDate)
//       },
//       {
//         type: FormType.dropdown,
//         label: 'Status',
//         options: this.planStatusList,
//         value: this.planStatusList[0],
//         key: 'Status',
//         validators: [],
//         optionLabel: 'name',
//         disabled: true
//       },
//       {
//         type: FormType.text,
//         label: 'Description',
//         value: '',
//         key: 'SubOperationDes',
//         validators: [],
//         disabled: false
//       }
//     ];
//   }

//   formSubmitted(formData: any): void {
//     this.confirmationService.confirm({
//       message: 'Are you sure that you want to perform this action?',
//       accept: () => {
//         this.updateData(formData);
//       }
//     });
//   }

//   editData(subPlanData: any): void {
//     const data = JSON.parse(JSON.stringify((subPlanData)));
//     this.activeId = data.Id;
//     data.Status = this.planStatusList.find((e) => e.name === data.Status);
//     data.SubOperationStartTime = new Date(data.SubOperationStartTime);
//     data.SubOperationEndTime = new Date(data.SubOperationEndTime);
//     this.formReset = false;
//     this.formValues = data;
//   }

//   updateData(formData: any): void {
//     formData.PlanId = this.planDetails.Id;
//     if (this.activeId !== 0) {
//       formData.Id = this.activeId;
//       formData.Status = formData.Status.value;
//     } else {
//       formData.Status = 'New';
//     }

//     if (this.activeId !== 0) {
//       this.operationalPlanService.updateSubOperationPlan(formData.Id, formData).subscribe((data) => {
//         this.triggerToast('success', 'Success Message', `Sub Operation Plan Updated Successfully`);
//         // this.formReset = new Boolean(true);
//         // this.activeId = null;
//         // this.config.formTitle = 'Edit Sub Operation Plan';
//         // this.formValues = null;
//         this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
//           this.router.navigate([`/operational-plan/sub-operational-plan/${this.planId}`]);
//         });
//       });
//     } else {
//       this.operationalPlanService.addSubOperationPlan(formData).subscribe((data) => {
//         this.triggerToast('success', 'Success Message', `Sub Operation Plan Added Successfully`);
//         // this.formReset = new Boolean(true);
//         // this.activeId = null;
//         // this.config.formTitle = 'Add Sub Operation Plan';
//         // this.formValues = null;
//         this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
//           this.router.navigate([`/operational-plan/sub-operational-plan/${this.planId}`]);
//         });
//       });
//     }

//   }

//   completeSubOperation(rowData: any): void {
//     this.operationalPlanService.completeSubOperationPlan(rowData.Id).subscribe((data) => {
//       this.triggerToast('success', 'Success Message', `Sub Operation Plan Completed Successfully`);
//       this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
//         this.router.navigate([`/operational-plan/sub-operational-plan/${this.planId}`]);
//       });
//       // this.loadData();
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
