import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ConnectivityMonitoringComponent } from './components/connectivity-monitoring/connectivity-monitoring.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: '', component: ConnectivityMonitoringComponent, pathMatch: 'full' }
    ]
  }
];

@NgModule({
  declarations: [DashboardComponent, ConnectivityMonitoringComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    TableModule,
    FormsModule,
    CalendarModule
  ],
  exports: [RouterModule]
})
export class ConnectivityMonitoringModule { }
