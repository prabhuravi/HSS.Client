import { Directive, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Directive({
  selector: '[appRemainingTime]'
})
export class RemainingTimeDirective implements OnInit, OnDestroy {

  @Input() data: any;
  @Input() index: number;
  @Output() updateRemainingTime = new EventEmitter();
  dateTimeInterval = interval(60000);
  dateTimeIntervalSubscription: Subscription;

  constructor() { }
  ngOnInit(): void {
    const data = {
      index: this.index,
      RemainingTime: this.dhms(this.data)
    };
    this.updateRemainingTime.emit(data);
    this.dateTimeIntervalSubscription = this.dateTimeInterval.subscribe(() => {
      data.index = this.index;
      data.RemainingTime = this.dhms(this.data);
      this.updateRemainingTime.emit(data);
    });
  }
  ngOnDestroy(): void {
    if (this.dateTimeIntervalSubscription) {
      this.dateTimeIntervalSubscription.unsubscribe();
    }
  }

  // day hours minutes seconds (dhms) calculator
  dhms(t) {
    let remainingTimeText = ``;
    const dateFuture: any = new Date(`${new Date(t)} UTC`);
    const now: any = new Date();
    // get total seconds between the times
    let delta = Math.abs(dateFuture - now) / 1000;

    // calculate (and subtract) whole days
    const days = Math.floor(delta / 86400);
    delta -= days * 86400;
    if (days !== 0) {
      remainingTimeText += `${days} Day(s) `;
    }
    // calculate (and subtract) whole hours
    const hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;
    if (hours !== 0) {
      remainingTimeText += `${hours} Hour(s) `;
    }

    // calculate (and subtract) whole minutes
    const minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;
    if (minutes !== 0) {
      remainingTimeText += `${minutes} Minute(s) `;
    }

    // what's left is seconds
    const seconds = delta % 60;  // in theory the modulus is not required
    if (days <= 0 && hours <= 0 && minutes <= 0) {
      return null;
    }
    return remainingTimeText;
  }

}
