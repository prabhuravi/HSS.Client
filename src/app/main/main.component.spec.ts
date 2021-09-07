/*
 * KONGSBERG PROPRIETARY. This document and its accompanying elements, contain KONGSBERG information which is proprietary and confidential.
Any disclosure, copying, distribution or use is prohibited if not otherwise explicitly agreed with KONGSBERG in writing.
Any authorized reproduction, in whole or in part, must include this legend. © [year of creation] KONGSBERG – All rights reserved.
 */
import { EventEmitter } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { NavigationService, INavigationService, NavigationItem, INavigationItem } from '@kognifai/poseidon-ng-navigationservice';
import { ToolsMenuService } from '@kognifai/poseidon-ng-toolsmenuservice';
import { SidebarsVisibilityService } from '@kognifai/poseidon-sidebar-visibilityservice';
import { MessageModule } from '@kognifai/poseidon-ng-message-component';
import { MessageService } from '@kognifai/poseidon-message-service';
import { ConfirmationService, MessageService as PrimengMessageService } from 'primeng/api';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

import { MainComponent } from './main.component';

describe('BodyComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  const navigationServiceStub: INavigationService = {
    navigationItems: [],
    findById: (id: string) => new NavigationItem('' , '' , '' , ''),
    register: (item: INavigationItem, parentId?: string) => {},
    unregister: (id: string) => new NavigationItem('', '', '', ''),
    notify: () => {},
    search: (query: string) => [],
    getActive: () => new NavigationItem('', '', '', ''),
    navigate: (item: INavigationItem) => {},
    getNavigationItems : () => [],
    setActive: (item: INavigationItem) => {},
    setActiveByPath: (path: string) => new NavigationItem('', '', '', ''),
    activeItem: new BehaviorSubject<INavigationItem>(null)
};

  const toolsMenuServiceStub: ToolsMenuService = {
    items: [],
    register: (items) => { },
    clear: () => { }
  };

  const sidebarsVisibilityServiceStub: SidebarsVisibilityService = new SidebarsVisibilityService();
  const confirmationServiceStub: ConfirmationService = new ConfirmationService();
  const primengMessageServiceStub: PrimengMessageService = new PrimengMessageService();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MessageModule, ConfirmDialogModule, ToastModule],
      declarations: [MainComponent],
      providers: [
        { provide: NavigationService, useValue: navigationServiceStub },
        { provide: ToolsMenuService, useValue: toolsMenuServiceStub },
        { provide: SidebarsVisibilityService, useValue: sidebarsVisibilityServiceStub },
        { provide: ConfirmationService, useValue: confirmationServiceStub },
        { provide: PrimengMessageService, useValue: primengMessageServiceStub },
        MessageService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
