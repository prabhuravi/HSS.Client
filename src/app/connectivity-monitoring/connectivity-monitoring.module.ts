import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ConnectivityMonitoringComponent } from './components/connectivity-monitoring/connectivity-monitoring.component';
import { Routes, RouterModule } from '@angular/router';
import { VesselHistoryComponent } from './components/vessel-history/vessel-history.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: '', component: ConnectivityMonitoringComponent, pathMatch: 'full' },
      { path: 'cacti', component: VesselHistoryComponent }
    ]
  }
];

@NgModule({
  declarations: [DashboardComponent, ConnectivityMonitoringComponent, VesselHistoryComponent],
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
