import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-installation-overview',
  templateUrl: './installation-overview.component.html',
  styleUrls: ['./installation-overview.component.scss']
})
export class InstallationOverviewComponent implements OnInit {

  installationList: IInstallationOverview[] = [];

  cols = [
    { field: 'Name', header: 'Name' },
    { field: 'FoulingState', header: 'Fouling State' },
    { field: 'InstallationStatus', header: 'Installation Status' },
    { field: 'Status', header: 'Status' },
    { field: 'Date', header: 'Date' },
    { field: 'Port', header: 'Port' },
    { field: 'ConnectivityStatus', header: 'ConnectivityStatus' },
    { field: 'ETA', header: 'ETA' },
    { field: 'ETB', header: 'ETB' },
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
