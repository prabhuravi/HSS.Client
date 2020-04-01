import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { NavigationTabComponent } from './components/navigation-tab/navigation-tab.component';
import { GridTableComponent } from './components/grid-table/grid-table.component';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [NavigationTabComponent, GridTableComponent, ModalComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [NavigationTabComponent, GridTableComponent, ModalComponent]
})
export class SharedModule { }
