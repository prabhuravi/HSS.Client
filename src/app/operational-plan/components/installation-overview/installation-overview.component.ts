import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/components/table/table';
import { take } from 'rxjs/operators';
import { EntitlementsQueryService } from '@kognifai/poseidon-ng-entitlements-query-service';
import { AppConstants, HSSRoleEnum } from 'src/app/app.constants';
import { Installation, InstallationStatus } from 'src/app/models/Installation';
import { FromBuilderService } from 'src/app/services/from-builder-service';
import { InstallationService } from 'src/app/services/installation.service';

@Component({
  selector: 'app-installation-overview',
  templateUrl: './installation-overview.component.html',
  styleUrls: ['./installation-overview.component.scss']
})
export class InstallationOverviewComponent implements OnInit {

  installationList: Installation[] = [];
  PRIMENG_CONSTANTS = AppConstants.PRIMENG_CONSTANTS;
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
    private entitlementsQueryService: EntitlementsQueryService,
    private confirmationService: ConfirmationService,
    private formBuliderService: FromBuilderService) { }

  ngOnInit() {
    this.isDataLoading = true;
    this.installationService.getInstallationOverviewData().pipe(take(1)).subscribe(async (data) => {
      console.log(data);
      this.installationList = data[0];
      this.installationStatus = data[1];
      this.foulingStatus = data[2];
      console.log(this.installationList);

      this.cols = [{ field: 'displayName', header: 'Name', sortfield: 'displayName', filterMatchMode: 'contains' },
      { field: 'foulingState.State', header: 'Fouling State', sortfield: 'foulingState.State', filterMatchMode: 'equals', options: this.foulingStatus, optionLabel: 'State' },
      { field: 'installationStatus.name', header: 'Installation Status', sortfield: 'installationStatus.name', filterMatchMode: 'equals', options: this.installationStatus, optionLabel: 'name' },
      { field: 'operation.OperationStatus.Name', header: 'Status', sortfield: 'operation.OperationStatus.Name', filterMatchMode: 'contains' },
      { field: 'operation.Date', header: 'Date', sortfield: 'operation.Date' },
      { field: 'aisData.destination', header: 'Port', sortfield: 'aisData.destination', filterMatchMode: 'contains' },
      { field: 'node.status', header: 'Connectivity Status', sortfield: 'node.status', filterMatchMode: 'equals', options: this.statuses, optionLabel: 'value' },
      { field: 'aisData.eta', header: 'ETA', sortfield: 'aisData.eta' },
      { field: 'CurrentPosition', header: 'Current Position' },
      { field: '', header: '' }];

      this.isDataLoading = false;
    });

    this.entitlementsQueryService.getCurrentUserEntitlements().then((entitlements: any[]) => {
      console.log(entitlements);
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
    console.log(installation);
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
