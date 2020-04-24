import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePlansComponent } from './manage-plans.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { OperationalPlanService } from 'src/app/services/operational-plan.service';
import { MockOperationalPlanService } from '../../../services/mock.operational-plan.service';
import { FormBuilder } from '@angular/forms';
import { MockFormBuilder } from '../../../services/mock.form.builder';
import { MockPrimengMessageService } from '../../../services/mock.primengmessage.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { MockRouter } from '../../../services/mock.router.service';

describe('ManagePlansComponent', () => {
  let component: ManagePlansComponent;
  let fixture: ComponentFixture<ManagePlansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagePlansComponent ],
      providers: [
        { provide: OperationalPlanService, useClass: MockOperationalPlanService },
        { provide: FormBuilder, useClass: MockFormBuilder },
        { provide: MessageService, useClass: MockPrimengMessageService },
        { provide: Router, useClass: MockRouter }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
