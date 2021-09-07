/*
 * KONGSBERG PROPRIETARY. This document and its accompanying elements, contain KONGSBERG information which is proprietary and confidential.
Any disclosure, copying, distribution or use is prohibited if not otherwise explicitly agreed with KONGSBERG in writing.
Any authorized reproduction, in whole or in part, must include this legend. © [year of creation] KONGSBERG – All rights reserved.
 */
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
