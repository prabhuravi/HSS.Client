import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RobotSystemComponent } from './robot-system.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { OperationalPlanService } from 'src/app/services/operational-plan.service';
import { MockOperationalPlanService } from '../../../services/mock.operational-plan.service';
import { MockPrimengMessageService } from '../../../services/mock.primengmessage.service';
import { MockConfirmationService } from '../../../services/mock.confirmation.service';
import { ConfirmationService, MessageService } from 'primeng/api';

describe('RobotSystemComponent', () => {
  let component: RobotSystemComponent;
  let fixture: ComponentFixture<RobotSystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RobotSystemComponent ],
      providers: [
        { provide: OperationalPlanService, useClass: MockOperationalPlanService },
        { provide: MessageService, useClass: MockPrimengMessageService },
        { provide: ConfirmationService, useClass: MockConfirmationService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RobotSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
