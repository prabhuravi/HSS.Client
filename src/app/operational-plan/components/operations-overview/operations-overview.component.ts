import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {DialogModule} from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { take } from 'rxjs/operators';
import { AISData } from 'src/app/models/AISData';
import { Installation, InstallationAISData, VesselType } from 'src/app/models/Installation';
import { Node } from 'src/app/models/Node';
import { InstallationService } from 'src/app/services/installation.service';
import { PrepareInstallationService } from 'src/app/services/prepare-installation.service';
import { ConnectivityControlService } from 'src/app/services/connectivity-control.service';

@Component({
  selector: 'app-operations-overview',
  templateUrl: './operations-overview.component.html',
  styleUrls: ['./operations-overview.component.scss']
})
export class OperationsOverviewComponent implements OnInit {

  activeTab: number = 0;
  vesselId: number = 0;
  isDataLoading: boolean;
  operationsOverviewSteps: IRouteList[] = [];
  installationsDetail: Installation[] = [];
  selectedInstallation: Installation;
  installationOverview: Installation;
  showAISCard: boolean = false;
  showWhitelist: boolean = false;
  whiteListedCountries: IWhiteListedCountries[] = [];

  constructor(private installationService: InstallationService, private prepareInstallationService: PrepareInstallationService, private router: Router, private route: ActivatedRoute,
    public connectivityControlService: ConnectivityControlService) { }

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
      this.selectedInstallation = this.installationsDetail.find(p => p.id == this.vesselId);
      console.log(this.installationsDetail);
    });

    this.getInstallationOverview(this.vesselId);
  }

  installationChanged()
  {
    this.getInstallationOverview(this.selectedInstallation.id);
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
    this.router.navigate(['/operational-plan/operations-overview/' + this.selectedInstallation.id]));
  }

  viewAISCard(e: any)
  {
    e.preventDefault();
    this. toggleShowAISCard();
  }

  toggleShowAISCard()
  {
    this.showAISCard = !this.showAISCard;
  }

  getInstallationOverview(vesselId: number)
  {
    this.isDataLoading = true;
    this.installationService.getInstallationOverview(vesselId).pipe(take(1)).subscribe(async (data) => {
      this.installationOverview = data;
      this.isDataLoading = false;
      console.log(this.installationOverview);
    });
  }

  showWhitelistDialog() {
    this.showWhitelist = !this.showWhitelist;
    this.isDataLoading = true;
    console.log(this.installationOverview);
    this.connectivityControlService.getWhiteListedCountries(this.installationOverview.id).pipe(take(1)).subscribe((data) => {
      this.isDataLoading = false;
      this.whiteListedCountries = data;
      console.log(this.whiteListedCountries );
    });
      // this.showWhitelist = true;
  }

  private setInstallationSteps() {
    this.operationsOverviewSteps = [
      {
        label: 'Operations',
        route: '/operational-plan/operations-overview/'+ this.vesselId+'/installation-operations/' + this.vesselId
      },
      {
        label: 'Document',
        route: '/operational-plan/operations-overview/' +  this.vesselId + '/installation-document/' + this.vesselId
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
