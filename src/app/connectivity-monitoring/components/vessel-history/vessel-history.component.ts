/*
 * KONGSBERG PROPRIETARY. This document and its accompanying elements, contain KONGSBERG information which is proprietary and confidential.
Any disclosure, copying, distribution or use is prohibited if not otherwise explicitly agreed with KONGSBERG in writing.
Any authorized reproduction, in whole or in part, must include this legend. © [year of creation] KONGSBERG – All rights reserved.
 */
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
import * as moment from 'moment';
import { AISData } from 'src/app/models/AISData';
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
    data: [['dBm', 0]],
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
  aisData: AISData = new AISData();
  cachedVesselDetails: IVesselLinks;
  VesselDataSubscription: Subscription;
  selectedVesselNodeNumber: string;
  imoNumber: number;
  viewFullChart: boolean;
  viewFullMap: boolean;
  aisCardLoading: boolean;

  currentState = 'initial';
  showMap: boolean = false;
  presetOptions = [
    //   {
    //   name: 'Last Hour',
    //   value: 1
    // }, {
    //   name: 'Last 2 Hours',
    //   value: 2
    // },
    {
      name: 'Last Day',
      value: 24
    }, {
      name: 'Last Week',
      value: 168
    }, {
      name: 'Last Two Week',
      value: 336
    }, {
      name: 'Custom',
      value: 0
    }];
  PRIMENG_CONSTANTS = AppConstants.PRIMENG_CONSTANTS;
  appConstants = AppConstants;
  noData: string = 'No Data Available';
  snmpNoData: string = 'Missing SNMP';
  noGaugeData = false;
  selectedPreset: any = { name: 'Last Day', value: 24 };
  fromDate: Date;
  toDate: Date;
  allVessels: any;
  selectedVessel: any;
  loading = true;
  showAISCard: boolean;
  nodeNumber: number;
  constructor(
    public connectivityMonitoringService: ConnectivityMonitoringService,
    public route: ActivatedRoute,
    public router: Router
  ) {
  }

  ngOnInit(): void {
    if (this.route && this.route.params) {
      this.route.params.subscribe((params) => {
        this.nodeNumber = params.nodeNumber;
        this.getVesselDetails(params.nodeNumber);
        // this.getAISLatestPosition(params.nodeNumber);
      }
      );
    }
  }

  ngOnDestroy(): void {
    if (this.VesselDataSubscription) {
      this.VesselDataSubscription.unsubscribe();
    }
  }

  getAISLatestPosition(nodeNumber: number) {
    this.aisCardLoading = true;
    this.connectivityMonitoringService.getImoNumberByNodeNumber(nodeNumber).subscribe((data: any) => {
      this.imoNumber = data;

      this.aisCardLoading = false;
      this.connectivityMonitoringService.getGetLatestAISRecord(this.imoNumber).subscribe((aisData: any) => {
        this.aisData = aisData;

        this.aisCardLoading = false;
      });
    });
  }

  viewAISCard(e)
  {
    e.preventDefault();
    this. toggleShowAISCard();
    this.getAISLatestPosition(this.nodeNumber);
  }

  toggleShowAISCard()
  {
    this.showAISCard = !this.showAISCard;
  }

  getVesselDetails(nodeNumber: number, fromDrpDownChange?: boolean): void {
    if (nodeNumber) {
      this.selectedVesselNodeNumber = nodeNumber.toString();

      // this.connectivityMonitoringService.getVesselLinksByNodeNumber(nodeNumber);

      // this.VesselDataSubscription = this.connectivityMonitoringService.getVesselSubject().pipe(take(1)).subscribe((data) => {
      //   if (data) {
      //     this.cachedVesselDetails = data;

      // if (this.cachedVesselDetails && this.cachedVesselDetails.Status === 'Down') {
      //   this.chart.data = [['dBm', 0]];
      // }
      this.allVessels = this.connectivityMonitoringService.getAllCachedResult();
      this.allVessels.filter((data1) => {
        if (data1.NodeNumber == nodeNumber) {
          this.selectedVessel = data1;
        }
      });

      this.resetDate();

      this.connectivityMonitoringService.getSnMPData(parseInt(this.selectedVesselNodeNumber)).subscribe((vesselDetails: IVesselDetails) => {
        this.vesselDetails = vesselDetails;
        this.loading = false;
        this.connectivityMonitoringService.setNodeChangeSubject(parseInt(this.selectedVesselNodeNumber));
        if (vesselDetails && vesselDetails.SignalStrength) {
          if (this.selectedVessel && this.selectedVessel.Status === 'Down') {
            this.chart.data = [['dBm', 0]];
          } else {
            this.chart.data = [['dBm', vesselDetails.SignalStrength]];
          }
          this.noGaugeData = false;
        } else {
          this.noGaugeData = true;
        }
      });

      //   }
      // });

    }

  }
  changeVesselDetails(): void {
    this.router.navigateByUrl(`/connectivity-monitoring/cacti/${this.selectedVessel.NodeNumber}`);
  }
  resetDate(): void {
    this.selectedPreset = { name: 'Last Day', value: 24 };
    this.toDate = new Date();
    this.fromDate = new Date();
    this.fromDate = new Date(this.fromDate.setDate(this.toDate.getDate() - 1));
    this.getLatencyTrendData();
  }
  filterData(): void {
    this.getLatencyTrendData();
    this.connectivityMonitoringService.setNodeChangeSubject(parseInt(this.selectedVesselNodeNumber));
  }
  updatePreset(): void {
    this.selectedPreset = {
      name: 'Custom',
      value: 0
    };
  }
  getLatencyTrendData(): void {
    const a: any = {};
    a.NodeNumber = this.selectedVesselNodeNumber;
    if (this.fromDate instanceof Date) {
      const FromDate = moment(this.fromDate).format().split('+');
      a.FromDate = `${FromDate[0]}`;
    }
    if (this.toDate instanceof Date) {
      const ToDate = moment(this.toDate).format().split('+');
      a.ToDate = `${ToDate[0]}`;
    }
    this.latencyRequest = Object.assign({}, a);
    this.aisRequest = Object.assign({}, a);
  }
  onDropDownSelection(): void {
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
