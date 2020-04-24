import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VesselUploadStatusComponent } from './vessel-upload-status.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ConnectivityControlService } from '../../../services/connectivity-control.service';
import { OperationalPlanService } from 'src/app/services/operational-plan.service';
import { MockConnectivityControlService } from '../../../services/mock.connectivity-control.service';
import { MockOperationalPlanService } from '../../../services/mock.operational-plan.service';
import { FormBuilder } from '@angular/forms';
import { MockFormBuilder } from '../../../services/mock.form.builder';

describe('VesselUploadStatusComponent', () => {
  let component: VesselUploadStatusComponent;
  let fixture: ComponentFixture<VesselUploadStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VesselUploadStatusComponent ],
      providers: [
        { provide: ConnectivityControlService, useClass: MockConnectivityControlService },
        { provide: OperationalPlanService, useClass: MockOperationalPlanService },
        { provide: FormBuilder, useClass: MockFormBuilder }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VesselUploadStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
