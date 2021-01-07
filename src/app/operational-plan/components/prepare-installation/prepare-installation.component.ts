import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prepare-installation',
  templateUrl: './prepare-installation.component.html',
  styleUrls: ['./prepare-installation.component.scss']
})
export class PrepareInstallationComponent implements OnInit {

  prepareInstallationSteps: IRouteList[] = [
    {
      label: 'Installation Information',
      route: '/operational-plan/prepare-installation'
    },
    {
      label: 'Trade Route',
      route: '/operational-plan/prepare-installation/trade-route'
    },
    {
      label: 'Sections',
      route: '/operational-plan/prepare-installation/sections'
    },
    {
      label: 'Fouling State',
      route: '/operational-plan/prepare-installation/fouling-state'
    },
    {
      label: 'Create Documents',
      route: '/operational-plan/prepare-installation/create-documents'
    },
    {
      label: 'Create Contacts',
      route: '/operational-plan/prepare-installation/create-contacts'
    }
  ];
  constructor() { }

  ngOnInit() {
  }



}
