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
    { field: 'CountryName', sortfield: 'CountryName', header: 'Country Name', filterMatchMode: 'contains' },
    { field: 'MCCs', sortfield: '', header: 'MCC', filterMatchMode: 'contains' },
    { field: 'Status', sortfield: 'Status', header: 'Status', filterMatchMode: 'contains' },
    { field: 'VesselId', sortfield: '', header: 'Action' }
  ];
  vesselList: IVesselList[] = [];
  activeVessel: IVesselList;
  operatorCountryList: IOperatorCountryList[] = [];
  groupCountryList: IOperatorCountryList[] = [];
  groupList: IOperatorCountryList[] = [];
  activeOperatorCountry: IOperatorCountryList = null;
  activeGroup: IOperatorCountryList = null;
  isDataLoading: boolean;
  disableActivity: boolean;
  displayManageCountryGroup: boolean;
  form: FormGroup;
  PRIMENG_CONSTANTS = AppConstants.PRIMENG_CONSTANTS;
  constructor(
    private connectivityControlService: ConnectivityControlService,
    private operationalPlanService: OperationalPlanService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
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
    this.operationalPlanService.getVesselList().pipe(take(1)).subscribe((data) => {
      this.vesselList = data;
      this.vesselList.unshift({
        Id: -1,
        VesselName: 'All Vessels',
        IpAddress: '',
        EnabledTime: '',
        TimeLimit: 0,
        IsUploadEnabled: false,
        RemainingMinutes: 0,
        RemainingTime: '',
        DisableTime: '',
        EnabledBy: '',
        NodeNumber: 0,
        ImoNumber: 0
      });
      this.activeVessel = this.vesselList[0];
      this.loadWhitelistedCountries();
    });
  }
  getOperatorCountryList(): void {
    this.connectivityControlService.getOperatorCountryList().pipe(take(1)).subscribe((data) => {
      this.operatorCountryList = data;
      this.groupList = this.operatorCountryList.filter((e) => e.IsCountryGroup);
      this.sortCountries();
    });
  }
  loadWhitelistedCountries(): void {
    this.isDataLoading = true;
    this.connectivityControlService.getWhiteListedCountries(this.activeVessel.Id).pipe(take(1)).subscribe((data) => {
      this.isDataLoading = false;
      this.whiteListedCountries = data;
    });
  }
  markCountryWhitelist(): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.disableActivity = true;
        const formData: any = {
          CountryId: this.activeOperatorCountry.CountryId,
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
    this.connectivityControlService.removeWhitelistCountry(rowData).pipe(take(1)).subscribe((data) => {
      this.disableActivity = false;
      this.triggerToast('success', 'Success Message', `Data Updated Successfully`);
      this.loadWhitelistedCountries();
    });
  }
  toggleManageCountryGroup(): void {
    this.displayManageCountryGroup = !this.displayManageCountryGroup;
  }
  loadGroupCountries(): void {
    this.connectivityControlService.getGroupCountries(this.activeGroup.CountryId).pipe(take(1)).subscribe((data) => {
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
        const formData = {
          GroupId: this.activeGroup.CountryId,
          User: 'admin'
        };
        this.disableActivity = true;
        this.connectivityControlService.deleteCountryGroup(formData).pipe(take(1)).subscribe((data) => {
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
            this.triggerToast('success', 'Success Message', `Data Updated Successfully`);
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
          GroupId: this.activeGroup.CountryId,
          CountryIds: this.groupCountryList.map((e) => e.CountryId)
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
    this.operatorCountryList = this.operatorCountryList.sort((a, b) => (a.CountryName > b.CountryName) ? 1 : -1);
    this.groupCountryList = this.groupCountryList.sort((a, b) => (a.CountryName > b.CountryName) ? 1 : -1);
  }

}
