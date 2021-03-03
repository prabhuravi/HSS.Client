import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { Installation } from 'src/app/models/Installation';
import { InstallationService } from 'src/app/services/installation.service';
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
  installationsDetail: Installation[] = [];
  selectedInstallation: Installation;
  installationOverview: Installation;

  constructor(private installationService: InstallationService, private prepareInstallationService: PrepareInstallationService, private route: ActivatedRoute) { }

  ngOnInit() {
    const params = this.route.snapshot.paramMap.get('vesselId');
    this.vesselId = parseInt(params, null);
    this.setInstallationSteps();

    // this.prepareInstallationService.installationDetail.subscribe((x) => {
    //   this.vesselId = x.id;
    //   this.setInstallationSteps();
    // });

    this.installationService.getinstallations().pipe(take(1)).subscribe(async (data) => {
      this.installationsDetail = data;
      console.log(this.installationsDetail);
    });

    this.installationService.getInstallationOverview(this.vesselId).pipe(take(1)).subscribe(async (data) => {
      this.installationOverview = data;
      console.log(this.installationOverview);
    });
  }

  installationChanged()
  {
    console.log(this.selectedInstallation);
  }

  private setInstallationSteps() {
    this.operationsOverviewSteps = [
      {
        label: 'Operations',
        route: '/operational-plan/operations-overview/'+ this.vesselId+'/installation-operations/' + this.vesselId
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
