import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSecondryOperationComponent } from './create-secondry-operation.component';

describe('CreateSecondryOperationComponent', () => {
  let component: CreateSecondryOperationComponent;
  let fixture: ComponentFixture<CreateSecondryOperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSecondryOperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSecondryOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
