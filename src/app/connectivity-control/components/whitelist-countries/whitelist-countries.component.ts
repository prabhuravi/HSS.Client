/*
 * KONGSBERG PROPRIETARY. This document and its accompanying elements, contain KONGSBERG information which is proprietary and confidential.
Any disclosure, copying, distribution or use is prohibited if not otherwise explicitly agreed with KONGSBERG in writing.
Any authorized reproduction, in whole or in part, must include this legend. © [year of creation] KONGSBERG – All rights reserved.
 */
import { Component, OnInit } from '@angular/core';
import { ConnectivityControlService } from 'src/app/services/connectivity-control.service';
import { OperationalPlanService } from 'src/app/services/operational-plan.service';
import { take } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppConstants } from 'src/app/app.constants';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-whitelist-countries',
  templateUrl: './whitelist-countries.component.html',
  styleUrls: ['./whitelist-countries.component.scss']
})
export class WhitelistCountriesComponent implements OnInit {

  whiteListedCountries: IWhiteListedCountries[] = [];
  cols = [
    { field: 'Name', sortfield: 'Name', header: 'Country/Group Name', filterMatchMode: 'contains' },
    { field: 'MCCs', sortfield: '', header: 'MCC', filterMatchMode: 'contains' },
    { field: 'Status', sortfield: 'Status', header: 'Status', filterMatchMode: 'contains' },
    { field: 'VesselId', sortfield: '', header: 'Action' }
  ];
  vesselList: IVesselList[] = [];
  vessels: IVessel[] = [];
  activeVessel: IVessel;
  operatorCountryList: IOperatorCountryList[] = [];
  lastContact: string;
  countryList: IOperatorCountryList[] = [];
  groupList: IOperatorCountryList[] = [];
  groupCountryList: IOperatorCountryList[] = [];
  activeOperatorCountry: IOperatorCountryList = null;
  activeGroup: IOperatorCountryList = null;
  isDataLoading: boolean;
  disableActivity: boolean;
  displayManageCountryGroup: boolean;
  form: FormGroup;
  PRIMENG_CONSTANTS = AppConstants.PRIMENG_CONSTANTS;
  constructor(
    public connectivityControlService: ConnectivityControlService,
    public operationalPlanService: OperationalPlanService,
    public fb: FormBuilder,
    public confirmationService: ConfirmationService,
    public messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.loadData();
    this.form = this.buildForm();
  }
  buildForm() {
    const group = this.fb.group({});
    group.addControl('GroupName', this.fb.control({ value: '', disabled: false }, [Validators.required]));
    return group;
  }
  loadData(): void {
    this.getVesselList();
    this.getOperatorCountryList();
  }
  getVesselList(): void {
    this.isDataLoading = true;
    this.connectivityControlService.getVessels().pipe(take(1)).subscribe((data) => {
      this.vessels = data;
      this.vessels.unshift({
        Id: -1,
        Name: 'All Vessels',
        ImoNo: 0,
        DisplayName: 'All Vessels',
        InstallationId: '',
        LloydsVesselId: 0,
        Owner: '',
        Status: ''
      });
      this.activeVessel = this.vessels[0];
      this.loadWhitelistedCountries();
    });
  }

  getOperatorCountryList(): void {
    this.connectivityControlService.getOperatorCountryList().pipe(take(1)).subscribe((data) => {
      this.operatorCountryList = data;
      this.countryList = this.operatorCountryList.filter((e) => !e.IsCountryGroup);
      this.groupList = this.operatorCountryList.filter((e) => e.IsCountryGroup);
      this.sortCountries();
    });
  }

  loadWhitelistedCountries(): void {
    this.isDataLoading = true;
    this.lastContact = '';
    this.connectivityControlService.getWhiteListedCountries(this.activeVessel.Id).pipe(take(1)).subscribe((data) => {
      this.isDataLoading = false;
      this.whiteListedCountries = data;
    });

    if (this.activeVessel.Id > 0 ) {
      this.connectivityControlService.getLastSyncDate(this.activeVessel.Id).pipe(take(1)).subscribe((data) => {
        this.isDataLoading = false;
        this.lastContact = data;
      });
    }
  }

