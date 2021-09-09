import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VesselUploadStatusComponent } from './vessel-upload-status.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ConnectivityControlService } from '../../../services/connectivity-control.service';
import { OperationalPlanService } from 'src/app/services/operational-plan.service';
import { MockConnectivityControlService } from '../../../services/mock.connectivity-control.service';
import { MockOperationalPlanService } from '../../../services/mock.operational-plan.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MockFormBuilder } from '../../../services/mock.form.builder';
import { of } from 'rxjs';

describe('VesselUploadStatusComponent', () => {
  let component: VesselUploadStatusComponent;
  let fixture: ComponentFixture<VesselUploadStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VesselUploadStatusComponent],
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

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  // describe('ngOnInit()', () => {

  //   it('should call loadVessels method', () => {
  //     spyOn(component, 'loadVessels');
  //     component.ngOnInit();
  //     expect(component.loadVessels).toHaveBeenCalled();
  //   });

  // });

  describe('loadVessels()', () => {

  //   it('should call getVesselList from operationalPlanService', () => {
  //     spyOn(component.operationalPlanService, 'getVesselList').and.returnValue(of([]));
  //     spyOn(component, 'buildForm');
  //     component.loadVessels();
  //     expect(component.operationalPlanService.getVesselList).toHaveBeenCalled();
  //     expect(component.buildForm).toHaveBeenCalled();
  //   });

  // });

  // describe('onSubmit()', () => {

  //   it('should not call getVesselUploadStatus from connectivityControlService if form is not valid', () => {
  //     component.form = {
  //       valid: false
  //     } as any;
  //     spyOn(component.connectivityControlService, 'getVesselUploadStatus').and.returnValue({});
  //     component.onSubmit();
  //     expect(component.connectivityControlService.getVesselUploadStatus).not.toHaveBeenCalled();
  //   });

    // it('should call getVesselUploadStatus from connectivityControlService if form is valid', () => {
    //   component.form = {
    //     valid: true,
    //     value: {
    //       VesselId: {
    //         Id: 1
    //       },
    //       FromMission: {
    //         name: '',
    //         value: ''
    //       },
    //       ToMission: {
    //         name: '',
    //         value: ''
    //       },
    //       FromDate: new Date(),
    //       ToDate: new Date()
    //     }
    //   } as any;
    //   const formData = {
    //     VesselId: component.form.value.VesselId.Id,
    //     FromMission: component.form.value.FromMission.value,
    //     ToMission: component.form.value.ToMission.value,
    //     FromDate: component.form.value.FromDate,
    //     ToDate: component.form.value.ToDate
    //   };
    //   spyOn(component.connectivityControlService, 'getVesselUploadStatus').and.returnValue(of({}));
    //   component.onSubmit();
    //   expect(component.connectivityControlService.getVesselUploadStatus).toHaveBeenCalledWith(formData);
    // });

    // describe('getMissionList()', () => {

    //   it('should call getMissionList from connectivityControlService', () => {
    //     const formData = {};
    //     spyOn(component.connectivityControlService, 'getMissionList').and.returnValue(of([]));
    //     component.getMissionList();
    //     expect(component.connectivityControlService.getMissionList).toHaveBeenCalledWith(formData);
    //   });

    // });

    // describe('filterToMissionList()', () => {

    //   it('expected toMissionList to be empty array ', () => {
    //     component.toMissionList = [];
    //     component.filterToMissionList();
    //     expect(component.toMissionList).toEqual([]);
    //   });

    // });

    // describe('filterFromMissionList()', () => {

    //   it('expected fromMissionList to be empty array ', () => {
    //     component.fromMissionList = [];
    //     component.filterFromMissionList();
    //     expect(component.fromMissionList).toEqual([]);
    //   });

    // });

  });

});
