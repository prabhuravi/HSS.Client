/*
 * KONGSBERG PROPRIETARY. This document and its accompanying elements, contain KONGSBERG information which is proprietary and confidential.
Any disclosure, copying, distribution or use is prohibited if not otherwise explicitly agreed with KONGSBERG in writing.
Any authorized reproduction, in whole or in part, must include this legend. © [year of creation] KONGSBERG – All rights reserved.
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplicationsGuardService } from './applications-guard.service';
import { HomeComponent } from './home/home.component';
import { AppSettingsComponent } from './app-settings/app-settings.component';
import { GlobalSettingsComponent } from '@kognifai/poseidon-ng-global-settings';
import { UnauthorizedModule, UnauthorizedComponent } from '@kognifai/poseidon-ng-unauthorized-component';
import { PageNotFoundComponent } from '@kognifai/poseidon-ng-page-not-found-component';

const routes: Routes = [
  { path: 'unauthorized', component: UnauthorizedComponent },
  {
    path: '',
    canActivate: [ApplicationsGuardService],
    children: [
      {
        path: 'connectivity-monitoring',
        loadChildren: () => import('./connectivity-monitoring/connectivity-monitoring.module').then((m) => m.ConnectivityMonitoringModule)
      },
      {
        path: 'vessel-configuration',
        loadChildren: () => import('./connectivity-control/connectivity-control.module').then((m) => m.ConnectivityControlModule)
      },
      {
        path: 'operational-plan',
        loadChildren: () => import('./operational-plan/operational-plan.module').then((m) => m.OperationalPlanModule)
      },
      { path: 'appsettings', component: AppSettingsComponent, pathMatch: 'full' },
      { path: 'globalsettings', component: GlobalSettingsComponent, pathMatch: 'full' },
      { path: '', redirectTo: '/connectivity-monitoring/offshore', pathMatch: 'full' },
      { path: '**', component: PageNotFoundComponent }
    ]
  }
];

@NgModule({
  imports: [UnauthorizedModule, RouterModule.forRoot(routes, { useHash: true, initialNavigation: false, onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
