import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Operation, SecondaryOperation } from 'src/app/models/Operation';
import { CreateOperationComponent } from './create-operation/create-operation.component';

@Component({
  selector: 'app-installation-operations',
  templateUrl: './installation-operations.component.html',
  styleUrls: ['./installation-operations.component.scss']
})
export class InstallationOperationsComponent implements OnInit {
  vesselId: number = 0;
  viewCreateOperation = false;
  isDataLoading = false;
  @ViewChild(CreateOperationComponent, { static: false }) createOperationComponentRef: CreateOperationComponent;
  operationsRoutes: IRouteList[] = [];
  operationalPlanMainRouteList: IRouteList[] = [
    {
      label: 'Installation',
      route: '/operational-plan'
    },
    {
      label: 'Hull Skater',
      route: '/operational-plan/HullSkater'
    },
    {
      label: 'Admin',
      route: '/operational-plan/HullSkater'
    }
  ];
  
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    const params = this.route.snapshot.paramMap.get('vesselId');
    this.vesselId = parseInt(params, null);
    console.log(this.vesselId);

    this.operationsRoutes = [ {
      label: 'Operation',
      route: '/operational-plan/operations/' + this.vesselId
    },
    {
      label: 'Sections',
      route: '/operational-plan/operations/sections/' + this.vesselId
    },
    {
      label: 'Fouling State',
      route: '/operational-plan/operations/fouling-state/' + this.vesselId
    }
    ];
  }

  showListOperation(data: boolean): void {
    this.viewCreateOperation = data;
  }

  showCreateOperation(data: boolean): void {
    console.log(this.viewCreateOperation);
    this.viewCreateOperation = data;
  }

  onOperationEdited(operation: Operation)
  {
    this.viewCreateOperation = true;
    this.isDataLoading = true;
    setTimeout(async () => {
      while(!this.createOperationComponentRef.isFormDataReady)
      {
        await new Promise(r => setTimeout(r, 100));
      }
      this.createOperationComponentRef.onEditOperation(operation);
      this.isDataLoading = false;
    }, 300);
  }

  Sleep(ms  ) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  onActivate(componentReference) {
  }

}
