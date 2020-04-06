import { Component, OnInit } from '@angular/core';
import { FormType } from '../../../app.constants';
import { WhitelistCountriesService } from 'src/app/services/whitelist-countries.service';

@Component({
  selector: 'app-add-plan',
  templateUrl: './add-plan.component.html',
  styleUrls: ['./add-plan.component.scss']
})
export class AddPlanComponent implements OnInit {

  vesselList: IVesselList[] = [];
  formType = FormType;
  config = {
    formList: []
  };

  constructor(
    private whitelistCountriesService: WhitelistCountriesService
  ) { }

  ngOnInit(): void {
    this.vesselList = this.whitelistCountriesService.getVesselList();
    this.constructForm();
  }

  constructForm(): void {
    this.config.formList = [
      {
        type: FormType.dropdown,
        label: 'Vessel',
        options: this.vesselList,
        value: '',
        key: 'VesselId',
        validators: ['required']
      },
      {
        type: FormType.datepicker,
        label: 'Operation Date',
        value: '',
        key: 'OperationDate',
        validators: ['required']
      },
      {
        type: FormType.text,
        label: 'Location',
        value: '',
        key: 'OperationLoc',
        validators: ['required']
      }
    ];
  }

  formSubmitted(formData: any) {
    console.log('formData', formData);
  }

}
