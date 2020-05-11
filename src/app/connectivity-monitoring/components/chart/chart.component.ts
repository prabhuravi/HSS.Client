import { Component, Input, ViewChild, ElementRef, AfterViewInit, ViewEncapsulation, SimpleChanges, SimpleChange, OnChanges, OnDestroy, HostListener } from '@angular/core';
import { ChartDataSet } from './data-set';
import { IDataPoint } from './data-point';
import { ConnectivityMonitoringService } from 'src/app/services/connectivity-monitoring.service';
import * as d3 from 'd3';
import { LatencyRequest } from 'src/app/models/LatencyRequest';
import { Subscription } from 'rxjs';
import { GoogleCharts } from 'google-charts';
import { ResizedEvent } from 'angular-resize-event';
import { ThemeService, Theme } from '@kognifai/poseidon-ng-theming';
import { ISetting } from '@kognifai/poseidon-settingsservice';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChartComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() chartId: string;
  @Input() latencyRequest: LatencyRequest;
  @Input() viewFullChart: boolean;

  private showChart: boolean = false;
  private NodeSuscription: Subscription;
  latencyChart: any;
  latencyData: any;
  currentTheme: string;
  eventListner:any;

  tooltipBody: any;
  ngAfterViewInit() {

    this.NodeSuscription = this.connectivityMonitoringService.getNodeNumberSubject().subscribe((nodeNumber: number) => {
      if (nodeNumber) {
        this.latencyRequest.NodeNumber = nodeNumber;

        d3.select('#' + this.chartId).remove();
        this.showChart = false;
        if (this.latencyChart) {
          this.latencyChart.clearChart();
          google.visualization.events.removeListener(this.eventListner);
        }
        this.getChartData(this.latencyRequest);
        this.themeservice.getSelectedTheme().then((data: ISetting<Theme>) => {
          this.currentTheme = data.value.name;
        });
        this.themeservice.themeChanged.subscribe((changes: any) => {
          this.currentTheme = changes;
          this.bindDataToLatencyChart();

        });

      }
    });
  }
  getChartData(latencyRequest: LatencyRequest) {
    this.connectivityMonitoringService.getChartData(latencyRequest)
      .subscribe((data: any) => {
        this.showChart = true;
        this.latencyData = data.Result;

        try {
          google.charts.load('current', { 'packages': ['corechart'] });
          google.charts.setOnLoadCallback(() => {
            this.bindDataToLatencyChart();
          });
        } catch (ex) {
          GoogleCharts.load(() => {
            this.bindDataToLatencyChart();
          });
        }




      });
  }
  constructor(private connectivityMonitoringService: ConnectivityMonitoringService, private themeservice: ThemeService) {
    // window.addEventListener('resize', this.setupChart);
  }
  ngOnDestroy(): void {
    this.NodeSuscription.unsubscribe();
    google.visualization.events.removeListener(this.eventListner);
  }

  bindDataToLatencyChart() {
    if (this.latencyChart) {
      this.latencyChart.clearChart();
    }
    if(!google){
      return;
    }
    var data = new google.visualization.DataTable();
    data.addColumn('datetime', 'Time');
    data.addColumn('number', 'Latency');
    data.addColumn('number', 'Signal Strength');

    this.latencyData.forEach(record => {
      data.addRow([new Date(record.TimeStamp.toString()), record.LatencyValue, record.SignalStrength]); // Converitng to local time zone of user
      // data.addRow([new Date(record.TimeStamp.toString().replace('T',' ').replace('Z','')), record.LatencyValue]); // UTC time
    });

    var options = {

      hAxis: {
        title: 'Time', titleTextStyle: { color: this.currentTheme === 'Dusk' ? '#fff' : '#333' },
        slantedText: true, slantedTextAngle: 80,
        textStyle: {
          color: this.currentTheme === 'Dusk' ? '#fff' : '#333'
        }
      },
      vAxis: {
        minValue: 0, title: "MilliSeconds",
        titleTextStyle: { color: this.currentTheme === 'Dusk' ? '#fff' : '#333' },
        textStyle: {
          color: this.currentTheme === 'Dusk' ? '#fff' : '#333'
        },
        gridlines: {
          count: 10
        }
      },
      chartArea: { left: 55, right: 0, top: 10, width: '80%', height: '75%' },
      animation: {
        "startup": true, duration: 1000,
        easing: 'out'
      },
      explorer: {
        actions: ['dragToZoom', 'rightClickToReset'],
        axis: 'horizontal',
        keepInBounds: true,
        maxZoomIn: 4.0
      },
      backgroundColor: {
        fill: this.currentTheme === 'Dusk' ? '#373c41' : '#fff',
        strokeWidth: 0
      },
      //   chartArea:{left:0,top:0,width:'80%',height:'100%'},
      // crosshair: { focused: { color: '#3bc', opacity: 0.8 } },
      // colors: ['#D44E41'],
      colors: ['#D44E41', '#4169E1'],
      defaultColors: ['#0000FF'],
      curveType: 'function',
      legend: { position: 'bottom', textStyle: { color: this.currentTheme === 'Dusk' ? '#fff' : '#333', fontSize: 16 } }
      // isStacked: "true",
      // fill: 20,
      // "displayExactValues": true,
    };
    let container: any = document.getElementById('latency_chart');
    this.latencyChart = new google.visualization.LineChart(container);
  this.eventListner =   google.visualization.events.addListener(this.latencyChart, 'ready', () => {
      var zoomLast = this.getCoords();
      var observer = new MutationObserver(() => {
        var zoomCurrent = this.getCoords();
        if (JSON.stringify(zoomLast) !== JSON.stringify(zoomCurrent)) {
          zoomLast = this.getCoords();
          this.connectivityMonitoringService.setZoomChangeSubject(zoomLast);
         
        }
      });
      observer.observe(container, {
        childList: true,
        subtree: true
      });
    });

    this.latencyChart.draw(data, options);
    if (this.latencyData.length == 0) {
      // this.latencyChart.clearChart();
      var elements = document.querySelectorAll('[id^=google-visualization-errors-all]');
      if (elements.length > 0) {
        elements[0].setAttribute("style", "display: none;");
      }
    }
  }
  getCoords() {
    if (this.latencyChart) {
      var chartLayout = this.latencyChart.getChartLayoutInterface();
      var chartBounds = chartLayout.getChartAreaBoundingBox();

      return {
        x: {
          min: chartLayout.getHAxisValue(chartBounds.left),
          max: chartLayout.getHAxisValue(chartBounds.width + chartBounds.left)
        },
        y: {
          min: chartLayout.getVAxisValue(chartBounds.top),
          max: chartLayout.getVAxisValue(chartBounds.height + chartBounds.top)
        }
      };
    }

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.viewFullChart) {
      if (this.latencyChart) {
        google.visualization.events.removeListener(this.eventListner);
        this.latencyChart.clearChart();
      }
      setTimeout(() => {
        this.bindDataToLatencyChart();
      }, 260);
    }
  }

}
