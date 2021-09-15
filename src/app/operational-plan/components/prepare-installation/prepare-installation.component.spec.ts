/*
 * KONGSBERG PROPRIETARY. This document and its accompanying elements, contain KONGSBERG information which is proprietary and confidential.
Any disclosure, copying, distribution or use is prohibited if not otherwise explicitly agreed with KONGSBERG in writing.
Any authorized reproduction, in whole or in part, must include this legend. © [year of creation] KONGSBERG – All rights reserved.
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepareInstallationComponent } from './prepare-installation.component';
import { ActivatedRoute } from '@angular/router';

describe('PrepareInstallationComponent', () => {
  let component: PrepareInstallationComponent;
  let fixture: ComponentFixture<PrepareInstallationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ActivatedRoute],
      declarations: [ PrepareInstallationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrepareInstallationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
