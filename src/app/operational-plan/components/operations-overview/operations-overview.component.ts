import { Component, OnInit } from '@angular/core';
import { PrepareInstallationService } from 'src/app/services/prepare-installation.service';

@Component({
  selector: 'app-operations-overview',
  templateUrl: './operations-overview.component.html',
  styleUrls: ['./operations-overview.component.scss']
})
export class OperationsOverviewComponent implements OnInit {

  activeTab: number = 0;
  vesselId: number = 0;
  operationsOverviewSteps: IRouteList[] = [];
  installationsDetail = [];
  selectedInstallation;

  constructor(private prepareInstallationService: PrepareInstallationService) { }

  ngOnInit() {
    this.setInstallationSteps();
    this.prepareInstallationService.installationDetail.subscribe((x) => {
      this.vesselId = x.id;
      this.setInstallationSteps();
    });
  }

  private setInstallationSteps() {
    this.operationsOverviewSteps = [
      {
        label: 'Operations',
        route: '/operational-plan/operations-overview/installation-operations/' + this.vesselId
      }
    ];
  }

  tabClicked(i): void {
    this.activeTab = i;
  }

  onActivate(componentReference) {
    // if (componentReference.nextActiveTab !== undefined) {
    //   componentReference.nextActiveTab.subscribe((data) => {
    //     this.activeTab = data;
    //     console.log(data);
    //   });
    // }
  }

}
