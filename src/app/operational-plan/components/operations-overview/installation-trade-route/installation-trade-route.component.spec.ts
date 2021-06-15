import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallationTradeRouteComponent } from './installation-trade-route.component';

describe('InstallationTradeRouteComponent', () => {
  let component: InstallationTradeRouteComponent;
  let fixture: ComponentFixture<InstallationTradeRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstallationTradeRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallationTradeRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
