import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Installation } from 'src/app/models/Installation';
import { FoulingStateComponent } from '../fouling-state/fouling-state.component';

@Component({
  selector: 'app-prepare-installation',
  templateUrl: './prepare-installation.component.html',
  styleUrls: ['./prepare-installation.component.scss']
})
export class PrepareInstallationComponent implements OnInit {

  activeTab: number = 0;

  prepareInstallationSteps: IRouteList[] = [
    {
      label: 'Installation Information',
      route: '/operational-plan/prepare-installation/create-installation'
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
  constructor(private router: Router) { }

  ngOnInit() {
  }

  tabClicked(i): void {
    this.activeTab = i;
  }

  onActivate(componentReference) {
    if (componentReference instanceof FoulingStateComponent) {
      componentReference.anyFunction();
    }

    if (componentReference.nextActiveTab !== undefined) {
      componentReference.nextActiveTab.subscribe((data) => {
        this.activeTab = data;
        console.log(data);
      });
    }
  }

}
