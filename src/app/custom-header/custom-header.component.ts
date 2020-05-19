import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-custom-header',
  templateUrl: './custom-header.component.html',
  styleUrls: ['./custom-header.component.scss']
})
export class CustomHeaderComponent implements OnInit, OnDestroy {

  constructor() { }
  UTCTIME: Date;
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
