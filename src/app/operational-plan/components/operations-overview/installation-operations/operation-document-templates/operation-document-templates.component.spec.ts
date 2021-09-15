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
