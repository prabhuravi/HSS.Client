import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectivityMonitoringComponent } from './connectivity-monitoring.component';

describe('ConnectivityMonitoringComponent', () => {
  let component: ConnectivityMonitoringComponent;
  let fixture: ComponentFixture<ConnectivityMonitoringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectivityMonitoringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectivityMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
