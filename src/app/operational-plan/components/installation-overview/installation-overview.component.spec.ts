import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallationOverviewComponent } from './installation-overview.component';

describe('InstallationOverviewComponent', () => {
  let component: InstallationOverviewComponent;
  let fixture: ComponentFixture<InstallationOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstallationOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallationOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
