/*
 * KONGSBERG PROPRIETARY. This document and its accompanying elements, contain KONGSBERG information which is proprietary and confidential.
Any disclosure, copying, distribution or use is prohibited if not otherwise explicitly agreed with KONGSBERG in writing.
Any authorized reproduction, in whole or in part, must include this legend. © [year of creation] KONGSBERG – All rights reserved.
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { AppConstants } from '../app.constants';

@Component({
  selector: 'app-custom-header',
  templateUrl: './custom-header.component.html',
  styleUrls: ['./custom-header.component.scss']
})
export class CustomHeaderComponent implements OnInit, OnDestroy {

  constructor() { }
  UTCTIME: Date;
  appConstants = AppConstants;
  utcTimeSubscription: Subscription;

  ngOnInit(): void {
    this.updateUTCTime();
    this.utcTimeSubscription = interval(60000).subscribe(() => {
      this.updateUTCTime();
    });
  }
  updateUTCTime(): void {
    const dateToday = new Date();
    const month = dateToday.getMonth() + 1;
    const stringDate = dateToday.getUTCFullYear().toString() + '-' + month.toString() + '-' + dateToday.getUTCDate().toString() +
      ' ' + dateToday.getUTCHours().toString() + ':' + dateToday.getUTCMinutes().toString() + ':' + dateToday.getUTCSeconds().toString();
    this.UTCTIME = new Date(Date.parse(stringDate));
  }

  ngOnDestroy(): void {
    if (this.utcTimeSubscription) {
      this.utcTimeSubscription.unsubscribe();
    }
  }

}
