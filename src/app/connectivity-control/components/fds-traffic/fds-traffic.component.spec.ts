import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FdsTrafficComponent } from './fds-traffic.component';

describe('FdsTrafficComponent', () => {
  let component: FdsTrafficComponent;
  let fixture: ComponentFixture<FdsTrafficComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FdsTrafficComponent ]
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
});
