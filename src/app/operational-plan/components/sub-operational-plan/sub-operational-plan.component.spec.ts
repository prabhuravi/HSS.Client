import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubOperationalPlanComponent } from './sub-operational-plan.component';

describe('SubOperationalPlanComponent', () => {
  let component: SubOperationalPlanComponent;
  let fixture: ComponentFixture<SubOperationalPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubOperationalPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubOperationalPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
