/*
 * KONGSBERG PROPRIETARY. This document and its accompanying elements, contain KONGSBERG information which is proprietary and confidential.
Any disclosure, copying, distribution or use is prohibited if not otherwise explicitly agreed with KONGSBERG in writing.
Any authorized reproduction, in whole or in part, must include this legend. © [year of creation] KONGSBERG – All rights reserved.
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallationOverviewComponent } from './installation-overview.component';
import { SharedModule } from '../../../shared/shared.module';

describe('InstallationOverviewComponent', () => {
  let component: InstallationOverviewComponent;
  let fixture: ComponentFixture<InstallationOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule ],
      declarations: [ InstallationOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallationOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
