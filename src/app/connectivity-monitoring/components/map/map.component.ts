
import { Component, OnInit, Input, OnChanges, ViewEncapsulation, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import { antPath } from 'leaflet-ant-path';
import { ConnectivityMonitoringModule } from '../../connectivity-monitoring.module';
import { ConnectivityMonitoringService } from 'src/app/services/connectivity-monitoring.service';
import { AISRequest } from 'src/app/models/AISRequest';
import { Control, DomUtil } from 'leaflet';
import { MapUtility } from './map.utility';
import 'leaflet-rotatedmarker';
import 'leaflet-fullscreen';
import 'leaflet.markercluster';
import { ThemeService, Theme } from '@kognifai/poseidon-ng-theming';
import { ISetting } from '@kognifai/poseidon-settingsservice';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MapComponent implements OnInit, OnChanges,OnDestroy {
  @Input() aisRequest: AISRequest;
  @Input() showMap: boolean
  cusCtrl: Control;
  nodeSubject:Subscription;
  markers: any= [];
  nodeNumber:number;
  markerClusterer:any;
  map: any;
  constructor(private connectivityMonitoringService: ConnectivityMonitoringService, private themeservice: ThemeService) {
   this.nodeSubject =  this.connectivityMonitoringService.getNodeNumberSubject().subscribe((nodeNumber: number) => {
      if (nodeNumber) {
        this.nodeNumber = nodeNumber;
        this.getAisData(this.aisRequest);
        this.removeExistingMarkers();
      }
    })
  }
  ngOnDestroy(): void {
    this.nodeSubject.unsubscribe();
  }
  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {

  }
  ngAfterViewInit(): void {

    this.mapMouseOverInfoHandler();
  }

  mapMouseOverInfoHandler(): void {
    const Coordinates = Control.extend({
      onAdd: (map) => {
        const containerDiv = DomUtil.create('div');
        map.addEventListener('mousemove', (e) => {
          const lat: number = parseFloat(e.latlng.lat.toFixed(6));
          const lng: number = parseFloat(e.latlng.lng.toFixed(6));
          containerDiv.innerHTML = `
                <div class='lat-lng-container' ><div class='lat-lng'>
                <span>${MapUtility.ddToDms(lat, lng)}</span>
                `;
        });
        map.addEventListener('mouseout', () => {
          containerDiv.innerHTML = `
                <div class='lat-lng-container' ><div class='lat-lng'>
                <span></span>
                 <div class="lat-long-container"><span>Lat </span><span> Long </span></div>
                 </div> </div>
                `;
        });
        return containerDiv;
      }
    });
    this.map.addControl(new (Coordinates as any)({ position: 'bottomleft' }));
  }

  getAisData(aisRequest: AISRequest) {
    if (this.aisRequest && this.aisRequest.NodeNumber)
      this.connectivityMonitoringService.getAISData(this.aisRequest).subscribe((data: any) => {
        if (data.Result.length > 0) {
          this.plotPathonMap(data.Result);
        }
      });
  }
  plotPathonMap(latlngs) {
    let path = [];
    this.markerClusterer = L.markerClusterGroup();
    for (var i = 0; i < latlngs.length; i++) {
      if (latlngs[i + 1]) {
        let pointA = new L.LatLng(latlngs[i].Latitude, latlngs[i].Longitude)
        let pointB = new L.LatLng(latlngs[i + 1].Latitude, latlngs[i + 1].Longitude)
        //  [latlngs[i].Latitude,latlngs[i].Longitude];
        path.push(pointA);
        //for testing purpose 
        if (i % 2 == 0) {
          latlngs[i].OnlineStatus = 1;
        }
        var polyline = L.polyline([pointA, pointB]).addTo(this.map);
        const iconURL = latlngs[i].OnlineStatus === 0 ? './assets/navigation-arrow-offline.png' : './assets/navigation-arrow-online.png';
        let rotation = parseInt(latlngs[i].CompassOverGroundHeading.toFixed(0));
        let marker = L.marker(pointA, {
          icon: this.getIcon(iconURL),
          rotationAngle: rotation
        });
        this.bindMarkerEvents(marker, latlngs[i]);
        //adding marker to marker Array 
        this.markers.push(marker);
        this.markers.push(polyline);
        polyline.setStyle({
          color: latlngs[i].OnlineStatus === 0 ? 'red' : 'green'
        });
        this.markerClusterer.addLayer(marker);
      }
     let bounds = new L.LatLngBounds(path);
      this.map.fitBounds(bounds);
      this.map.addLayer(this.markerClusterer);
    }


  }
  createPolyLine(){

  }
  removeExistingMarkers(){
    for(var i = 0; i < this.markers.length; i++){
      this.map.removeLayer(this.markers[i]);
  }
  if(this.markerClusterer){

    this.markerClusterer.clearLayers();
    this.markerClusterer =null;
  }
  }
  public bindMarkerEvents(markerValue: any, data: any): void {
    //   markerValue.setRotationAngle(data.CompassOverGroundHeading.toFixed(0));
    markerValue.on('click', (e) => { this.markerClick(data, markerValue); });
  }
  public markerClick(vessel: any, markerValue: any): void {
    let vesselDetails = this.connectivityMonitoringService.getVesselNameByNodeNumber(this.nodeNumber);
    markerValue.bindPopup(this.generateVoyagePopup('Origin', vessel,vesselDetails), { closeButton: true, className: 'map-tooltip' });
  }
  public generateVoyagePopup(title: string, value: any,name:string) {
    const containerDiv = document.createElement('div');
    containerDiv.innerHTML = `<div><b>Vessel Name : ${name}</b> 
    </br>
    <b>Speed : ${value.SpeedOverGround.toFixed(2)} Knots</b></br>
    <b>Heading : ${value.CompassOverGroundHeading.toFixed(2)} deg</b></br>
    <b>Date : ${new Date(value.TimeStamp)} </b></br>
    </div>`;
    return containerDiv;
  }
  getIcon(url) {
    // L.divIcon({
    //   html: `<img class="leaflet-marker-icon leaflet-zoom-animated" src="${iconURL}"
    //    style="width:20px; height: 20px;transform: rotate(${rotation}deg);
    //     -webkit-transform: rotate(${rotation}deg); -moz-transform:rotate(${rotation}deg);" />`,
    //     iconSize: [20, 20], // size of the icon
    //     iconAnchor: [-10, -10], // point of the icon which will correspond to marker's location
    //     popupAnchor: [10, 0] // point from which the popup should open relative to the ico
    //   })
    const vesselNavigationIcon = L.icon({
      iconUrl: url,

      iconSize: [22, 22], // size of the icon
      iconAnchor: [10, 10], // point of the icon which will correspond to marker's location
      popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
    });
    return vesselNavigationIcon;
  }
  ngOnInit() {
    this.map = (L as any).map('map', {
      fullscreenControl: true,
      fullscreenControlOptions: {
        position: 'topleft'
      }
    }).setView([43.068661, 141.350755], 8);
    this.themeservice.getSelectedTheme().then((data:ISetting<Theme>)=>{
      this.applyThemeForTiles(data.value.name)
    });
    this.themeservice.themeChanged.subscribe((changes: any) => {
      this.applyThemeForTiles(changes);
    
    });

  }
  applyThemeForTiles(theme:string){
    if( this.map._layers){
      for (const key in this.map._layers) {
        if (this.map._layers[key].options  && this.map._layers[key].options.id) {
          this.map.removeLayer(this.map._layers[key]);
          
        }
      }
    
    }
    if (theme === 'Dusk') {
      var CartoDB_DarkMatter = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        id:'darkLayer',
        maxZoom: 19
      }).addTo(this.map);
    } else {
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        id:'duskLayer',
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);
    }
  }
}
