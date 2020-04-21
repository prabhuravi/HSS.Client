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
    { field: 'CountryName', sortfield: 'VesselName', header: 'Country Name' },
    { field: 'MCCs', sortfield: 'MCCs', header: 'FCC' },
    { field: 'Vessel', sortfield: 'Vessel', header: 'Whitelisted For' },
    { field: 'VesselId', sortfield: '', header: 'Action' }
  ];
  vesselList: IVesselList[] = [];
  activeVessel: IVesselList;
  operatorCountryList: IOperatorCountryList[] = [];
  groupCountryList: IOperatorCountryList[] = [];
  groupList: IOperatorCountryList[] = [];
  activeOperatorCountry: IOperatorCountryList;
  activeGroup: IOperatorCountryList;
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
      this.activeOperatorCountry = this.operatorCountryList[0];
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
  removeWhitelistCountryConfirm(data: IWhiteListedCountries): void {
    console.log(data);
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
  loadGropCountries(): void {
    this.connectivityControlService.getGroupCountries(this.activeGroup.CountryId).pipe(take(1)).subscribe((data) => {
      this.groupCountryList = data;
    });
  }
  deleteCountryGroup(): void {
    const formData = {
      GroupId: this.activeGroup.CountryId,
      User: 'admin'
    };
    this.connectivityControlService.deleteCountryGroup(formData).pipe(take(1)).subscribe((data) => {
      this.triggerToast('success', 'Success Message', `Data Updated Successfully`);
      this.getOperatorCountryList();
    });
  }
  addCountryGroup(): void {
    if (this.form.valid) {
      this.disableActivity = true;
      this.connectivityControlService.addCountryGroup(this.form.value).pipe(take(1)).subscribe((data) => {
        this.disableActivity = false;
        this.triggerToast('success', 'Success Message', `Data Updated Successfully`);
        this.getOperatorCountryList();
      });
    }
  }
  updateGroupCountries(): void {
    console.log(this.groupCountryList);
  }
  triggerToast(severity: string, summary: string, detail: string): void {
    this.messageService.add(
      {
        severity,
        summary,
        detail
      });
  }

}
