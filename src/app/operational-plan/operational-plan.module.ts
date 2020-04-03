import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { ManagePlansComponent } from './components/manage-plans/manage-plans.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: '', component: ManagePlansComponent, pathMatch: 'full' }
    ]
  }
];

@NgModule({
  declarations: [DashboardComponent, ManagePlansComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule
  ]
})
export class OperationalPlanModule { }
