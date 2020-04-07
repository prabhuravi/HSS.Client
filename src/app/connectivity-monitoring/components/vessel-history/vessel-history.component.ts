import { Component, OnInit, ViewChild } from '@angular/core';
import { ConnectivityMonitoringService } from 'src/app/services/connectivity-monitoring.service';
import * as d3 from 'd3';
declare var google: any;
import { GoogleChartComponent } from 'angular-google-charts';
@Component({
  selector: 'app-vessel-history',
  templateUrl: './vessel-history.component.html',
  styleUrls: ['./vessel-history.component.scss']
})


export class VesselHistoryComponent implements OnInit {
  @ViewChild('googlechart', null)
  googlechart: GoogleChartComponent;
  chart = {
    type: 'Gauge',
    data: [
      ['dBm', -50]
    ],
    options: {
      width: 200, height: 200,
      min: -110,
      max: -50,
      redFrom: -110,
      redTo: -90,
      yellowFrom: -90,
      yellowTo: -75,
      greenFrom: -75,
      greenTo: -50,
      minorTicks: 15,
    }
  };
  vesselDetails: IVesselLinks;
  presetOptions = [{
    name: 'Last Hour',
    value: 1
  }, {
    name: 'Last 2 Hours',
    value: 2
  }, {
    name: 'Last Day',
    value: 24
  }, {
    name: 'Custom',
    value: 0
  }];
  selectedPreset: any = { name: "Last Day", value: 24 };
  fromDate: Date;
  toDate: Date;
  constructor(private connectivityMonitoringService: ConnectivityMonitoringService) {

  }

  ngOnInit() {
    this.vesselDetails = this.connectivityMonitoringService.getVesselLinksByNodeNumber(12234);
    // setInterval(() => {
    //   let a = (Math.random() * (-100 - (-50)) + (-50)).toFixed(0);
    //   console.log(this.chart.data);
    //   this.chart.data=[['dBm',a]];
    // console.log(this.chart.data);
    // }, 1000)
    this.resetDate();
    this.drawChart();
  }
  resetDate() {
    this.selectedPreset = { name: "Last Day", value: 24 };
    this.toDate = new Date();
    this.fromDate = new Date();
    this.fromDate = new Date(this.fromDate.setDate(this.toDate.getDate() - 1));
  }
  onDropDownSelection() {
    console.log(this.fromDate)
    console.log(this.selectedPreset);
    this.toDate = new Date();
    this.fromDate = this.getDateFromDropDown(this.selectedPreset.value);
  }

  getDateFromDropDown(substractNumber: number): Date {
    var d = new Date();

    d.setHours(d.getHours() - substractNumber);
    return d;
  }
  drawChart() {

  }
}
