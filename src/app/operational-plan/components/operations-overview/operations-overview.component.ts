import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Installation} from 'src/app/models/Installation';
import { InstallationService } from 'src/app/services/installation.service';
import { ConnectivityControlService } from 'src/app/services/connectivity-control.service';
import { AppConstants } from 'src/app/app.constants';

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
  installationsDetail: IVessel[] = [];
  selectedInstallation: IVessel;
  installationOverview: Installation;
  appConstants = AppConstants;
  showAISCard: boolean = false;
  showWhitelist: boolean = false;
  whiteListedCountries: IWhiteListedCountries[] = [];

  constructor(private installationService: InstallationService, private router: Router, private route: ActivatedRoute,
    public connectivityControlService: ConnectivityControlService) { }

  ngOnInit() {
    const params = this.route.snapshot.paramMap.get('vesselId');
    this.vesselId = parseInt(params, null);
    this.setInstallationSteps();
    this.isDataLoading = true;
    this.installationService.getPreparedInstallations().pipe(take(1)).subscribe((data) => {
      this.installationsDetail = data;
      this.selectedInstallation = this.installationsDetail.find(p => p.Id == this.vesselId);
      this.isDataLoading = false;
    });
    this.getInstallationOverview(this.vesselId);
  }

  installationChanged() {
    this.getInstallationOverview(this.selectedInstallation.Id);
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/operational-plan/operations-overview/' + this.selectedInstallation.Id]));
  }

  viewAISCard(e: any) {
    e.preventDefault();
    this.toggleShowAISCard();
  }

  toggleShowAISCard() {
    this.showAISCard = !this.showAISCard;
  }

  getInstallationOverview(vesselId: number) {
    this.isDataLoading = true;
    this.installationService.getInstallationOverview(vesselId).pipe(take(1)).subscribe(async (data) => {
      this.installationOverview = data;
      this.isDataLoading = false;
    });
  }

  showWhitelistDialog() {
    this.showWhitelist = !this.showWhitelist;
    this.isDataLoading = true;
    this.connectivityControlService.getWhiteListedCountries(this.installationOverview.id).pipe(take(1)).subscribe((data) => {
      this.isDataLoading = false;
      this.whiteListedCountries = data;
    });
  }

  private setInstallationSteps() {
    this.operationsOverviewSteps = [
      {
        label: 'Operations',
        route: '/operational-plan/operations-overview/' + this.vesselId + '/installation-operations/' + this.vesselId
      },
      {
        label: 'Document',
        route: '/operational-plan/operations-overview/' + this.vesselId + '/installation-document/' + this.vesselId
      },
      {
        label: 'Contact',
        route: '/operational-plan/operations-overview/' + this.vesselId + '/installation-contact/' + this.vesselId
      },
      {
        label: 'Trade Route',
        route: '/operational-plan/operations-overview/' + this.vesselId + '/installation-trade-route/' + this.vesselId
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
    //   });
    // }
  }

}
