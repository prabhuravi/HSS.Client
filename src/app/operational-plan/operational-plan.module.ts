import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { TableModule } from 'primeng/table';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { ManagePlansComponent } from './components/manage-plans/manage-plans.component';
import { AddPlanComponent } from './components/add-plan/add-plan.component';
import { OperatorComponent } from './components/operator/operator.component';
import { OperationTypeComponent } from './components/operation-type/operation-type.component';
import { VesselComponent } from './components/vessel/vessel.component';
import { RobotSystemComponent } from './components/robot-system/robot-system.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: '', component: ManagePlansComponent, pathMatch: 'full' },
      { path: 'plan', component: AddPlanComponent },
      { path: 'operator', component: OperatorComponent },
      { path: 'operation-type', component: OperationTypeComponent },
      { path: 'vessel', component: VesselComponent },
      { path: 'robot-system', component: RobotSystemComponent }
    ]
  }
];

@NgModule({
  declarations: [DashboardComponent, ManagePlansComponent, AddPlanComponent, OperatorComponent, OperationTypeComponent, VesselComponent, RobotSystemComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    TableModule
  ]
})
export class OperationalPlanModule { }
