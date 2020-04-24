import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationTabComponent } from './navigation-tab.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('NavigationTabComponent', () => {
  let component: NavigationTabComponent;
  let fixture: ComponentFixture<NavigationTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigationTabComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
