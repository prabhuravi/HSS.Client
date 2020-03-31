import { EventEmitter } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { NavigationService, INavigationService, NavigationItem, INavigationItem } from '@kognifai/poseidon-ng-navigationservice';
import { ToolsMenuService } from '@kognifai/poseidon-ng-toolsmenuservice';
import { SidebarsVisibilityService } from '@kognifai/poseidon-sidebar-visibilityservice';
import { MessageModule } from '@kognifai/poseidon-ng-message-component';
import { MessageService } from '@kognifai/poseidon-message-service';

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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MessageModule],
      declarations: [MainComponent],
      providers: [
        { provide: NavigationService, useValue: navigationServiceStub },
        { provide: ToolsMenuService, useValue: toolsMenuServiceStub },
        { provide: SidebarsVisibilityService, useValue: sidebarsVisibilityServiceStub },
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
