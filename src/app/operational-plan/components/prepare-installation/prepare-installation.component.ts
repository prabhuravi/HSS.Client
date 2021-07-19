import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrepareInstallationService } from 'src/app/services/prepare-installation.service';
import { ContactComponent } from '../contact/contact.component';
import { CreateDocumentsComponent } from '../create-documents/create-documents.component';
import { FoulingStateComponent } from '../fouling-state/fouling-state.component';
import { CreateInstallationComponent } from '../installation-information/create-installation/create-installation.component';
import { SectionsComponent } from '../sections/sections.component';
import { TradeRouteComponent } from '../trade-route/trade-route.component';

@Component({
  selector: 'app-prepare-installation',
  templateUrl: './prepare-installation.component.html',
  styleUrls: ['./prepare-installation.component.scss']
})
export class PrepareInstallationComponent implements OnInit, OnDestroy {
  constructor(private prepareInstallationService: PrepareInstallationService, private route: ActivatedRoute) { }

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
    if (componentReference instanceof CreateInstallationComponent)
      this.activeTab = 0;
    else if (componentReference instanceof TradeRouteComponent)
      this.activeTab = 1;
    else if (componentReference instanceof SectionsComponent)
      this.activeTab = 2;
    else if (componentReference instanceof FoulingStateComponent)
      this.activeTab = 3;
    else if (componentReference instanceof CreateDocumentsComponent)
      this.activeTab = 4;
    else if (componentReference instanceof ContactComponent)
      this.activeTab = 5;
  }
  
  ngOnDestroy(): void {
    this.prepareInstallationService.updateInstallationDetail(null);
  }
}
