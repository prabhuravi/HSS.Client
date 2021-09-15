/*
 * KONGSBERG PROPRIETARY. This document and its accompanying elements, contain KONGSBERG information which is proprietary and confidential.
Any disclosure, copying, distribution or use is prohibited if not otherwise explicitly agreed with KONGSBERG in writing.
Any authorized reproduction, in whole or in part, must include this legend. © [year of creation] KONGSBERG – All rights reserved.
 */
import { Component, Input, AfterViewInit, ViewEncapsulation, SimpleChanges, OnChanges, OnDestroy } from '@angular/core';
import { ConnectivityMonitoringService } from 'src/app/services/connectivity-monitoring.service';
import * as d3 from 'd3';
import { LatencyRequest } from 'src/app/models/LatencyRequest';
import { Subscription } from 'rxjs';
import { GoogleCharts } from 'google-charts';
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

  showChart: boolean = false;
  NodeSuscription: Subscription;
  latencyChart: any;
  latencyData: any;
  currentTheme: string;
  eventListner: any;
  emptyLatencyData = false;

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
    this.emptyLatencyData = false;
    this.connectivityMonitoringService.getChartData(latencyRequest)
      .subscribe((data: any) => {
        this.showChart = true;
        this.latencyData = data;
        if(this.latencyData.length < 2)
        {
          this.emptyLatencyData = true;
        }
        try {
          google.charts.load('current', { packages: ['corechart'] });
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
    try {
      if (google) {
        let data = new google.visualization.DataTable();
        data.addColumn('datetime', 'Time');
        data.addColumn('number', 'Latency');
        data.addColumn('number', 'Signal Strength');

        this.latencyData.forEach((record) => {
          data.addRow([new Date(record.TimeStamp.toString()), record.LatencyValue, record.SignalStrength ]); // Converitng to local time zone of user
          // data.addRow([new Date(record.TimeStamp.toString().replace('T',' ').replace('Z','')), record.LatencyValue]); // UTC time
        });
        const formattershort = new google.visualization.DateFormat({formatType: 'short'});
        formattershort.format(data, 0);
        const options = {
          hAxis: {
            title: 'Time', titleTextStyle: { color: this.currentTheme === 'Dusk' ? '#fff' : '#333' },
            slantedText: true, slantedTextAngle: 80,
            textStyle: {
              color: this.currentTheme === 'Dusk' ? '#fff' : '#333'
            }

            //format: 'short'
          },
          series: [
            { targetAxisIndex: 0 },
            { targetAxisIndex: 1 }
          ],
          vAxes: {
            1: {
              title: 'Signal Strength (dBm)',
              titleTextStyle: { color: this.currentTheme === 'Dusk' ? '#fff' : '#333' },
              textStyle: {
                color: this.currentTheme === 'Dusk' ? '#fff' : '#333'
              },
              gridlines: {
                count: 10
              }
            },
            0: {
              title: 'Latency (ms)',
              titleTextStyle: { color: this.currentTheme === 'Dusk' ? '#fff' : '#333' },
              textStyle: {
                color: this.currentTheme === 'Dusk' ? '#fff' : '#333'
              },
              gridlines: {
                count: 0
              }
            }
          },
          chartArea: { left: 55, right: 55, top: 10, width: '80%', height: '70%' },
          animation: {
            startup: true, duration: 1000,
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
          // curveType: 'function',
          legend: { position: 'bottom', textStyle: { color: this.currentTheme === 'Dusk' ? '#fff' : '#333', fontSize: 16 } },
          // isStacked: 'true',
          // fill: 20,
          // 'displayExactValues': true,
          dateFormat: 'd/MM/yy hh:mm'
        };
        const container: any = document.getElementById('latency_chart');
        this.latencyChart = new google.visualization.LineChart(container);
        this.eventListner = google.visualization.events.addListener(this.latencyChart, 'ready', () => {
          let zoomLast = this.getCoords();
          const observer = new MutationObserver(() => {
            const zoomCurrent = this.getCoords();
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
        // tslint:disable-next-line:triple-equals
        if (this.latencyData.length == 0) {
          // this.latencyChart.clearChart();
          const elements = document.querySelectorAll('[id^=google-visualization-errors-all]');
          if (elements.length > 0) {
            elements[0].setAttribute('style', 'display: none;');
          }
        }
      }
    } catch (ex) {

    }
  }
  getCoords() {
    if (this.latencyChart) {
      const chartLayout = this.latencyChart.getChartLayoutInterface();
      const chartBounds = chartLayout.getChartAreaBoundingBox();

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
