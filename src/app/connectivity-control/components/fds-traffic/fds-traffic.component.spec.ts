import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FdsTrafficComponent } from './fds-traffic.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ConnectivityControlService } from '../../../services/connectivity-control.service';
import { OperationalPlanService } from 'src/app/services/operational-plan.service';
import { MockConnectivityControlService } from '../../../services/mock.connectivity-control.service';
import { MockOperationalPlanService } from '../../../services/mock.operational-plan.service';
import { FormBuilder } from '@angular/forms';
import { MockFormBuilder } from '../../../services/mock.form.builder';
import { of } from 'rxjs';

describe('FdsTrafficComponent', () => {
  let component: FdsTrafficComponent;
  let fixture: ComponentFixture<FdsTrafficComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FdsTrafficComponent],
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
    fixture = TestBed.createComponent(FdsTrafficComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit()', () => {

    it('should call loadVessels method', () => {
      spyOn(component, 'loadVessels');
      component.ngOnInit();
      expect(component.loadVessels).toHaveBeenCalled();
    });

  });

  describe('loadVessels()', () => {

    it('should call getVesselList from operationalPlanService', () => {
      spyOn(component.operationalPlanService, 'getVesselList').and.returnValue(of([]));
      spyOn(component, 'onSubmit');
      spyOn(component, 'buildForm');
      component.loadVessels();
      expect(component.operationalPlanService.getVesselList).toHaveBeenCalled();
      expect(component.onSubmit).toHaveBeenCalled();
      expect(component.buildForm).toHaveBeenCalled();
    });

  });

  describe('onSubmit()', () => {

    it('should not call getVesselHistoricalStatus from connectivityControlService if form is not valid', () => {
      component.form = {
        valid: false
      } as any;
      spyOn(component.connectivityControlService, 'getVesselHistoricalStatus').and.returnValue({});
      component.onSubmit();
      expect(component.connectivityControlService.getVesselHistoricalStatus).not.toHaveBeenCalled();
    });

    it('should call getVesselHistoricalStatus from connectivityControlService if form is valid', () => {
      component.form = {
        valid: true,
        value: {
          VesselIds: []
        }
      } as any;
      spyOn(component.connectivityControlService, 'getVesselHistoricalStatus').and.returnValue(of({}));
      component.onSubmit();
      expect(component.connectivityControlService.getVesselHistoricalStatus).toHaveBeenCalledWith(component.form.value);
    });

  });

});
