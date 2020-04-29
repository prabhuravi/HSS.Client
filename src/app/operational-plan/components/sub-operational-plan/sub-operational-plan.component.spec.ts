import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubOperationalPlanComponent } from './sub-operational-plan.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { OperationalPlanService } from 'src/app/services/operational-plan.service';
import { MockOperationalPlanService } from '../../../services/mock.operational-plan.service';
import { MockConfirmationService } from '../../../services/mock.confirmation.service';
import { ConfirmationService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { MockActivatedRoute } from '../../../services/mock.router.service';

describe('SubOperationalPlanComponent', () => {
  let component: SubOperationalPlanComponent;
  let fixture: ComponentFixture<SubOperationalPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubOperationalPlanComponent ],
      providers: [
        { provide: OperationalPlanService, useClass: MockOperationalPlanService },
        { provide: ConfirmationService, useClass: MockConfirmationService },
        { provide: ActivatedRoute, useClass: MockActivatedRoute }
      ],
      schemas: [NO_ERRORS_SCHEMA]
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