  markCountryWhitelist(): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.processMarkCountryWhitelist();
      }
    });
  }

  processMarkCountryWhitelist(): void {
    this.disableActivity = true;
    const formData: any = {
      CountryOrGroupId: this.activeOperatorCountry.Id,
      VesselId: this.activeVessel.Id,
      IsCountryGroup: this.activeOperatorCountry.IsCountryGroup,
      GroupCountryIDs: this.activeOperatorCountry.GroupCountryIDs
    };
    this.connectivityControlService.markCountryWhitelist(formData).pipe(take(1)).subscribe((data) => {
      this.disableActivity = false;
      this.triggerToast('success', 'Success Message', `Data Updated Successfully`);
      this.loadWhitelistedCountries();
    });
  }

  removeWhitelistCountryConfirm(data: IWhiteListedCountries): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.removeWhitelistCountry(data);
      }
    });
  }

  removeWhitelistCountry(rowData: IWhiteListedCountries): void {
    rowData.VesselId = this.activeVessel.Id;
    this.disableActivity = true;
    this.connectivityControlService.removeWhitelistCountry(rowData.Id).pipe(take(1)).subscribe((data) => {
      this.disableActivity = false;
      this.triggerToast('success', 'Success Message', `Data Updated Successfully`);
      this.loadWhitelistedCountries();
    });
  }
  toggleManageCountryGroup(): void {
    this.displayManageCountryGroup = !this.displayManageCountryGroup;
  }
  loadGroupCountries(): void {
    this.connectivityControlService.getGroupCountries(this.activeGroup.Id).pipe(take(1)).subscribe((data) => {
      this.groupCountryList = data;
      this.sortCountries();
    });
  }
  deleteCountryGroup(): void {
    if (!this.activeGroup) {
      return;
    }
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.disableActivity = true;
        this.connectivityControlService.deleteCountryGroup(this.activeGroup.Id).pipe(take(1)).subscribe((data) => {
          this.disableActivity = false;
          this.activeGroup = null;
          this.triggerToast('success', 'Success Message', `Data Updated Successfully`);
          this.groupCountryList = [];
          this.getOperatorCountryList();
        });
      }
    });
  }

  addCountryGroup(): void {
    if (this.form.valid) {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to perform this action?',
        accept: () => {
          this.disableActivity = true;
          this.connectivityControlService.addCountryGroup(this.form.value).pipe(take(1)).subscribe((data) => {
            this.disableActivity = false;
            this.form.patchValue(
              {
                GroupName: ''
              }
            );
            this.triggerToast('success', 'Success Message', data);
            this.getOperatorCountryList();
          });
        }
      });
    }
  }

  updateGroupCountries(): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        const formData = {
          GroupId: this.activeGroup.Id,
          CountryIds: this.groupCountryList.map((e) => e.Id)
        };
        this.disableActivity = true;
        this.connectivityControlService.addCountriesToGroup(formData).pipe(take(1)).subscribe((data) => {
          this.disableActivity = false;
          this.triggerToast('success', 'Success Message', `Data Updated Successfully`);
          this.loadGroupCountries();
        });
      }
    });
  }

  triggerToast(severity: string, summary: string, detail: string): void {
    this.messageService.add(
      {
        severity,
        summary,
        detail
      });
  }
  sortCountries(): void {
    for (let i = this.operatorCountryList.length - 1; i >= 0; i--) {
      for (let j = 0; j < this.groupCountryList.length; j++) {
        if (this.operatorCountryList[i] && (this.operatorCountryList[i].Id === this.groupCountryList[j].Id)) {
          this.operatorCountryList.splice(i, 1);
        }
      }
    }
    this.operatorCountryList = this.operatorCountryList.sort((a, b) => (a.Name > b.Name) ? 1 : -1);
    this.groupCountryList = this.groupCountryList.sort((a, b) => (a.Name > b.Name) ? 1 : -1);
  }

}
