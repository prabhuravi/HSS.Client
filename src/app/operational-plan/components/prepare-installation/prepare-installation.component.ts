import { Component, OnInit } from '@angular/core';
import { Installation } from 'src/app/models/Installation';
import { PrepareInstallationService } from 'src/app/services/prepare-installation.service';

@Component({
  selector: 'app-prepare-installation',
  templateUrl: './prepare-installation.component.html',
  styleUrls: ['./prepare-installation.component.scss']
})
export class PrepareInstallationComponent implements OnInit {
  constructor( private prepareInstallationService: PrepareInstallationService) {}

  activeTab: number = 0;
  vesselId: number = 0;

  prepareInstallationSteps: IRouteList[] = [];

  ngOnInit() {
    this.setInstallationSteps();
    this.prepareInstallationService.installationDetail.subscribe((x) => {
      this.vesselId = x.id;
      this.setInstallationSteps();
    });
  }

  private setInstallationSteps() {
    this.prepareInstallationSteps = [
      {
        label: 'Installation Information',
        route: '/operational-plan/prepare-installation/create-installation/' + this.vesselId
      },
      {
        label: 'Trade Route',
        route: '/operational-plan/prepare-installation/trade-route/' + this.vesselId
      },
      {
        label: 'Sections',
        route: '/operational-plan/prepare-installation/sections/' + this.vesselId
      },
      {
        label: 'Fouling State',
        route: '/operational-plan/prepare-installation/fouling-state/' + this.vesselId
      },
      {
        label: 'Create Documents',
        route: '/operational-plan/prepare-installation/create-documents/' + this.vesselId
      },
      {
        label: 'Create Contacts',
        route: '/operational-plan/prepare-installation/contacts/' + this.vesselId
      }
    ];
  }

  tabCliecked(i): void {
    console.log(i);
    this.activeTab = i;
  }

}
