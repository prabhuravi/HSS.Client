import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { InstallationOverviewComponent } from './components/installation-overview/installation-overview.component';
import { PrepareInstallationComponent } from './components/prepare-installation/prepare-installation.component';
import { InstallationInformationComponent } from './components/installation-information/installation-information.component';
import { TradeRouteComponent } from './components/trade-route/trade-route.component';
import { SectionsComponent } from './components/sections/sections.component';
import { CreateDocumentsComponent } from './components/create-documents/create-documents.component';
import { CreateContactsComponent } from './components/create-contacts/create-contacts.component';
import { FoulingStateComponent } from './components/fouling-state/fouling-state.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: '', component: InstallationOverviewComponent, pathMatch: 'full' },
      {
        path: 'prepare-installation', component: PrepareInstallationComponent, children: [
          { path: '', component: InstallationInformationComponent, pathMatch: 'full' },
          { path: 'trade-route', component: TradeRouteComponent },
          { path: 'sections', component: SectionsComponent },
          { path: 'fouling-state', component: FoulingStateComponent },
          { path: 'create-documents', component: CreateDocumentsComponent },
          { path: 'create-contacts', component: CreateContactsComponent }
        ]
      },
      { path: 'ManagePlans', component: ManagePlansComponent },
      { path: 'sub-operational-plan/:planid', component: SubOperationalPlanComponent },
      { path: 'plan/:type/:id', component: AddPlanComponent },
      { path: 'operator', component: OperatorComponent },
      { path: 'operation-type', component: OperationTypeComponent },
      { path: 'vessel', component: VesselComponent },
      { path: 'robot-system', component: RobotSystemComponent }
    ]
  }
];

@NgModule({
  declarations: [DashboardComponent,
    ManagePlansComponent,
    AddPlanComponent,
    OperatorComponent,
    OperationTypeComponent,
    VesselComponent,
    RobotSystemComponent,
    SubOperationalPlanComponent,
    InstallationOverviewComponent,
    PrepareInstallationComponent,
    InstallationInformationComponent,
    TradeRouteComponent,
    SectionsComponent,
    FoulingStateComponent,
    CreateDocumentsComponent,
    CreateContactsComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    TableModule,
    CalendarModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule
  ],
  providers: []
})
export class OperationalPlanModule { }
