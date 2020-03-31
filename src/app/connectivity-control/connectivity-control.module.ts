import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FdsTrafficComponent } from './components/fds-traffic/fds-traffic.component';
import { VesselUploadStatusComponent } from './components/vessel-upload-status/vessel-upload-status.component';
import { WhitelistCountriesComponent } from './components/whitelist-countries/whitelist-countries.component';
import { ConnectivityControlComponent } from './components/connectivity-control/connectivity-control.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: '', component: ConnectivityControlComponent, pathMatch: 'full' },
      { path: 'fds-traffic', component: FdsTrafficComponent },
      { path: 'vessel-upload-status', component: VesselUploadStatusComponent },
      { path: 'whitelist-countries', component: WhitelistCountriesComponent }
    ]
  }
];

@NgModule({
  declarations: [DashboardComponent, FdsTrafficComponent, VesselUploadStatusComponent, WhitelistCountriesComponent, ConnectivityControlComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule
  ],
  exports: [RouterModule]
})
export class ConnectivityControlModule { }