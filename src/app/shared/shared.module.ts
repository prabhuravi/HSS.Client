import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { NavigationTabComponent } from './components/navigation-tab/navigation-tab.component';
import { GridTableComponent } from './components/grid-table/grid-table.component';

@NgModule({
  declarations: [NavigationTabComponent, GridTableComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [NavigationTabComponent, GridTableComponent]
})
export class SharedModule { }
