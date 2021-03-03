import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/components/table/table';
import { take } from 'rxjs/operators';

import { AppConstants } from 'src/app/app.constants';
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
    {label: 'Up', value: 'Up'},
    {label: 'Down', value: 'Down'}
  ];
  cols = [];
  constructor(private installationService: InstallationService,
              private router: Router,
              private confirmationService: ConfirmationService,
              private formBuliderService: FromBuilderService) { }

  ngOnInit() {

    this.installationService.getInstallationOverviewData().pipe(take(1)).subscribe(async (data) => {
      console.log(data);
      this.installationList = data[0];
      this.installationStatus = data[1];
      this.foulingStatus = data[2];
      console.log(this.installationList);

      this.cols = [ { field: 'displayName', header: 'Name' , sortfield: 'displayName', filterMatchMode: 'contains'  },
      { field: 'foulingState.State', header: 'Fouling State' ,  sortfield: 'foulingState.State', filterMatchMode: 'equals', options: this.foulingStatus, optionLabel: 'State'},
      { field: 'installationStatus.name', header: 'Installation Status',  sortfield: 'installationStatus.name', filterMatchMode: 'equals', options: this.installationStatus,  optionLabel: 'name' },
      { field: 'Status', header: 'Status',  sortfield: 'Status', filterMatchMode: 'contains' },
      { field: 'Date', header: 'Date' , sortfield: 'Date'},
      { field: 'aisData.destination', header: 'Port',  sortfield: 'aisData.destination', filterMatchMode: 'contains' },
      { field: 'node.status', header: 'Connectivity Status', sortfield: 'node.status', filterMatchMode: 'equals', options: this.statuses,  optionLabel: 'value' },
      { field: 'aisData.eta', header: 'ETA', sortfield: 'aisData.eta' },
      { field: 'CurrentPosition', header: 'Current Position' },
      { field: '', header: '' }];
    });
  }

  redirectToPrepareInstallation(): void {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/operational-plan/prepare-installation'])
    );
  }

  redirectToOperationsOverview(): void {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
    this.router.navigate(['/operational-plan/operations-overview'])
  );
  }

  viewAISCard(e: any,installtion: Installation)
  {
    e.preventDefault();
    this. toggleShowAISCard();
    this.currentInstallation = installtion;
  }

  toggleShowAISCard()
  {
    this.showAISCard = !this.showAISCard;
  }

}
