/*
 * KONGSBERG PROPRIETARY. This document and its accompanying elements, contain KONGSBERG information which is proprietary and confidential.
Any disclosure, copying, distribution or use is prohibited if not otherwise explicitly agreed with KONGSBERG in writing.
Any authorized reproduction, in whole or in part, must include this legend. © [year of creation] KONGSBERG – All rights reserved.
 */
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { getInputTypes } from '../../../app.constants';
import { OperationalPlanService } from 'src/app/services/operational-plan.service';
import { AppConstants } from 'src/app/app.constants';
import { SearchCountryField, TooltipLabel, CountryISO } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit, OnChanges {

  @Input() config: any;
  @Input() formValues: any;
  @Input() formReset: any;
  separateDialCode = false;


  @Output() formOnchangeEvent: EventEmitter<any> = new EventEmitter<any>();
  inputTypes: any;
  @Input() form: FormGroup;
  @Input() isFormSubmitted = false;
  ipAddressPattern = '(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)';
  portLocations: any[] = [];
  PRIMENG_CONSTANTS = AppConstants.PRIMENG_CONSTANTS;

	SearchCountryField = SearchCountryField;
	TooltipLabel = TooltipLabel;
	CountryISO = CountryISO;
	preferredCountries: CountryISO[] = [];

  constructor(
    public fb: FormBuilder,
    public operationalPlanService: OperationalPlanService

  ) {
  }

  ngOnInit(): void {
    this.inputTypes = getInputTypes();
  }
  ngOnChanges(changes: SimpleChanges): void {
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

  onchangeEvents(event: any, formItem: any) {
    this.formOnchangeEvent.emit({ formItem, formValue: this.form.controls[formItem.key].value });
  }

  filterPortLocations(event) {
    this.operationalPlanService.filterPortLocations(event.query).subscribe((data) => {
      this.portLocations = data;
    });
  }

}
