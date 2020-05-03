import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VesselComponent } from './vessel.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { OperationalPlanService } from 'src/app/services/operational-plan.service';
import { MockOperationalPlanService } from '../../../services/mock.operational-plan.service';
import { MockPrimengMessageService } from '../../../services/mock.primengmessage.service';
import { MockConfirmationService } from '../../../services/mock.confirmation.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { of } from 'rxjs';

describe('VesselComponent', () => {
  let component: VesselComponent;
  let fixture: ComponentFixture<VesselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VesselComponent ],
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
    fixture = TestBed.createComponent(VesselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit()', () => {

    it('should ', () => {
      spyOn(component, 'loadData');
      spyOn(component, 'constructForm');
      component.ngOnInit();
      expect(component.loadData).toHaveBeenCalled();
      expect(component.constructForm).toHaveBeenCalled();
    });

  });

  describe('loadData()', () => {

    it('should ', () => {
      spyOn(component.operationalPlanService, 'getVesselList').and.returnValue(of([]));
      component.loadData();
      expect(component.operationalPlanService.getVesselList).toHaveBeenCalled();
    });

  });

  describe('updateData()', () => {

    it('should ', () => {
      spyOn(component.operationalPlanService, 'addVessel').and.returnValue(of([]));
      component.updateData({});
      expect(component.operationalPlanService.addVessel).toHaveBeenCalledWith({});
    });

  });

  describe('deleteData()', () => {

    it('should ', () => {
      spyOn(component.operationalPlanService, 'deleteVessel').and.returnValue(of([]));
      component.deleteData({});
      expect(component.operationalPlanService.deleteVessel).toHaveBeenCalledWith({});
    });

  });
});
