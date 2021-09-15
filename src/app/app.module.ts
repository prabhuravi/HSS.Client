/*
 * KONGSBERG PROPRIETARY. This document and its accompanying elements, contain KONGSBERG information which is proprietary and confidential.
Any disclosure, copying, distribution or use is prohibited if not otherwise explicitly agreed with KONGSBERG in writing.
Any authorized reproduction, in whole or in part, must include this legend. © [year of creation] KONGSBERG – All rights reserved.
 */
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppLocationsService } from '@kognifai/poseidon-ng-applocationsservice';
import { AuthenticationInterceptor } from '@kognifai/poseidon-ng-authenticationinterceptor';
import { AuthenticationService as AuthenticationSvc } from '@kognifai/poseidon-authenticationservice';
import { AuthenticationService } from '@kognifai/poseidon-ng-authenticationservice';
import { ConfigurationService } from '@kognifai/poseidon-ng-configurationservice';
import { CookieService } from '@kognifai/poseidon-cookieservice';
import { DataContextService } from '@kognifai/poseidon-datacontextservice';
import { HeaderModule } from '@kognifai/poseidon-header-component';
import { IConfiguration } from '@kognifai/poseidon-configurationinterface';
import { InitializeService } from '@kognifai/poseidon-ng-initialize-service';
import { MessageModule } from '@kognifai/poseidon-ng-message-component';
import { MessageService } from '@kognifai/poseidon-message-service';
import { NavigationService } from '@kognifai/poseidon-ng-navigationservice';
import { NavigationSidebarModule } from '@kognifai/poseidon-navigationsidebar-component';
import { SettingsService } from '@kognifai/poseidon-ng-settingsservice';
import { SidebarsVisibilityService } from '@kognifai/poseidon-sidebar-visibilityservice';
import { ToolsMenuModule } from '@kognifai/poseidon-toolsmenu';
import { GlobalSettingsModule } from '@kognifai/poseidon-ng-global-settings';
import { LoadingComponentModule } from '@kognifai/poseidon-ng-loading-component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ApplicationsGuardService } from './applications-guard.service';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';
import { AppSettingsComponent } from './app-settings/app-settings.component';
import { NavigationSubitemsService } from '@kognifai/poseidon-ng-navigation-subitems-service';
import { PageNotFoundModule } from '@kognifai/poseidon-ng-page-not-found-component';
import { GoogleChartsModule } from 'angular-google-charts';
export function initConfig(config: ConfigurationService<IConfiguration>) {
  return () => config.load();
}

import { ConfirmationService, MessageService as PrimengMessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {TableModule} from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import {CheckboxModule} from 'primeng/checkbox';
import { CustomHeaderComponent } from './custom-header/custom-header.component';
import { NodeSelectorService, QueryService, QueryExecutionService , HttpClientHelperService } from '@kognifai/galore-ng-client';
import { GaloreDataService } from './services/galore-data.service';
const GALORE_PROVIDER = [
  NodeSelectorService,
  QueryService,
  QueryExecutionService,
  HttpClientHelperService
];

@NgModule({
  imports: [
    BrowserAnimationsModule,
    NoopAnimationsModule,
    BrowserModule,
    FormsModule,
    HeaderModule,
    HttpClientModule,
    MessageModule,
    NavigationSidebarModule,
    ReactiveFormsModule,
    ToolsMenuModule,
    GlobalSettingsModule,
    LoadingComponentModule,
    PageNotFoundModule,
    AppRoutingModule,
    GoogleChartsModule.forRoot(),
    ConfirmDialogModule,
    ToastModule,
    TableModule,
    CheckboxModule
  ],
  declarations: [
    AppComponent,
    AppSettingsComponent,
    MainComponent,
    HomeComponent,
    CustomHeaderComponent
  ],
  entryComponents: [
    CustomHeaderComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      deps: [ConfigurationService],
      multi: true
    },
    AppLocationsService,
    ApplicationsGuardService,
    AuthenticationSvc,
    AuthenticationService,
    ConfigurationService,
    CookieService,
    DataContextService,
    InitializeService,
    MessageService,
    NavigationService,
    SettingsService,
    SidebarsVisibilityService,
    NavigationSubitemsService,
    ConfirmationService,
    PrimengMessageService,
    GaloreDataService,
    ...GALORE_PROVIDER
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
