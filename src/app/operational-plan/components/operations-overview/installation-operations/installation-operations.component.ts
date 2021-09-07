/*
 * KONGSBERG PROPRIETARY. This document and its accompanying elements, contain KONGSBERG information which is proprietary and confidential.
Any disclosure, copying, distribution or use is prohibited if not otherwise explicitly agreed with KONGSBERG in writing.
Any authorized reproduction, in whole or in part, must include this legend. © [year of creation] KONGSBERG – All rights reserved.
 */
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
  @ViewChild(CreateOperationComponent, { static: false }) createOperationComponentRef: CreateOperationComponent;
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
      while (!this.createOperationComponentRef.isFormDataReady) {
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
      while (!this.createOperationComponentRef.isFormDataReady) {
        await new Promise((r) => setTimeout(r, 100));
      }
      this.createOperationComponentRef.onEditOperation(operation);
      this.isDataLoading = false;
    }, 300);
  }

  Sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  onActivate(componentReference) {
  }

  handleChange(e) {
    if (this.createOperationComponentRef.isFormDirty || this.createOperationComponentRef.secondaryListingComponent.isFormDirty) {
      this.createOperationComponentRef.isFormDirty = false;
      this.createOperationComponentRef.secondaryListingComponent.isFormDirty = false;
      this.createOperationComponentRef.onSubmit();
    }
    if (e.index === 0) {
      this.createOperationComponentRef.setSectionForOperation();
      this.createOperationComponentRef.SetSecondaryOperations();
    }
    if (e.index === 3) {
      this.OperationDocumentComponent.getOperationDocuments(this.createOperationComponentRef.operationToEdit);
    }
    if (e.index === 4) {
      this.OperationDocumentComponent.getOperationDocuments(this.createOperationComponentRef.operationToEdit);
    }
  }
  updateTabs(operation: any) {
    this.operationSectionComponent.onOperationSectionLoad(operation);
    this.operationFoulingComponent.onOperationSectionLoad(operation);
  }

}
