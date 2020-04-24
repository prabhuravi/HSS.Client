import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectivityControlComponent } from './connectivity-control.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ConnectivityControlService } from '../../../services/connectivity-control.service';
import { MockConnectivityControlService } from '../../../services/mock.connectivity-control.service';

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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
