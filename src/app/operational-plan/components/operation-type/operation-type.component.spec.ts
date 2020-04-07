import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationTypeComponent } from './operation-type.component';

describe('OperationTypeComponent', () => {
  let component: OperationTypeComponent;
  let fixture: ComponentFixture<OperationTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
