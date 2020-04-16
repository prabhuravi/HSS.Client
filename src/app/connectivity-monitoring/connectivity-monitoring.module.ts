import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ConnectivityMonitoringComponent } from './components/connectivity-monitoring/connectivity-monitoring.component';
import { Routes, RouterModule } from '@angular/router';
import { VesselHistoryComponent } from './components/vessel-history/vessel-history.component';
import { ChartComponent } from './components/chart/chart.component';
import {icon, Marker} from 'leaflet';
import { MapComponent } from './components/map/map.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { DonutChartComponent } from './components/donut/donut-chart.component';
const iconRetinaUrl = 'assets/leaflet/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/leaflet/marker-shadow.png';
const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
Marker.prototype.options.icon = iconDefault;
const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: '', component: ConnectivityMonitoringComponent, pathMatch: 'full' },
      { path: 'cacti/:nodeNumber', component: VesselHistoryComponent }
    ]
  }
];

@NgModule({
  declarations: [DashboardComponent, ConnectivityMonitoringComponent, VesselHistoryComponent,ChartComponent, MapComponent,
    DonutChartComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    TableModule,
    FormsModule,
    CalendarModule,
    DropdownModule,
    GoogleChartsModule.forRoot()
  ],
  
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  exports: [RouterModule]
})
export class ConnectivityMonitoringModule { }
