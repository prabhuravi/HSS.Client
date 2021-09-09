import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormComponent } from './dynamic-form.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { OperationalPlanService } from 'src/app/services/operational-plan.service';
import { MockOperationalPlanService } from '../../../services/mock.operational-plan.service';
import { FormBuilder } from '@angular/forms';
import { MockFormBuilder } from '../../../services/mock.form.builder';
import { of } from 'rxjs';

describe('DynamicFormComponent', () => {
  let component: DynamicFormComponent;
  let fixture: ComponentFixture<DynamicFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DynamicFormComponent],
      providers: [
        { provide: OperationalPlanService, useClass: MockOperationalPlanService },
        { provide: FormBuilder, useClass: MockFormBuilder }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
  // describe('filterPortLocations()', () => {

  //   // it('should ', () => {
  //   //   spyOn(component.operationalPlanService, 'filterPortLocations').and.returnValue(of([]));
  //   //   component.filterPortLocations({
  //   //     query: ''
  //   //   });
  //   //   expect(component.operationalPlanService.filterPortLocations).toHaveBeenCalledWith({
  //   //     PortName: ''
  //   //   });
  //   // });

  // });

});
