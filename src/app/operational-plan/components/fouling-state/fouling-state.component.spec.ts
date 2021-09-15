/*
 * KONGSBERG PROPRIETARY. This document and its accompanying elements, contain KONGSBERG information which is proprietary and confidential.
Any disclosure, copying, distribution or use is prohibited if not otherwise explicitly agreed with KONGSBERG in writing.
Any authorized reproduction, in whole or in part, must include this legend. © [year of creation] KONGSBERG – All rights reserved.
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoulingStateComponent } from './fouling-state.component';
import { ListFoulingStateComponent } from './list-fouling-state/list-fouling-state.component';

describe('FoulingStateComponent', () => {
  let component: FoulingStateComponent;
  let fixture: ComponentFixture<FoulingStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      
      declarations: [ FoulingStateComponent ],
      providers: [ListFoulingStateComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoulingStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
