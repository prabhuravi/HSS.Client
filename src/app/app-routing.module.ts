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
      { path: 'appsettings', component: AppSettingsComponent, pathMatch: 'full' },
      { path: 'globalsettings', component: GlobalSettingsComponent, pathMatch: 'full' },
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: '**', component: PageNotFoundComponent }
    ]
  }
];

@NgModule({
  imports: [UnauthorizedModule, RouterModule.forRoot(routes, { useHash: true, initialNavigation: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
