import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';

import { NavigationTabComponent } from './components/navigation-tab/navigation-tab.component';
import { ModalComponent } from './components/modal/modal.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';

@NgModule({
  declarations: [NavigationTabComponent, ModalComponent, DynamicFormComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    CalendarModule,
    DropdownModule,
    ReactiveFormsModule
  ],
  exports: [NavigationTabComponent, ModalComponent, DynamicFormComponent]
})
export class SharedModule { }
