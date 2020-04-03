import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VesselHistoryComponent } from './vessel-history.component';

describe('VesselHistoryComponent', () => {
  let component: VesselHistoryComponent;
  let fixture: ComponentFixture<VesselHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VesselHistoryComponent ]
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
