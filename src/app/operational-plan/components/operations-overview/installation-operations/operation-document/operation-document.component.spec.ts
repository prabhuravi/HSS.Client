import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationDocumentComponent } from './operation-document.component';

describe('OperationDocumentComponent', () => {
  let component: OperationDocumentComponent;
  let fixture: ComponentFixture<OperationDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
