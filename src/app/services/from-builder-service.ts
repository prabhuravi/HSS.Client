import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FromBuilderService {
  ipAddressPattern = '(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)';
  constructor(  public fb: FormBuilder) { }

  buildForm(config: any) {
    if (!config || !config.formList || config.formList.length === 0) {
      return;
    }
    const group = this.fb.group({});
    config.formList.forEach((control) => {
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
}
