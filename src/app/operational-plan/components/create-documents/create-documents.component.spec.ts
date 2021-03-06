/*
 * KONGSBERG PROPRIETARY. This document and its accompanying elements, contain KONGSBERG information which is proprietary and confidential.
Any disclosure, copying, distribution or use is prohibited if not otherwise explicitly agreed with KONGSBERG in writing.
Any authorized reproduction, in whole or in part, must include this legend. © [year of creation] KONGSBERG – All rights reserved.
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDocumentsComponent } from './create-documents.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

describe('CreateDocumentsComponent', () => {
  let component: CreateDocumentsComponent;
  let fixture: ComponentFixture<CreateDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormBuilder, FormGroup, Validators ],
      declarations: [ CreateDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
