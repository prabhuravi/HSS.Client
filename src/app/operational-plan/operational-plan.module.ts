import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { TableModule } from 'primeng/table';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { ManagePlansComponent } from './components/manage-plans/manage-plans.component';
import { AddPlanComponent } from './components/add-plan/add-plan.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: '', component: ManagePlansComponent, pathMatch: 'full' },
      { path: 'plan', component: AddPlanComponent }
    ]
  }
];

@NgModule({
  declarations: [DashboardComponent, ManagePlansComponent, AddPlanComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    TableModule
  ]
})
export class OperationalPlanModule { }
