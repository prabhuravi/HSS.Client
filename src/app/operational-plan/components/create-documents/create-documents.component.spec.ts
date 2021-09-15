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
