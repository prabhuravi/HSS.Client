import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VesselHistoryComponent } from './vessel-history.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ConnectivityMonitoringService } from 'src/app/services/connectivity-monitoring.service';
import { MockConnectivityMonitoringService } from '../../../services/mock.connectivity-monitoring.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MockActivatedRoute, MockRouter } from '../../../services/mock.router.service';
import { ThemeService } from '@kognifai/poseidon-ng-theming';
import { MockThemeService } from '../../../services/mock.theme.service';
import { of } from 'rxjs';

describe('VesselHistoryComponent', () => {
  let component: VesselHistoryComponent;
  let fixture: ComponentFixture<VesselHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VesselHistoryComponent],
      providers: [
        { provide: ConnectivityMonitoringService, useClass: MockConnectivityMonitoringService },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: Router, useClass: MockRouter },
        { provide: ThemeService, useClass: MockThemeService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VesselHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  // describe('getVesselDetails()', () => {

  //   it('should call getVesselSubject from connectivityMonitoringService', () => {
  //     spyOn(component, 'resetDate');
  //     spyOn(component.connectivityMonitoringService, 'getVesselLinksByNodeNumber');
  //     spyOn(component.connectivityMonitoringService, 'getVesselSubject').and.returnValue(of([]));
  //     spyOn(component.connectivityMonitoringService, 'getSnMPData').and.returnValue(of([]));
  //     spyOn(component.connectivityMonitoringService, 'setNodeChangeSubject');
  //     component.getVesselDetails(1);
  //     expect(component.connectivityMonitoringService.getVesselLinksByNodeNumber).toHaveBeenCalledWith(1);
  //     expect(component.connectivityMonitoringService.getVesselSubject).toHaveBeenCalled();
  //     expect(component.connectivityMonitoringService.getSnMPData).toHaveBeenCalledWith(1);
  //     expect(component.connectivityMonitoringService.setNodeChangeSubject).toHaveBeenCalledWith(1);
  //     expect(component.resetDate).toHaveBeenCalled();
  //   });

  // });

  // describe('resetDate()', () => {

  //   it('should ', () => {
  //     spyOn(component, 'getLatencyTrendData');
  //     component.resetDate();
  //     expect(component.getLatencyTrendData).toHaveBeenCalled();
  //   });

  // });

  // describe('filterData()', () => {

  //   it('should ', () => {
  //     component.selectedVesselNodeNumber = '1';
  //     spyOn(component, 'getLatencyTrendData');
  //     spyOn(component.connectivityMonitoringService, 'setNodeChangeSubject');
  //     component.filterData();
  //     expect(component.getLatencyTrendData).toHaveBeenCalled();
  //     expect(component.connectivityMonitoringService.setNodeChangeSubject).toHaveBeenCalledWith(1);
  //   });

  // });

  // describe('onDropDownSelection()', () => {

  //   it('should ', () => {
  //     spyOn(component, 'getLatencyTrendData');
  //     component.onDropDownSelection();
  //     expect(component.getLatencyTrendData).toHaveBeenCalled();
  //   });

  // });

});
