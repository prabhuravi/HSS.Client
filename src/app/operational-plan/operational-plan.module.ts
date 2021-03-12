import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { TableModule } from 'primeng/table';
import { TreeModule } from 'primeng/tree';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';
import { AutoCompleteModule } from 'primeng/autocomplete';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { Routes, RouterModule } from '@angular/router';
// import { ManagePlansComponent } from './components/manage-plans/manage-plans.component';
// import { AddPlanComponent } from './components/add-plan/add-plan.component';
import { OperatorComponent } from './components/operator/operator.component';
import { OperationTypeComponent } from './components/operation-type/operation-type.component';
import { VesselComponent } from './components/vessel/vessel.component';
import { RobotSystemComponent } from './components/robot-system/robot-system.component';
// import { SubOperationalPlanComponent } from './components/sub-operational-plan/sub-operational-plan.component';
import { InstallationOverviewComponent } from './components/installation-overview/installation-overview.component';
import { PrepareInstallationComponent } from './components/prepare-installation/prepare-installation.component';
import { TradeRouteComponent } from './components/trade-route/trade-route.component';
import { SectionsComponent } from './components/sections/sections.component';
import { CreateDocumentsComponent } from './components/create-documents/create-documents.component';
import { FoulingStateComponent } from './components/fouling-state/fouling-state.component';
import { CreateInstallationComponent } from './components/installation-information/create-installation/create-installation.component';
import { CreateSectionComponent } from './components/sections/create-section/create-section.component';
import { CreateSubSectionComponent } from './components/sections/create-sub-section/create-sub-section.component';
import { ListingSectionComponent } from './components/sections/listing-section/listing-section.component';
import { ContactComponent } from './components/contact/contact.component';
import { CreateContactComponent } from './components/contact/create-contact/create-contact.component';
import { ContactListingComponent } from './components/contact/contact-listing/contact-listing.component';
import { UpdateFoulingStateComponent } from './components/fouling-state/update-fouling-state/update-fouling-state.component';
import { ListFoulingStateComponent } from './components/fouling-state/list-fouling-state/list-fouling-state.component';
import { OperationsOverviewComponent } from './components/operations-overview/operations-overview.component';
import { InstallationOperationsComponent } from './components/operations-overview/installation-operations/installation-operations.component';
import { CreateOperationComponent } from './components/operations-overview/installation-operations/create-operation/create-operation.component';
import { ListOperationsComponent } from './components/operations-overview/installation-operations/list-operations/list-operations.component';


const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: '', component: InstallationOverviewComponent, pathMatch: 'full' },
      {
        path: 'prepare-installation', component: PrepareInstallationComponent, children: [
          { path: '', component: CreateInstallationComponent, pathMatch: 'full' },
          { path: 'create-installation/:vesselId', component: CreateInstallationComponent },
          { path: 'trade-route/:vesselId', component: TradeRouteComponent },
          { path: 'sections/:vesselId', component: SectionsComponent },
          { path: 'fouling-state/:vesselId', component: FoulingStateComponent },
          { path: 'create-documents/:vesselId', component: CreateDocumentsComponent },
          { path: 'contacts/:vesselId', component: ContactComponent }
        ]
      },

      {
        path: 'operations-overview/:vesselId', component: OperationsOverviewComponent, children: [
          { path: '', component: InstallationOperationsComponent, pathMatch: 'full' },
          {
            path: 'installation-operations/:vesselId', component: InstallationOperationsComponent
            // , children: [
            //   { path: '', component: ListOperationsComponent, pathMatch: 'full' },
            //   { path: 'list-operations/:vesselId', component: ListOperationsComponent },
            //   { path: 'create-operation/:vesselId', component: CreateOperationComponent }
            // ]
          }
        ]
      },

      // { path: 'ManagePlans', component: ManagePlansComponent },
      // { path: 'sub-operational-plan/:planid', component: SubOperationalPlanComponent },
      // { path: 'plan/:type/:id', component: AddPlanComponent },
      { path: 'operator', component: OperatorComponent },
      { path: 'operation-type', component: OperationTypeComponent },
      { path: 'vessel', component: VesselComponent },
      { path: 'robot-system', component: RobotSystemComponent }
    ]
  }
];

@NgModule({
  declarations: [DashboardComponent,
    // ManagePlansComponent,
    // AddPlanComponent,
    OperatorComponent,
    OperationTypeComponent,
    VesselComponent,
    RobotSystemComponent,
    // SubOperationalPlanComponent,
    InstallationOverviewComponent,
    PrepareInstallationComponent,
    TradeRouteComponent,
    SectionsComponent,
    FoulingStateComponent,
    CreateDocumentsComponent,
    CreateInstallationComponent,
    CreateSectionComponent,
    CreateSubSectionComponent,
    ListingSectionComponent,
    ContactComponent,
    CreateContactComponent,
    ContactListingComponent,
    UpdateFoulingStateComponent,
    ListFoulingStateComponent,
    OperationsOverviewComponent,
    InstallationOperationsComponent,
    CreateOperationComponent,
    ListOperationsComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    TableModule,
    TreeModule,
    DialogModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    CheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule,
    AutoCompleteModule
  ],
  providers: [DatePipe]
})
export class OperationalPlanModule { }
