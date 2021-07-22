import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import {FileUploadModule} from 'primeng/fileupload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { TreeModule } from 'primeng/tree';
import { SharedModule } from '../shared/shared.module';
import { ContactListingComponent } from './components/contact/contact-listing/contact-listing.component';
import { ContactSearchComponent } from './components/contact/contact-search/contact-search.component';
import { ContactComponent } from './components/contact/contact.component';
import { CreateContactComponent } from './components/contact/create-contact/create-contact.component';
import { CreateDocumentsComponent } from './components/create-documents/create-documents.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FoulingStateComponent } from './components/fouling-state/fouling-state.component';
import { ListFoulingStateComponent } from './components/fouling-state/list-fouling-state/list-fouling-state.component';
import {
  CreateInstallationComponent,
} from './components/installation-information/create-installation/create-installation.component';
import { InstallationOverviewComponent } from './components/installation-overview/installation-overview.component';
import {
  HullskaterRegularityKpiComponent,
} from './components/kpi/hullskater-regularity-kpi/hullskater-regularity-kpi.component';
import {
  InstallationContactComponent,
} from './components/operations-overview/installation-contact/installation-contact.component';
import {
  InstallationDocumentComponent,
} from './components/operations-overview/installation-document/installation-document.component';
import {
  CreateOperationComponent,
} from './components/operations-overview/installation-operations/create-operation/create-operation.component';
import {
  InstallationOperationsComponent,
} from './components/operations-overview/installation-operations/installation-operations.component';
import {
  ListOperationsComponent,
} from './components/operations-overview/installation-operations/list-operations/list-operations.component';
import {
  OperationDocumentTemplatesComponent,
} from './components/operations-overview/installation-operations/operation-document-templates/operation-document-templates.component';
import {
  OperationDocumentComponent,
} from './components/operations-overview/installation-operations/operation-document/operation-document.component';
import {
  OperationMissionsComponent,
} from './components/operations-overview/installation-operations/operation-missions/operation-missions.component';
import {
  OperatorLogComponent,
} from './components/operations-overview/installation-operations/operator-log/operator-log.component';
import {
  OpertionFoulingComponent,
} from './components/operations-overview/installation-operations/opertion-fouling/opertion-fouling.component';
import {
  OpertionSectionComponent,
} from './components/operations-overview/installation-operations/opertion-section/opertion-section.component';
import {
  PortMeteorologyComponent,
} from './components/operations-overview/installation-operations/port-meteorology/port-meteorology.component';
import {
  SecondryOperationListingComponent,
} from './components/operations-overview/installation-operations/secondry-operation-listing/secondry-operation-listing.component';
import {
  InstallationTradeRouteComponent,
} from './components/operations-overview/installation-trade-route/installation-trade-route.component';
import { OperationsOverviewComponent } from './components/operations-overview/operations-overview.component';
import { PrepareInstallationComponent } from './components/prepare-installation/prepare-installation.component';
import { ListingSectionComponent } from './components/sections/listing-section/listing-section.component';
import { ManageSectionComponent } from './components/sections/manage-section/manage-section.component';
import { SectionsComponent } from './components/sections/sections.component';
import { TradeRouteComponent } from './components/trade-route/trade-route.component';

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
        path: 'operations', component: CreateOperationComponent, children: [
          { path: ':vesselId', component: CreateOperationComponent, pathMatch: 'full' },
          { path: 'sections/:vesselId', component: ListingSectionComponent },
          { path: 'fouling-state/:vesselId', component: ListFoulingStateComponent }
        ]
      },
      {
        path: 'operations-overview/:vesselId', component: OperationsOverviewComponent, children: [
          { path: '', component: InstallationOperationsComponent, pathMatch: 'full' },
          {
            path: 'installation-operations/:vesselId', component: InstallationOperationsComponent
          },
          { path: 'installation-document/:vesselId', component: InstallationDocumentComponent },
          { path: 'installation-contact/:vesselId', component: InstallationContactComponent },
          { path: 'installation-trade-route/:vesselId', component: InstallationTradeRouteComponent }
        ]
      },
    ]
  }
];

@NgModule({
  declarations: [DashboardComponent,
    InstallationOverviewComponent,
    PrepareInstallationComponent,
    TradeRouteComponent,
    SectionsComponent,
    FoulingStateComponent,
    CreateDocumentsComponent,
    CreateInstallationComponent,
    ListingSectionComponent,
    ContactComponent,
    CreateContactComponent,
    ContactListingComponent,
    ListFoulingStateComponent,
    OperationsOverviewComponent,
    InstallationOperationsComponent,
    CreateOperationComponent,
    ListOperationsComponent,
    SecondryOperationListingComponent,
    OperatorLogComponent,
    ManageSectionComponent,
    ContactSearchComponent,
    OpertionSectionComponent,
    OpertionFoulingComponent,
    PortMeteorologyComponent,
    InstallationDocumentComponent,
    OperationDocumentComponent,
    OperationMissionsComponent,
    InstallationContactComponent,
    InstallationTradeRouteComponent,
    HullskaterRegularityKpiComponent,
    OperationDocumentTemplatesComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    TableModule,
    TreeModule,
    DialogModule,
    OverlayPanelModule,
    ToastModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    CheckboxModule,
    FileUploadModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule,
    AutoCompleteModule,
    OverlayPanelModule,
    ToastModule,
    TabViewModule
  ],
  providers: [DatePipe]
})
export class OperationalPlanModule { }
