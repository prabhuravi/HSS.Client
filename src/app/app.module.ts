import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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

@NgModule({
  imports: [
    BrowserAnimationsModule,
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
    GoogleChartsModule.forRoot()
  ],
  declarations: [
    AppComponent,
    AppSettingsComponent,
    MainComponent,
    HomeComponent
  ],
  entryComponents: [],
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
    NavigationSubitemsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
