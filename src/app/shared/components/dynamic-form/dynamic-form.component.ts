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

  @Output() formOnchangeEvent: EventEmitter<any> = new EventEmitter<any>();
  inputTypes: any;
  @Input() form: FormGroup;
  isFormSubmitted = false;
  ipAddressPattern = '(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)';
  portLocations: any[] = [];
  PRIMENG_CONSTANTS = AppConstants.PRIMENG_CONSTANTS;

  constructor(
    public fb: FormBuilder,
    public operationalPlanService: OperationalPlanService,
    
  ) {
  }

  ngOnInit(): void {
    this.inputTypes = getInputTypes();
    console.log(this.form);
   // this.form = this.formBuliderService.buildForm(this.config);
   // this.form = this.buildForm();
  }
  ngOnChanges(changes: SimpleChanges): void {
    // formvalues: obj sets default value received from parent component
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
    // formReset: boolean sets form values to empty state (mostly after form data postted successfully) received from parent component
    if (this.formReset && this.form) {
      this.form.reset();
      this.isFormSubmitted = false;
    }
  }
  

  onchangeEvents(formItem: any) {

    this.formOnchangeEvent.emit({ formItem, formValue: this.form.controls[formItem.key].value });
  }

  filterPortLocations(event) {
    this.operationalPlanService.filterPortLocations(event.query).subscribe((data) => {
      this.portLocations = data;
    });
  }

}
