import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { getInputTypes } from '../../../app.constants';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit, OnChanges {

  @Input() config: any;
  @Input() formValues: any;
  @Output() formSubmitted: EventEmitter<any> = new EventEmitter<any>();
  inputTypes: any;
  form: FormGroup;
  isFormSubmitted = false;

  constructor(
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.inputTypes = getInputTypes();
    this.form = this.buildForm();
  }
  ngOnChanges(): void {
    if (this.formValues !== null && this.formValues !== undefined) {
      this.form.patchValue(this.formValues);
    }
  }
  buildForm() {
    const group = this.fb.group({});
    this.config.formList.forEach((control) => {
      const validatorList = [];
      control.validators.forEach((validator) => {
        switch (validator) {
          case 'required':
            validatorList.push(Validators.required);
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
    console.log(this.form.errors);
    this.isFormSubmitted = true;
    if (this.form.valid) {
      this.formSubmitted.emit(this.form.value);
    }
  }

}
