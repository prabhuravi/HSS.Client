import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormType } from '../../../app.constants';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {

  @Input() config;
  @Output() formSubmitted: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;
  formType: FormType;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.buildForm();
  }
  buildForm() {
    const group = this.fb.group({});
    this.config.formList.forEach((control) => {
      const validatorList = [];
      control.validators.forEach((validator) => {
        validatorList.push(Validators[validator]);
      });
      group.addControl(control.key, this.fb.control(control.value, validatorList));
    });
    return group;
  }
  onSubmit(): void {
    if (this.form.valid) {
      this.formSubmitted.emit(this.form.value);
    }
  }

}
