import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectivityControlComponent } from './connectivity-control.component';

describe('ConnectivityControlComponent', () => {
  let component: ConnectivityControlComponent;
  let fixture: ComponentFixture<ConnectivityControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectivityControlComponent ]
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
