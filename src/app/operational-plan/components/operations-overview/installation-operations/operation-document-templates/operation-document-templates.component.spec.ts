/*
 * KONGSBERG PROPRIETARY. This document and its accompanying elements, contain KONGSBERG information which is proprietary and confidential.
Any disclosure, copying, distribution or use is prohibited if not otherwise explicitly agreed with KONGSBERG in writing.
Any authorized reproduction, in whole or in part, must include this legend. © [year of creation] KONGSBERG – All rights reserved.
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationDocumentTemplatesComponent } from './operation-document-templates.component';
import { DialogModule } from 'primeng/dialog';

describe('OperationDocumentTemplatesComponent', () => {
  let component: OperationDocumentTemplatesComponent;
  let fixture: ComponentFixture<OperationDocumentTemplatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ DialogModule ],
      declarations: [ OperationDocumentTemplatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationDocumentTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
