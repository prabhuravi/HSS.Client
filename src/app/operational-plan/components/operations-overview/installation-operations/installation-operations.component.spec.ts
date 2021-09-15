import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallationOperationsComponent } from './installation-operations.component';

describe('InstallationOperationsComponent', () => {
  let component: InstallationOperationsComponent;
  let fixture: ComponentFixture<InstallationOperationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstallationOperationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallationOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
