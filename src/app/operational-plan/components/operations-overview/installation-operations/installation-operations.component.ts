import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-installation-operations',
  templateUrl: './installation-operations.component.html',
  styleUrls: ['./installation-operations.component.scss']
})
export class InstallationOperationsComponent implements OnInit {

  vesselId: number = 0;
  viewCreateOperation = false;
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    const params = this.route.snapshot.paramMap.get('vesselId');
    this.vesselId = parseInt(params, null);
    console.log('inst op VesselId: ' + this.vesselId);
    // this.redirectToListOperations();
  }

  showListOperation(data: boolean): void {
    console.log(data);
    this.viewCreateOperation = data;
  }

  showCreateOperation(data: boolean): void {
    console.log(data);
    this.viewCreateOperation = data;
  }


  redirectToCreateOperation(): void {
    this.viewCreateOperation = true;

    // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
    //   this.router.navigate(['/operational-plan/operations-overview/'+this.vesselId+'/installation-operations/'+this.vesselId+'/create-operation/'+this.vesselId])
    // );
  }

  redirectToListOperations(): void {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/operational-plan/operations-overview/'+this.vesselId+'/installation-operations/'+this.vesselId+'/list-operations/'+this.vesselId])
    );
  }

  onActivate(componentReference) {
  }

}
