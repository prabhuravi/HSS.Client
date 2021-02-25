import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-installation-operations',
  templateUrl: './installation-operations.component.html',
  styleUrls: ['./installation-operations.component.scss']
})
export class InstallationOperationsComponent implements OnInit {

  vesselId: number = 0;
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    const params = this.route.snapshot.paramMap.get('vesselId');
    this.vesselId = parseInt(params, null);

    // this.redirectToListOperations();
  }

  redirectToCreateOperation(): void {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/operational-plan/operations-overview/'+this.vesselId+'/installation-operations/'+this.vesselId+'/create-operation/'+this.vesselId])
    );
  }

  redirectToListOperations(): void {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/operational-plan/operations-overview/'+this.vesselId+'/installation-operations/'+this.vesselId+'/list-operations/'+this.vesselId])
    );
  }

  onActivate(componentReference) {
  }

}
