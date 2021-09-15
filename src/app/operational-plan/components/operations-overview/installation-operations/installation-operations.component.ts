import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TabView } from 'primeng/tabview';
import { Operation } from 'src/app/models/Operation';
import { CreateOperationComponent } from './create-operation/create-operation.component';
import { OperationDocumentComponent } from './operation-document/operation-document.component';
import { OperationMissionsComponent } from './operation-missions/operation-missions.component';
import { OpertionFoulingComponent } from './opertion-fouling/opertion-fouling.component';
import { OpertionSectionComponent } from './opertion-section/opertion-section.component';

@Component({
  selector: 'app-installation-operations',
  templateUrl: './installation-operations.component.html',
  styleUrls: ['./installation-operations.component.scss']
})
export class InstallationOperationsComponent implements OnInit {
  vesselId: number = 0;
  index = 0;
  viewCreateOperation = false;
  isDataLoading = false;
  @ViewChild(CreateOperationComponent, { static: false }) createOperation: CreateOperationComponent;
  @ViewChild(OpertionSectionComponent, { static: false }) operationSectionComponent: OpertionSectionComponent;
  @ViewChild(OpertionFoulingComponent, { static: false }) operationFoulingComponent: OpertionFoulingComponent;
  @ViewChild(OperationDocumentComponent, { static: false }) OperationDocumentComponent: OperationDocumentComponent;
  @ViewChild(OperationMissionsComponent, { static: false }) OperationMissionComponent: OperationMissionsComponent;
  @ViewChild('tabViewElement', { static: false }) tabViewElement: TabView;

  operationsRoutes: IRouteList[] = [];
  
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    const params = this.route.snapshot.paramMap.get('vesselId');
    this.vesselId = parseInt(params, null);
    this.operationsRoutes = [{
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
    this.viewCreateOperation = data;
    this.isDataLoading = true;
    setTimeout(async () => {
      while (!this.createOperation.isFormDataReady) {
        await new Promise((r) => setTimeout(r, 100));
      }
      this.isDataLoading = false;
    }, 300);
  }

  onOperationEdited(operation: Operation) {
    this.viewCreateOperation = true;
    this.isDataLoading = true;
    this.index = 1;
    setTimeout(async () => {
      while (!this.createOperation.isFormDataReady) {
        await new Promise((r) => setTimeout(r, 100));
      }
      this.createOperation.onEditOperation(operation);
      this.isDataLoading = false;
    }, 300);
  }

  Sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  onActivate(componentReference) {
  }

  handleChange(e) {
    if (this.createOperation.isFormDirty || this.createOperation.secondaryListingComponent.isFormDirty) {
      this.createOperation.isFormDirty = false;
      this.createOperation.secondaryListingComponent.isFormDirty = false;
      this.createOperation.onSubmit();
    }
    if (e.index === 0) {
      this.createOperation.setSectionForOperation();
      this.createOperation.SetSecondaryOperations();
    }
    if (e.index === 3) {
      this.OperationDocumentComponent.getOperationDocuments(this.createOperation.operationToEdit);
    }
    if (e.index === 4) {
      this.OperationDocumentComponent.getOperationDocuments(this.createOperation.operationToEdit);
    }
  }

  updateTabs(operation: any) {
    this.operationSectionComponent.onOperationSectionLoad(operation);
    this.operationFoulingComponent.onOperationSectionLoad(operation);
  }

  sectionDeleted(operation: any) {
    this.createOperation.onEditOperation(operation);
  }

}
