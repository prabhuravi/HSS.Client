import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { getInputTypes } from '../../../app.constants';
import { OperationalPlanService } from 'src/app/services/operational-plan.service';
import { AppConstants } from 'src/app/app.constants';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit, OnChanges {

  @Input() config: any;
  @Input() formValues: any;
  @Input() formReset: any;
  @Output() formSubmitted: EventEmitter<any> = new EventEmitter<any>();
  inputTypes: any;
  form: FormGroup;
  isFormSubmitted = false;
  ipAddressPattern = '/^([0-9]{1,3})[.]([0-9]{1,3})[.]([0-9]{1,3})[.]([0-9]{1,3})$/';
  portLocations: any[] = [];
  PRIMENG_CONSTANTS = AppConstants.PRIMENG_CONSTANTS;

  constructor(
    public fb: FormBuilder,
    public operationalPlanService: OperationalPlanService
  ) {
  }

  ngOnInit(): void {
    this.inputTypes = getInputTypes();
    this.form = this.buildForm();
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (this.formValues !== null && this.formValues !== undefined) {
      setTimeout(() => {
        if (!this.formReset) {
          if (this.form && this.form.controls[`Status`]) {
            this.form.controls[`Status`].reset({ value: null, disabled: false });
          }
          this.form.patchValue(this.formValues);
        }
      });
    }
    if (this.formReset && this.form) {
      this.form.reset();
      this.isFormSubmitted = false;
    }
  }
  buildForm() {
    if (!this.config || !this.config.formList || this.config.formList.length === 0) {
      return;
    }
    const group = this.fb.group({});
    this.config.formList.forEach((control) => {
      const validatorList = [];
      control.validators.forEach((validator) => {
        switch (validator) {
          case 'required':
            validatorList.push(Validators.required);
            break;
          case 'ipaddress':
            validatorList.push(Validators.pattern(this.ipAddressPattern));
            break;
          default:
            break;
        }
      });
      group.addControl(control.key, this.fb.control({ value: control.value, disabled: control.disabled }, validatorList));
    });
    return group;
  }
  onSubmit(): void {
    this.isFormSubmitted = true;
    if (this.form.valid) {
      this.formSubmitted.emit(this.form.value);
    }
  }

  filterPortLocations(event) {
    const query = {
      PortName: event.query
    };
    this.operationalPlanService.filterPortLocations(query).subscribe((data) => {
      this.portLocations = data;
    });
  }

}
