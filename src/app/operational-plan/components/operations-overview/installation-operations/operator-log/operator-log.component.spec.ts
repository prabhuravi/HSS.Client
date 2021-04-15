import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorLogComponent } from './operator-log.component';

describe('OperatorLogComponent', () => {
  let component: OperatorLogComponent;
  let fixture: ComponentFixture<OperatorLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperatorLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatorLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
