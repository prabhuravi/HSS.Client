import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EntitlementsQueryService } from '@kognifai/poseidon-ng-entitlements-query-service';
import { take } from 'rxjs/operators';
import { AppConstants, HSSRoleEnum } from 'src/app/app.constants';
import { Installation, InstallationStatus } from 'src/app/models/Installation';
import { InstallationService } from 'src/app/services/installation.service';

@Component({
  selector: 'app-installation-overview',
  templateUrl: './installation-overview.component.html',
  styleUrls: ['./installation-overview.component.scss']
})
export class InstallationOverviewComponent implements OnInit {

  installationList: Installation[] = [];
  PRIMENG_CONSTANTS = AppConstants.PRIMENG_CONSTANTS;
  appConstants = AppConstants;
  installationStatus: InstallationStatus[] = [];
  foulingStatus = [];
  currentInstallation: Installation;
  showAISCard: boolean = false;
  statuses = [
    { label: 'Up', value: 'Up' },
    { label: 'Down', value: 'Down' }
  ];
  cols = [];
  isDataLoading = false;
  accessPrepareInstallation = false;
  constructor(private installationService: InstallationService,
    private router: Router,
    private entitlementsQueryService: EntitlementsQueryService) { }

  ngOnInit() {
    this.isDataLoading = true;
    this.installationService.getInstallationOverviewData().pipe(take(1)).subscribe(async (data) => {
      console.log(data[0]);
      this.installationList = data[0];
      console.log(this.installationList);
      this.installationStatus = data[1];
      this.foulingStatus = data[2];

      this.cols = [{ field: 'displayName', header: 'Name', sortfield: 'displayName', filterMatchMode: 'contains' },
      { field: 'foulingState.State', header: 'Fouling State', sortfield: 'foulingState.State', filterMatchMode: 'contains', options: this.foulingStatus, optionLabel: 'State' },
      { field: 'installationStatus.name', header: 'Installation Status', sortfield: 'installationStatus.name', filterMatchMode: 'contains', options: this.installationStatus, optionLabel: 'name' },
      { field: 'operation.OperationStatus.Name', header: 'Operation Status', sortfield: 'operation.OperationStatus.Name', filterMatchMode: 'contains' },
      { field: 'operation.Date', header: 'Operation Date', sortfield: 'operation.Date' },
      { field: 'operation.PortLocation.PortName', header: 'Operation Port', sortfield: 'operation.PortLocation.PortName', filterMatchMode: 'contains' },
      { field: 'node.status', header: 'Connectivity Status', sortfield: 'node.status', filterMatchMode: 'contains', options: this.statuses, optionLabel: 'value' },
      { field: 'aisData.eta', header: 'Destn ETA', sortfield: 'aisData.eta' },
      { field: 'CurrentPosition', header: 'Current Position' },
      { field: '', header: 'Action' }];

      this.isDataLoading = false;
    });

    this.entitlementsQueryService.getCurrentUserEntitlements().then((entitlements: any[]) => {
      if (entitlements.findIndex(x => x.name == HSSRoleEnum.OperatorManager) != -1) {
        this.accessPrepareInstallation = true;
      }
      else
      {
        this.accessPrepareInstallation = false;
      }
    });

  }

  redirectToPrepareInstallation(): void {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/operational-plan/prepare-installation'])
    );
  }

  redirectToOperationsOverview(e: any, installation: Installation): void {
    e.preventDefault();
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/operational-plan/operations-overview/' + installation.id])
    );
  }

  viewAISCard(e: any, installation: Installation) {
    e.preventDefault();
    this.toggleShowAISCard();
    this.currentInstallation = installation;
  }

  toggleShowAISCard() {
    this.showAISCard = !this.showAISCard;
  }

}
