import { Component, OnInit } from '@angular/core';
import { OperationalPlanService } from 'src/app/services/operational-plan.service';
import { FormType } from '../../../app.constants';

@Component({
  selector: 'app-vessel',
  templateUrl: './vessel.component.html',
  styleUrls: ['./vessel.component.scss']
})
export class VesselComponent implements OnInit {

  vesselList: IVesselList[] = [];
  formType = FormType;
  config = {
    formTitle: 'Add Vessel',
    formList: []
  };
  cols = [
    { field: 'VesselName', header: 'Vessel Name' },
    { field: 'IMONumber', header: 'IMO Number' },
    { field: 'Action', header: 'Action' }
  ];
  formValues: any;

  constructor(
    private operationalPlanService: OperationalPlanService
  ) { }

  ngOnInit() {
    this.vesselList = this.operationalPlanService.getVesselList();
    this.constructForm();
  }
  constructForm(): void {
    this.config.formList = [
      {
        type: FormType.text,
        label: 'Vessel Name',
        value: '',
        key: 'VesselName',
        validators: ['required'],
        disabled: false
      },
      {
        type: FormType.number,
        label: 'IMO Number',
        value: '',
        key: 'IMONumber',
        validators: ['required'],
        disabled: false
      }
    ];
  }
  editData(data: IVesselList): void {
    this.config.formTitle = 'Edit Vessel';
    this.formValues = data;
  }
  formSubmitted(data: any): void {
    console.log(data);
  }

}
