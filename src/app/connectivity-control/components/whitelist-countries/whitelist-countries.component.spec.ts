/*
 * KONGSBERG PROPRIETARY. This document and its accompanying elements, contain KONGSBERG information which is proprietary and confidential.
Any disclosure, copying, distribution or use is prohibited if not otherwise explicitly agreed with KONGSBERG in writing.
Any authorized reproduction, in whole or in part, must include this legend. © [year of creation] KONGSBERG – All rights reserved.
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhitelistCountriesComponent } from './whitelist-countries.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ConnectivityControlService } from '../../../services/connectivity-control.service';
import { OperationalPlanService } from 'src/app/services/operational-plan.service';
import { MockConnectivityControlService } from '../../../services/mock.connectivity-control.service';
import { MockOperationalPlanService } from '../../../services/mock.operational-plan.service';
import { FormBuilder } from '@angular/forms';
import { MockFormBuilder } from '../../../services/mock.form.builder';
import { MockPrimengMessageService } from '../../../services/mock.primengmessage.service';
import { MockConfirmationService } from '../../../services/mock.confirmation.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { of } from 'rxjs';

describe('WhitelistCountriesComponent', () => {
  let component: WhitelistCountriesComponent;
  let fixture: ComponentFixture<WhitelistCountriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WhitelistCountriesComponent],
      providers: [
        { provide: ConnectivityControlService, useClass: MockConnectivityControlService },
        { provide: OperationalPlanService, useClass: MockOperationalPlanService },
        { provide: FormBuilder, useClass: MockFormBuilder },
        { provide: MessageService, useClass: MockPrimengMessageService },
        { provide: ConfirmationService, useClass: MockConfirmationService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhitelistCountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  // describe('ngOnInit()', () => {

  //   it('should call loadData and buildform methods', () => {
  //     spyOn(component, 'loadData');
  //     spyOn(component, 'buildForm');
  //     component.ngOnInit();
  //     expect(component.buildForm).toHaveBeenCalled();
  //     expect(component.loadData).toHaveBeenCalled();
  //   });

  // });

  // describe('loadData()', () => {

  //   it('should call getVesselList & getOperatorCountryListmethods', () => {
  //     spyOn(component, 'getVesselList');
  //     spyOn(component, 'getOperatorCountryList');
  //     component.loadData();
  //     expect(component.getVesselList).toHaveBeenCalled();
  //     expect(component.getOperatorCountryList).toHaveBeenCalled();
  //   });

  // });

  // describe('getVesselList()', () => {

  //   it('should call getVesselList from operationalPlanService', () => {
  //     spyOn(component.operationalPlanService, 'getVesselList').and.returnValue(of([]));
  //     spyOn(component, 'loadWhitelistedCountries');
  //     component.getVesselList();
  //     expect(component.operationalPlanService.getVesselList).toHaveBeenCalled();
  //     expect(component.loadWhitelistedCountries).toHaveBeenCalled();
  //   });

  // });

  // describe('getOperatorCountryList()', () => {

  //   it('should call getOperatorCountryList from operationalPlanService', () => {
  //     spyOn(component.connectivityControlService, 'getOperatorCountryList').and.returnValue(of([]));
  //     component.getOperatorCountryList();
  //     expect(component.connectivityControlService.getOperatorCountryList).toHaveBeenCalled();
  //   });

  // });

  // describe('loadWhitelistedCountries()', () => {

  //   it('should ', () => {
  //     component.activeVessel = {
  //       Id: 1
  //     } as any;
  //     spyOn(component.connectivityControlService, 'getWhiteListedCountries').and.returnValue(of([]));
  //     component.loadWhitelistedCountries();
  //     expect(component.connectivityControlService.getWhiteListedCountries).toHaveBeenCalledWith(component.activeVessel.Id);
  //   });

  // });

  // describe('processMarkCountryWhitelist()', () => {

  //   it('should ', () => {
  //     component.activeOperatorCountry = {
  //       CountryId: 1,
  //       IsCountryGroup: true,
  //       GroupCountryIDs: []
  //     } as any;
  //     component.activeVessel = {
  //       Id: 1
  //     } as any;
  //     const formData: any = {
  //       CountryId: component.activeOperatorCountry.Id,
  //       VesselId: component.activeVessel.Id,
  //       IsCountryGroup: component.activeOperatorCountry.IsCountryGroup,
  //       GroupCountryIDs: component.activeOperatorCountry.GroupCountryIDs
  //     };
  //     spyOn(component.connectivityControlService, 'markCountryWhitelist').and.returnValue(of([]));
  //     component.processMarkCountryWhitelist();
  //     expect(component.connectivityControlService.markCountryWhitelist).toHaveBeenCalledWith(formData);
  //   });

  // });

});
