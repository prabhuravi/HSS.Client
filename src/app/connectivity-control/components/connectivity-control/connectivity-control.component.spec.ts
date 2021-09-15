/*
 * KONGSBERG PROPRIETARY. This document and its accompanying elements, contain KONGSBERG information which is proprietary and confidential.
Any disclosure, copying, distribution or use is prohibited if not otherwise explicitly agreed with KONGSBERG in writing.
Any authorized reproduction, in whole or in part, must include this legend. © [year of creation] KONGSBERG – All rights reserved.
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectivityControlComponent } from './connectivity-control.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ConnectivityControlService } from '../../../services/connectivity-control.service';
import { MockConnectivityControlService } from '../../../services/mock.connectivity-control.service';
import { of } from 'rxjs';

describe('ConnectivityControlComponent', () => {
  let component: ConnectivityControlComponent;
  let fixture: ComponentFixture<ConnectivityControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConnectivityControlComponent],
      providers: [
        { provide: ConnectivityControlService, useClass: MockConnectivityControlService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectivityControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  describe('ngOnInit()', () => {

    it('should call loadData method', () => {
      spyOn(component, 'loadData');
      component.ngOnInit();
      expect(component.loadData).toHaveBeenCalled();
    });

  });

  describe('loadData()', () => {

    it('should call getConnectivityData from connectivityControlService', () => {
      spyOn(component.connectivityControlService, 'getConnectivityData').and.returnValue(of([]));
      component.loadData();
      expect(component.connectivityControlService.getConnectivityData).toHaveBeenCalled();
    });

  });

  describe('loadVesselActivityLog()', () => {

    it('should call getConnectivityActionLog from connectivityControlService with vesselid as params', () => {
      const vesselData = {
        Id: 1
      };
      component.activeVessel = vesselData;
      spyOn(component.connectivityControlService, 'getConnectivityActionLog').and.returnValue(of([]));
      component.loadVesselActivityLog({});
      expect(component.connectivityControlService.getConnectivityActionLog).toHaveBeenCalledWith(component.activeVessel.Id);
    });

  });

  // describe('updateUploadStatus()', () => {

  //   it('should call UpdateVessel from connectivityControlService with vesseldata as params', () => {
  //     const vesselData = {
  //       Id: 1
  //     };
  //     spyOn(component.connectivityControlService, 'UpdateVessel').and.returnValue(of([]));
  //     component.updateUploadStatus(vesselData as any);
  //     expect(component.connectivityControlService.UpdateVessel).toHaveBeenCalledWith(vesselData as any);
  //   });

  // });

  describe('toggleActivityLogModal()', () => {

    it('should toggle display modal boolean value', () => {
      component.displayActionLogModal = !component.displayActionLogModal;
      component.toggleActivityLogModal();
      expect(component.displayActionLogModal).toBeFalsy();
    });

  });

});
