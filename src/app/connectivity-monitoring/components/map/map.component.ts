import { Component, OnInit, Input, OnChanges, ViewEncapsulation, OnDestroy, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import 'Leaflet.MultiOptionsPolyline'
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
import { take } from 'rxjs/operators';
import { ConfigurationService } from '@kognifai/poseidon-ng-configurationservice';
import { Configuration } from '../../../configuration';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MapComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @Input() aisRequest: AISRequest;
  @Input() showMap: boolean;
  cusCtrl: Control;
  nodeSubject: Subscription;
  chartHandleSubscription: Subscription;
  mapItems: any = [];
  nodeNumber: number;
  vesselName: string = '';
  cachedResultFromAPI: any;
  markerClusterer: any;
  map: any;
  loading = true;
  emptyAISData = false;
  mapDayTileLayer = '';
  mapDuskTileLayer = '';
  constructor(
    private connectivityMonitoringService: ConnectivityMonitoringService,
    private themeservice: ThemeService,
    public configurationService: ConfigurationService<Configuration>
  ) {
    this.mapDayTileLayer = this.configurationService.config.apiCollection.theme.mapDayTileLayer;
    this.mapDuskTileLayer = this.configurationService.config.apiCollection.theme.mapDuskTileLayer;
    this.nodeSubject = this.connectivityMonitoringService.getNodeNumberSubject().subscribe((nodeNumber: number) => {
      if (nodeNumber) {
        this.nodeNumber = nodeNumber;
        this.getAisData(this.aisRequest);
        this.removeExistingMarkers();
      }
    });

    this.chartHandleSubscription = this.connectivityMonitoringService.getZoomChangeSubject().subscribe((chartChanges: any) => {
      if (this.cachedResultFromAPI && this.cachedResultFromAPI.length > 0) {
        const finalData = this.getFilteredBetweenMinMax(this.cachedResultFromAPI, chartChanges.x.min, chartChanges.x.max);
        if (finalData.length > 0) {
          this.removeExistingMarkers();
          this.plotPathonMap(finalData);
        }
      }
    });
  }

  ngOnInit() {
    this.map = (L as any).map('map', {
      fullscreenControl: true,
      preferCanvas: true,
      fullscreenControlOptions: {
        position: 'topleft'
      }
    }).setView([43.068661, 141.350755], 8);

    this.themeservice.getSelectedTheme().then((data: ISetting<Theme>) => {
      this.applyThemeForTiles(data.value.name);
    });

    this.themeservice.themeChanged.subscribe((changes: any) => {
      this.applyThemeForTiles(changes);
    });
  }

  getFilteredBetweenMinMax(dateList, min, max) {
    min = this.dateToUnixtime(min);
    max = this.dateToUnixtime(max);
    const dateListFiltered = dateList.filter((date) => {
      const unixtime = this.dateToUnixtime(date.TimeStamp);
      return unixtime >= min && unixtime <= max;
    });
    return dateListFiltered;
  }

  dateToUnixtime(dateString) {
    return new Date(dateString).getTime();
  }

  ngOnDestroy(): void {
    this.nodeSubject.unsubscribe();
    this.chartHandleSubscription.unsubscribe();
  }

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
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
                 <div class='lat-long-container'><span>Lat </span><span> Long </span></div>
                 </div> </div>
                `;
        });
        return containerDiv;
      }
    });
    this.map.addControl(new (Coordinates as any)({ position: 'bottomleft' }));
  }

  getAisData(aisRequest: AISRequest) {
    if (this.aisRequest && this.aisRequest.NodeNumber) {
      this.loading = true;
      this.emptyAISData = false;
      this.connectivityMonitoringService.getAISData(this.aisRequest).pipe(take(1)).subscribe((data: any) => {
        this.cachedResultFromAPI = data;
        this.loading = false;
        if (data.length > 1) {
          this.cachedResultFromAPI = data;
          this.removeExistingMarkers();
          this.plotPathonMap(data);
        } else {
          this.emptyAISData = true;
        }
      });
    }
  }

  plotPathonMap(latlngs) {
    let polylinePoints = [];
    const onlineImagePath = './assets/navigation-arrow-online.png';
    const offlineImagePath = './assets/navigation-arrow-offline.png';
    this.mapItems = [];
    this.vesselName = this.connectivityMonitoringService.getVesselNameByNodeNumber(this.nodeNumber);

    // this.markerClusterer = L.markerClusterGroup();
    this.markerClusterer = L.markerClusterGroup(
      {
        iconCreateFunction: function (cluster) {
          var childCount = cluster.getChildCount();
          // var c = ' marker-cluster';
          // if (childCount < 10) {
          //   c += '-small';
          // }
          // else if (childCount < 100) {
          //   c += '-medium';
          // }
          // else {
          //   c += '-large';
          // }
          // return new L.DivIcon({
          //   html: '<div><span>' + childCount + '</span></div>',
          //   className: 'marker-cluster' + c, iconSize: new L.Point(40, 40)
          // });
          return new L.DivIcon({
            html: '<div><span>' + childCount + '</span></div>',
            className: 'marker-cluster marker-cluster-new',
            iconSize: new L.Point(40, 40),
          });
        },
        //Disable all of the defaults:
        // spiderfyOnMaxZoom: false, showCoverageOnHover: false, zoomToBoundsOnClick: false
      }
    );

    for (let i = 0; i < latlngs.length; i++) {
      const pointA = new L.LatLng(latlngs[i].Latitude, latlngs[i].Longitude);

      polylinePoints.push([latlngs[i].Latitude, latlngs[i].Longitude]);

      const iconURL = latlngs[i].OnlineStatus === 0 ? offlineImagePath : onlineImagePath;
      const rotation = parseInt(latlngs[i].CompassOverGroundHeading.toFixed(0));

      const marker = L.marker(pointA, {
        icon: this.getIcon(iconURL),
        rotationAngle: rotation
      });
      //   var marker = L.circleMarker(pointA, {
      //     color: '#3388ff'
      // });

      this.bindMarkerEvents(marker, latlngs[i]);
      this.markerClusterer.addLayer(marker);
    }
    // const polyline = L.polyline(polylinePoints).addTo(this.map);
    const polyline = L.multiOptionsPolyline(polylinePoints, {
      multiOptions: {
        optionIdxFn: function (latLng, prevLatLng, index, allLatlngs) {
          if (latlngs[index + 1]) {
            if (latlngs[index].OnlineStatus && latlngs[index + 1].OnlineStatus)
              return 0
            else
              return 1
          }
        },
        options: [
          { color: 'green' }, { color: 'red' }
        ]
      },
      opacity: 0.75
    }).addTo(this.map);

    this.mapItems.push(polyline);

    if (latlngs.length > 0) {
      this.map.fitBounds(polyline.getBounds());
    } else {
      this.removeExistingMarkers();
    }

    if (this.markerClusterer) {
      this.map.addLayer(this.markerClusterer);
    }

    this.markerClusterer.on('clustermouseover', function (a) {
      a.layer.setOpacity(0.4);
    });
    this.markerClusterer.on('clustermouseout', function (a) {
      a.layer.setOpacity(.8);
    });
  }

  removeExistingMarkers() {
    for (let i = 0; i < this.mapItems.length; i++) {
      this.map.removeLayer(this.mapItems[i]);
    }
    if (this.markerClusterer) {
      this.markerClusterer.clearLayers();
      this.markerClusterer = null;
    }
  }

  public bindMarkerEvents(marker: any, latLong: any): void {
    marker.on('click', (e) => { this.markerClick(latLong, marker); });
  }

  public markerClick(latLong: any, marker: any): void {
    marker.bindPopup(this.generateVoyagePopup('Origin', latLong, this.vesselName), { closeButton: true, className: 'map-tooltip' });
  }

  public generateVoyagePopup(title: string, latLong: any, name: string) {
    const containerDiv = document.createElement('div');
    containerDiv.innerHTML = `<div><b>Vessel Name : ${name}</b>
    </br>
    <b>Speed : ${latLong.SpeedOverGround.toFixed(2)} Knots</b></br>
    <b>Heading : ${latLong.CompassOverGroundHeading.toFixed(2)} deg</b></br>
    <b>Date : ${new Date(latLong.TimeStamp)} </b></br>
    </div>`;
    return containerDiv;
  }

  getIcon(url) {
    const vesselNavigationIcon = L.icon({
      iconUrl: url,
      iconSize: [22, 22], // size of the icon
      iconAnchor: [10, 10], // point of the icon which will correspond to marker's location
      popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
    });
    return vesselNavigationIcon;
  }

  applyThemeForTiles(theme: string) {
    if (this.map._layers) {
      for (const key in this.map._layers) {
        if (this.map._layers[key].options && this.map._layers[key].options.id) {
          this.map.removeLayer(this.map._layers[key]);
        }
      }
    }
    if (theme === 'Dusk') {
      const CartoDBDarkMatter = L.tileLayer(this.mapDuskTileLayer, {
        subdomains: 'abcd',
        id: 'darkLayer',
        maxZoom: this.configurationService.config.apiCollection.theme.defaultZoomLevel,
        attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
      }).addTo(this.map);
    } else {
      L.tileLayer(this.mapDayTileLayer, {
        id: 'duskLayer',
        attribution: `&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors`
      }).addTo(this.map);
    }
  }
}
