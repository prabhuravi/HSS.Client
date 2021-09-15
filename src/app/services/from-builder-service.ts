/*
 * KONGSBERG PROPRIETARY. This document and its accompanying elements, contain KONGSBERG information which is proprietary and confidential.
Any disclosure, copying, distribution or use is prohibited if not otherwise explicitly agreed with KONGSBERG in writing.
Any authorized reproduction, in whole or in part, must include this legend. © [year of creation] KONGSBERG – All rights reserved.
 */
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FromBuilderService {
  ipAddressPattern = '(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)';
  phoneNumberPattern = '[- +()0-9]+';
  constructor(  public fb: FormBuilder) { }

  buildForm(config: any) {
    if (!config || !config.formList || config.formList.length === 0) {
      return;
    }
    const group = this.fb.group({});
    config.formList.forEach((control) => {

           group.addControl(control.key, this.fb.control({ value: control.value, disabled: control.disabled }, control.validators));
    });
    return group;
  }
}
