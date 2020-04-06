import { Component, OnInit } from '@angular/core';
import { ConnectivityMonitoringService } from 'src/app/services/connectivity-monitoring.service';
import * as d3 from 'd3';
@Component({
  selector: 'app-vessel-history',
  templateUrl: './vessel-history.component.html',
  styleUrls: ['./vessel-history.component.scss']
})
export class VesselHistoryComponent implements OnInit {
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

    this.resetDate();
    this.drawChart();
  }
  resetDate(){
    this.selectedPreset = { name: "Last Day", value: 24 };
    this.toDate = new Date();
    this.fromDate=new Date();
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
  drawChart(){
    
  }
}
