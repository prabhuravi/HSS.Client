import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HullskaterRegularityKpiComponent } from './hullskater-regularity-kpi.component';

describe('HullskaterRegularityKpiComponent', () => {
  let component: HullskaterRegularityKpiComponent;
  let fixture: ComponentFixture<HullskaterRegularityKpiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HullskaterRegularityKpiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HullskaterRegularityKpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
