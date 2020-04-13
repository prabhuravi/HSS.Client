import { Component, OnInit, ViewChild } from '@angular/core';
import { ConnectivityMonitoringService } from 'src/app/services/connectivity-monitoring.service';
import * as d3 from 'd3';
declare var google: any;
import { GoogleChartComponent } from 'angular-google-charts';
import { ThemeService } from '@kognifai/poseidon-ng-theming';
import { ActivatedRoute } from '@angular/router';
import { IVesselDetails } from 'src/app/models/IVesselDetails';
import { LatencyRequest } from 'src/app/models/LatencyRequest';
@Component({
  selector: 'app-vessel-history',
  templateUrl: './vessel-history.component.html',
  styleUrls: ['./vessel-history.component.scss']
})


export class VesselHistoryComponent implements OnInit {
  @ViewChild('googlechart', null)
  googlechart: GoogleChartComponent;
  chart: any = {
    type: 'Gauge',
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
  latencyRequest = new LatencyRequest();
  vesselDetails: IVesselDetails;
  cachedVesselDetails: IVesselLinks;
  selectedVesselNodeNumber: string;
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
  noData: string = 'No Data Available';
  selectedPreset: any = { name: "Last Day", value: 24 };
  fromDate: Date;
  toDate: Date;
  constructor(private connectivityMonitoringService: ConnectivityMonitoringService, private themeservice: ThemeService,
    private route: ActivatedRoute) {

  }
  getVesselDetails(nodeNumber: number) {
    if (nodeNumber) {
      this.selectedVesselNodeNumber = nodeNumber.toString();
      this.connectivityMonitoringService.getVesselLinksByNodeNumber(nodeNumber);
      this.connectivityMonitoringService.setNodeChangeSubject(nodeNumber);
      this.connectivityMonitoringService.getVesselSubject().subscribe((data) => {
        if (data) {
          this.cachedVesselDetails = data;
          console.log(this.cachedVesselDetails);
          this.connectivityMonitoringService.getSnMPData(nodeNumber).subscribe((vesselDetails: IVesselDetails) => {
            this.vesselDetails = vesselDetails;
            console.log(vesselDetails);
            this.chart.data = [['dBm', vesselDetails.SignalStrength]]
          });
        }

      });

    }

  }
  ngOnInit() {
    this.themeservice.themeChanged.subscribe((changes: any) => {
      console.log(changes);
    });
    this.route.params.subscribe(params =>
      setTimeout(() => {
        this.getVesselDetails(params['nodeNumber']);
      }, 100)
    );
    this.resetDate();
    this.drawChart();
  }
  viewMeOnMap(lat: number, lng: number) {
    console.log(lat, lng);
  }
  resetDate() {
    this.selectedPreset = { name: "Last Day", value: 24 };
    this.toDate = new Date();
    this.fromDate = new Date();
    this.fromDate = new Date(this.fromDate.setDate(this.toDate.getDate() - 1));
    this.getLatencyTrendData();
  }
  filterData(){
    this.getLatencyTrendData();
    this.connectivityMonitoringService.setNodeChangeSubject(parseInt(this.selectedVesselNodeNumber));
  }
  getLatencyTrendData() {
    var a: any = {};
    a.NodeNumber = this.selectedVesselNodeNumber;
    a.FromDate = this.fromDate.toISOString();
    a.ToDate = this.toDate.toISOString();
   this.latencyRequest = Object.assign({}, a);
  }
  onDropDownSelection() {
    console.log(this.fromDate)
    console.log(this.selectedPreset);
    this.toDate = new Date();
    this.fromDate = this.getDateFromDropDown(this.selectedPreset.value);
    this.getLatencyTrendData();
  }

  getDateFromDropDown(substractNumber: number): Date {
    var d = new Date();

    d.setHours(d.getHours() - substractNumber);
    return d;
  }
  drawChart() {

  }
}
