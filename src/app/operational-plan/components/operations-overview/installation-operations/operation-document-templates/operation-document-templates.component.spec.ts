import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationDocumentTemplatesComponent } from './operation-document-templates.component';

describe('OperationDocumentTemplatesComponent', () => {
  let component: OperationDocumentTemplatesComponent;
  let fixture: ComponentFixture<OperationDocumentTemplatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationDocumentTemplatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationDocumentTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
