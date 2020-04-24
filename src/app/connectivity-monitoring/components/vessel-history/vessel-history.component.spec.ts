import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VesselHistoryComponent } from './vessel-history.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ConnectivityMonitoringService } from 'src/app/services/connectivity-monitoring.service';
import { MockConnectivityMonitoringService } from '../../../services/mock.connectivity-monitoring.service';
import { ActivatedRoute } from '@angular/router';
import { MockActivatedRoute } from '../../../services/mock.router.service';
import { ThemeService } from '@kognifai/poseidon-ng-theming';
import { MockThemeService } from '../../../services/mock.theme.service';

describe('VesselHistoryComponent', () => {
  let component: VesselHistoryComponent;
  let fixture: ComponentFixture<VesselHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VesselHistoryComponent ],
      providers: [
        { provide: ConnectivityMonitoringService, useClass: MockConnectivityMonitoringService },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
