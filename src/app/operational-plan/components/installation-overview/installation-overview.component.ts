import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/components/table/table';
import { AppConstants } from 'src/app/app.constants';


@Component({
  selector: 'app-installation-overview',
  templateUrl: './installation-overview.component.html',
  styleUrls: ['./installation-overview.component.scss']
})
export class InstallationOverviewComponent implements OnInit {

  installationList: IInstallationOverview[] = [];
  PRIMENG_CONSTANTS = AppConstants.PRIMENG_CONSTANTS;

  cols = [
    { field: 'Name', header: 'Name' , sortfield: 'Name', filterMatchMode: 'contains'  },
    { field: 'FoulingState', header: 'Fouling State' ,  sortfield: 'FoulingState', filterMatchMode: 'contains'},
    { field: 'InstallationStatus', header: 'Installation Status',  sortfield: 'InstallationStatus', filterMatchMode: 'contains' },
    { field: 'Status', header: 'Status',  sortfield: 'Status', filterMatchMode: 'contains' },
    { field: 'Date', header: 'Date' , sortfield: 'Date'},
    { field: 'Port', header: 'Port',  sortfield: 'Port', filterMatchMode: 'contains' },
    { field: 'ConnectivityStatus', header: 'ConnectivityStatus', sortfield: 'ConnectivityStatus', filterMatchMode: 'contains' },
    { field: 'ETA', header: 'ETA', sortfield: 'ETA' },
    { field: 'ETB', header: 'ETB',  sortfield: 'ETB'},
    { field: 'CurrentPosition', header: 'CurrentPosition' }
  ];
  constructor(private router: Router) { }

  ngOnInit() {
    this.installationList = [
      {
        Name: 'Talsiman',
        FoulingState: 'Moderate',
        InstallationStatus: 'Active',
        Status: 'Active',
        Date: new Date(),
        Port: 'Oslo',
        ConnectivityStatus: 'UP',
        ETA: new Date(),
        ETB: new Date(),
        CurrentPosition: null,
        Id: 1
      },
      {
        Name: 'BergeApo',
        FoulingState: 'Moderate',
        InstallationStatus: 'Active',
        Status: 'Active',
        Date: new Date(),
        Port: 'Oslo',
        ConnectivityStatus: 'UP',
        ETA: new Date(),
        ETB: new Date(),
        CurrentPosition: null,
        Id: 1
      },
      {
        Name: 'Test',
        FoulingState: 'Moderate',
        InstallationStatus: 'Active',
        Status: 'Active',
        Date: new Date(),
        Port: 'Oslo',
        ConnectivityStatus: 'UP',
        ETA: new Date(),
        ETB: new Date(),
        CurrentPosition: null,
        Id: 1
      }
    ]
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

}
