
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import * as L from 'leaflet';
import { antPath } from 'leaflet-ant-path';
import { ConnectivityMonitoringModule } from '../../connectivity-monitoring.module';
import { ConnectivityMonitoringService } from 'src/app/services/connectivity-monitoring.service';
import { AISRequest } from 'src/app/models/AISRequest';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: [ './map.component.scss' ]
})
export class MapComponent implements OnInit , OnChanges{
  @Input() aisRequest: AISRequest;
  @Input()showMap:boolean
  map:any;
  constructor(private connectivityMonitoringService: ConnectivityMonitoringService){
    this.connectivityMonitoringService.getNodeNumberSubject().subscribe((nodeNumber: number) => {
      if (nodeNumber) {
        console.log("from Map component")
        console.log(nodeNumber);
        this.getAisData(this.aisRequest);
      }
    })
  }
  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
   
  }
  getAisData(aisRequest :AISRequest){
    if(this.aisRequest && this.aisRequest.NodeNumber)
    this.connectivityMonitoringService.getAISData(this.aisRequest).subscribe((data:any)=>{
      console.log(data);
      if(data.Result.length>0){
        this.plotPathonMap(data.Result);
      }
    });
  }
  plotPathonMap(latlngs){
    let path=[];
    for(var i=0;i<latlngs.length;i++){
      let point = new L.LatLng(latlngs[i].Latitude, latlngs[i].Longitude)
    //  [latlngs[i].Latitude,latlngs[i].Longitude];
      path.push(point);
    }
    antPath(path, {color: '#0000FF', weight: 5, opacity: 0.6, reverse: true,}).addTo(this.map);
   let bounds = new L.LatLngBounds(path);
    this.map.fitBounds(bounds);
 
  }
  ngOnInit() {
    this.map = L.map('map').setView([43.068661, 141.350755], 8);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    // Makerを配置
    L.marker([0, 0]).bindPopup('<b>Hello!!</b>').addTo(this.map);

    // antPolyline = L.polyline.antPath(latlngs, options);
    // antPolyline.addTo(map);
  
  }
}
