/*
 * KONGSBERG PROPRIETARY. This document and its accompanying elements, contain KONGSBERG information which is proprietary and confidential.
Any disclosure, copying, distribution or use is prohibited if not otherwise explicitly agreed with KONGSBERG in writing.
Any authorized reproduction, in whole or in part, must include this legend. © [year of creation] KONGSBERG – All rights reserved.
 */
import { By } from '@angular/platform-browser';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';

import { AppLocationsService } from '@kognifai/poseidon-ng-applocationsservice';
import { AuthenticationService as AuthenticationSvc } from '@kognifai/poseidon-authenticationservice';
import { AuthenticationService } from '@kognifai/poseidon-ng-authenticationservice';
import { ConfigurationService } from '@kognifai/poseidon-ng-configurationservice';
import { CookieService } from '@kognifai/poseidon-cookieservice';
import { IConfiguration } from '@kognifai/poseidon-configurationinterface';
import { InitializeService } from '@kognifai/poseidon-ng-initialize-service';
import { MessageService } from '@kognifai/poseidon-message-service';
import { NavigationService } from '@kognifai/poseidon-ng-navigationservice';
import { NavigationSubitemsService } from '@kognifai/poseidon-ng-navigation-subitems-service';
import { SidebarsVisibilityService } from '@kognifai/poseidon-sidebar-visibilityservice';
import { ToolsMenuService } from '@kognifai/poseidon-ng-toolsmenuservice';
import { SettingsMenuService } from '@kognifai/poseidon-ng-settings-menu';

import { AppComponent } from './app.component';
import { EntitlementsQueryService } from '@kognifai/poseidon-entitlements-query-service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let de: DebugElement;

  let navigationServiceStub: NavigationService;
  let authenticationSvcStub: AuthenticationSvc;
  let authenticationServiceStub: AuthenticationService;
  let cookieServiceStub: CookieService;
  let messageServiceStub: MessageService;
  let configurationServiceStub: ConfigurationService<IConfiguration>;
  let appLocationsServiceStub: AppLocationsService;
  let initializeServiceStub: InitializeService;
  let toolsMenuServiceStub: ToolsMenuService;
  let sidebarsVisibilityServiceStub: SidebarsVisibilityService;
  let settingsMenuServiceStub: SettingsMenuService;
  //let navigationSubitemsServiceStub: NavigationSubitemsService;
  let entitlementsQueryServiceStub: EntitlementsQueryService;

  beforeEach(async(() => {
    navigationServiceStub = new NavigationService(null, null);
    // navigationSubitemsServiceStub = new NavigationSubitemsService(null, null, null, null);
    authenticationSvcStub = new AuthenticationSvc();
    authenticationServiceStub = new AuthenticationService(null);
    cookieServiceStub = new CookieService();
    messageServiceStub = new MessageService();
    configurationServiceStub = new ConfigurationService(null);
    (<any>configurationServiceStub).configuration = {};
    configurationServiceStub.load = () => Promise.resolve();
    appLocationsServiceStub = <AppLocationsService> { get: null };
    entitlementsQueryServiceStub = new EntitlementsQueryService(null, '');
    spyOn(appLocationsServiceStub, 'get').and.callFake(() => Promise.resolve());
    initializeServiceStub = new InitializeService(
      authenticationServiceStub, configurationServiceStub, null, appLocationsServiceStub, settingsMenuServiceStub);
    initializeServiceStub.initialize = () => new Observable<void>((observer) => observer.complete());
    toolsMenuServiceStub = {
      items: [],
      register: (items) => { },
      clear: () => { }
    };
    sidebarsVisibilityServiceStub = new SidebarsVisibilityService();
    settingsMenuServiceStub = new SettingsMenuService(entitlementsQueryServiceStub as any);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, FormsModule],
      declarations: [AppComponent],
      providers: [
        { provide: MessageService, useValue: messageServiceStub },
        { provide: NavigationService, useValue: navigationServiceStub },
        { provide: AuthenticationSvc, useValue: authenticationSvcStub },
        { provide: AuthenticationService, useValue: authenticationServiceStub },
        { provide: InitializeService, useValue: initializeServiceStub },
        { provide: ConfigurationService, useValue: configurationServiceStub },
        { provide: ToolsMenuService, useValue: toolsMenuServiceStub },
        { provide: SidebarsVisibilityService, useValue: sidebarsVisibilityServiceStub },
        { provide: SettingsMenuService, useValue: settingsMenuServiceStub }
       // { provide: NavigationSubitemsService, useValue: navigationSubitemsServiceStub }

      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  // it('should create the app', () => {
  //   expect(component).toBeTruthy();
  // });

  // it('should create tools menu', () => {
  //   const toolsMenuElement = de.query(By.css('app-tools-menu'));
  //   expect(toolsMenuElement).toBeTruthy();
  // });

  // it('tools menu should be hidden initially', () => {
  //   const toolsMenuElement = de.query(By.css('app-tools-menu'));
  //   expect(toolsMenuElement.attributes.class).toContain('kx-is-hidden');
  // });
});
