import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallationInformationComponent } from './installation-information.component';

describe('InstallationInformationComponent', () => {
  let component: InstallationInformationComponent;
  let fixture: ComponentFixture<InstallationInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstallationInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallationInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
