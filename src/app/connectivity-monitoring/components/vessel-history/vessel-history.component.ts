import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ConnectivityMonitoringService } from 'src/app/services/connectivity-monitoring.service';
import { GoogleChartComponent } from 'angular-google-charts';
import { ActivatedRoute, Router } from '@angular/router';
import { IVesselDetails } from 'src/app/models/IVesselDetails';
import { LatencyRequest } from 'src/app/models/LatencyRequest';
import { AISRequest } from 'src/app/models/AISRequest';
import { AppConstants } from 'src/app/app.constants';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-vessel-history',
  templateUrl: './vessel-history.component.html',
  styleUrls: ['./vessel-history.component.scss']
})

export class VesselHistoryComponent implements OnInit, OnDestroy {
  @ViewChild('googlechart', null)
  googlechart: GoogleChartComponent;
  chart: any = {
    type: 'Gauge',
    options: {
      width: 180, height: 180,
      min: -110,
      max: -50,
      redFrom: -110,
      redTo: -90,
      yellowFrom: -90,
      yellowTo: -75,
      greenFrom: -75,
      greenTo: -50,
      minorTicks: 15
    }
  };
  latencyRequest = new LatencyRequest();
  aisRequest = new AISRequest();
  vesselDetails: IVesselDetails;
  cachedVesselDetails: IVesselLinks;
  VesselDataSubscription: Subscription;
  selectedVesselNodeNumber: string;

  currentState = 'initial';
  showMap: boolean = false;
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
  PRIMENG_CONSTANTS = AppConstants.PRIMENG_CONSTANTS;
  noData: string = 'No Data Available';
  noGaugeData = false;
  selectedPreset: any = { name: 'Last Day', value: 24 };
  fromDate: Date;
  toDate: Date;
  allVessels: any;
  selectedVessel: any;
  constructor(
    public connectivityMonitoringService: ConnectivityMonitoringService,
    public route: ActivatedRoute,
    public router: Router
  ) {
  }
  ngOnInit(): void {
    if (this.route && this.route.params) {
      this.route.params.subscribe((params) => {
        console.log(params);
        this.getVesselDetails(params.nodeNumber);
      }
      );
    }
  }
  ngOnDestroy(): void {
    if (this.VesselDataSubscription) {
      this.VesselDataSubscription.unsubscribe();
    }
  }
  getVesselDetails(nodeNumber: number, fromDrpDownChange?: boolean) {
    if (nodeNumber) {
      this.selectedVesselNodeNumber = nodeNumber.toString();

      this.connectivityMonitoringService.getVesselLinksByNodeNumber(nodeNumber);

      this.VesselDataSubscription = this.connectivityMonitoringService.getVesselSubject().pipe(take(1)).subscribe((data) => {
        if (data) {
          this.cachedVesselDetails = data;
          this.allVessels = this.connectivityMonitoringService.getAllCachedResult();
          this.allVessels.filter((data1) => {
            // tslint:disable-next-line:triple-equals
            if (data1.NodeNumber == nodeNumber) {
              this.selectedVessel = data1;
            }
          });

          this.resetDate();

          // tslint:disable-next-line:radix
          this.connectivityMonitoringService.getSnMPData(parseInt(this.selectedVesselNodeNumber)).subscribe((vesselDetails: IVesselDetails) => {
            this.vesselDetails = vesselDetails;
            // tslint:disable-next-line:radix
            this.connectivityMonitoringService.setNodeChangeSubject(parseInt(this.selectedVesselNodeNumber));
            if (vesselDetails && vesselDetails.SignalStrength) {
              this.chart.data = [['dBm', vesselDetails.SignalStrength]];
              this.noGaugeData = false;
            } else {
              this.noGaugeData = true;
            }
          });
        }

      });

    }

  }
  changeVesselDetails() {
    this.router.navigateByUrl(`/connectivity-monitoring/cacti/${this.selectedVessel.NodeNumber}`);
  }
  viewMeOnMap(lat: number, lng: number) {
    console.log(lat, lng);
  }
  resetDate() {
    this.selectedPreset = { name: 'Last Day', value: 24 };
    this.toDate = new Date();
    this.fromDate = new Date();
    this.fromDate = new Date(this.fromDate.setDate(this.toDate.getDate() - 1));
    this.getLatencyTrendData();
  }
  filterData() {
    this.getLatencyTrendData();
    // tslint:disable-next-line:radix
    this.connectivityMonitoringService.setNodeChangeSubject(parseInt(this.selectedVesselNodeNumber));
  }
  getLatencyTrendData() {
    const a: any = {};
    a.NodeNumber = this.selectedVesselNodeNumber;
    a.FromDate = this.fromDate.toISOString();
    a.ToDate = this.toDate.toISOString();
    this.latencyRequest = Object.assign({}, a);
    this.aisRequest = Object.assign({}, a);
  }
  onDropDownSelection() {
    this.toDate = new Date();
    this.fromDate = this.getDateFromDropDown(this.selectedPreset.value);
    this.getLatencyTrendData();
  }

  getDateFromDropDown(substractNumber: number): Date {
    const d = new Date();
    d.setHours(d.getHours() - substractNumber);
    return d;
  }
}
