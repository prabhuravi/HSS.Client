import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Installation } from 'src/app/models/Installation';
import { PrepareInstallationService } from 'src/app/services/prepare-installation.service';
import { FoulingStateComponent } from '../fouling-state/fouling-state.component';

@Component({
  selector: 'app-prepare-installation',
  templateUrl: './prepare-installation.component.html',
  styleUrls: ['./prepare-installation.component.scss']
})
export class PrepareInstallationComponent implements OnInit, OnDestroy {
  constructor( private prepareInstallationService: PrepareInstallationService,  private route: ActivatedRoute) {}

  activeTab: number = 0;
  vesselId: number = 0;

  prepareInstallationSteps: IRouteList[] = [];

  ngOnInit() {
    this.setInstallationSteps();
    if (!this.prepareInstallationService.installation) {
      this.prepareInstallationService.setInstallationFromRoute(this.route);
    }
    this.prepareInstallationService.installationDetail.subscribe((x) => {
      if (x) {
        this.vesselId = x.id;
      }
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
        label: 'Add Documents',
        route: '/operational-plan/prepare-installation/create-documents/' + this.vesselId
      },
      {
        label: 'Add Contacts',
        route: '/operational-plan/prepare-installation/contacts/' + this.vesselId
      }
    ];
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
  ngOnDestroy(): void {
    console.log('destory');
    this.prepareInstallationService.updateInstallationDetail(null);
  }
}
