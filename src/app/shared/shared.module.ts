/*
 * KONGSBERG PROPRIETARY. This document and its accompanying elements, contain KONGSBERG information which is proprietary and confidential.
Any disclosure, copying, distribution or use is prohibited if not otherwise explicitly agreed with KONGSBERG in writing.
Any authorized reproduction, in whole or in part, must include this legend. © [year of creation] KONGSBERG – All rights reserved.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';

import { NavigationTabComponent } from './components/navigation-tab/navigation-tab.component';
import { ModalComponent } from './components/modal/modal.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { LoaderComponent } from './components/loader/loader.component';
import { RemainingTimeDirective } from './directives/remaining-time.directive';
import { NoDataComponent } from './components/no-data/no-data.component';
import { LogPipe } from './pipes/LogPipe';

@NgModule({
  declarations: [NavigationTabComponent, ModalComponent, DynamicFormComponent, LoaderComponent, RemainingTimeDirective, NoDataComponent, LogPipe],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    CalendarModule,
    DropdownModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    MultiSelectModule,
    InputTextareaModule,
    NgxIntlTelInputModule
  ],
  exports: [
    NavigationTabComponent,
    ModalComponent,
    DynamicFormComponent,
    LoaderComponent,
    RemainingTimeDirective,
    NoDataComponent,
    LogPipe
  ]
})
export class SharedModule { }
