import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallationContactComponent } from './installation-contact.component';

describe('InstallationContactComponent', () => {
  let component: InstallationContactComponent;
  let fixture: ComponentFixture<InstallationContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstallationContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallationContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
