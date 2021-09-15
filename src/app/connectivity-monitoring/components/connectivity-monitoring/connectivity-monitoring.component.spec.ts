import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectivityMonitoringComponent } from './connectivity-monitoring.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ConnectivityMonitoringService } from 'src/app/services/connectivity-monitoring.service';
import { MockConnectivityMonitoringService } from '../../../services/mock.connectivity-monitoring.service';
import { of } from 'rxjs';

describe('ConnectivityMonitoringComponent', () => {
  let component: ConnectivityMonitoringComponent;
  let fixture: ComponentFixture<ConnectivityMonitoringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConnectivityMonitoringComponent],
      providers: [
        { provide: ConnectivityMonitoringService, useClass: MockConnectivityMonitoringService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectivityMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  // describe('ngOnInit()', () => {

  //   it('should ', () => {
  //     spyOn(component.connectivityMonitoringService, 'getVesselLinks').and.returnValue(of([]));
  //     spyOn(component.connectivityMonitoringService, 'setAllVesselLinks');
  //     component.ngOnInit();
  //     expect(component.connectivityMonitoringService.getVesselLinks).toHaveBeenCalled();
  //     expect(component.connectivityMonitoringService.setAllVesselLinks).not.toHaveBeenCalledWith([]);
  //   });

  // });

});
