import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepareInstallationComponent } from './prepare-installation.component';

describe('PrepareInstallationComponent', () => {
  let component: PrepareInstallationComponent;
  let fixture: ComponentFixture<PrepareInstallationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrepareInstallationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrepareInstallationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
