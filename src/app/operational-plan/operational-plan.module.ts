import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { ManagePlansComponent } from './components/manage-plans/manage-plans.component';
import { AddPlanComponent } from './components/add-plan/add-plan.component';
import { OperatorComponent } from './components/operator/operator.component';
import { OperationTypeComponent } from './components/operation-type/operation-type.component';
import { VesselComponent } from './components/vessel/vessel.component';
import { RobotSystemComponent } from './components/robot-system/robot-system.component';
import { SubOperationalPlanComponent } from './components/sub-operational-plan/sub-operational-plan.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: '', component: ManagePlansComponent, pathMatch: 'full' },
      { path: 'sub-operational-plan', component: SubOperationalPlanComponent },
      { path: 'plan', component: AddPlanComponent },
      { path: 'operator', component: OperatorComponent },
      { path: 'operation-type', component: OperationTypeComponent },
      { path: 'vessel', component: VesselComponent },
      { path: 'robot-system', component: RobotSystemComponent }
    ]
  }
];

@NgModule({
  declarations: [DashboardComponent, ManagePlansComponent, AddPlanComponent, OperatorComponent, OperationTypeComponent, VesselComponent, RobotSystemComponent, SubOperationalPlanComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    TableModule,
    CalendarModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    ToastModule,
    TooltipModule
  ],
  providers: [
    ConfirmationService,
    MessageService
  ]
})
export class OperationalPlanModule { }
