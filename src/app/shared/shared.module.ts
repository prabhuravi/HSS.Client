import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationTabComponent } from './components/navigation-tab/navigation-tab.component';
import { Routes, RouterModule } from '@angular/router';

@NgModule({
  declarations: [NavigationTabComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [NavigationTabComponent]
})
export class SharedModule { }
