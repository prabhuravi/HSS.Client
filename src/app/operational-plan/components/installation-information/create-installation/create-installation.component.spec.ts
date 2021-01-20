import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInstallationComponent } from './create-installation.component';

describe('CreateInstallationComponent', () => {
  let component: CreateInstallationComponent;
  let fixture: ComponentFixture<CreateInstallationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateInstallationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateInstallationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
