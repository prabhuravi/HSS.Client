/*
 * KONGSBERG PROPRIETARY. This document and its accompanying elements, contain KONGSBERG information which is proprietary and confidential.
Any disclosure, copying, distribution or use is prohibited if not otherwise explicitly agreed with KONGSBERG in writing.
Any authorized reproduction, in whole or in part, must include this legend. © [year of creation] KONGSBERG – All rights reserved.
 */
import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { OperationalPlanService } from 'src/app/services/operational-plan.service';
import { InstallationService } from 'src/app/services/installation.service';
import { Installation } from 'src/app/models/Installation';
import { Operation } from 'src/app/models/Operation';
import { AppConstants, OperationStatusEnum } from 'src/app/app.constants';

@Component({
  selector: 'app-port-meteorology',
  templateUrl: './port-meteorology.component.html',
  styleUrls: ['./port-meteorology.component.scss']
})
export class PortMeteorologyComponent implements OnInit {
  @Input() operation: Operation;
  portMeteorology: IPortMeteorology;
  installationOverview: Installation
  portMeteorologyLoading = false;
  appConstants = AppConstants;
  constructor(private operationalPlanService: OperationalPlanService, private messageService: MessageService,
    private installationService: InstallationService) { }

  ngOnInit() {
    this.portMeteorologyLoading = true;
    this.operationalPlanService.getPortMeteorology(this.operation.Id).pipe(take(1)).subscribe((data) => {
      this.portMeteorologyLoading = false;
      this.portMeteorology = data;
      this.getInstallationOverview(this.operation.VesselId);
    });
  }

  getInstallationOverview(vesselId: number) {
    this.portMeteorologyLoading = true;
    this.installationService.getInstallationOverview(vesselId).pipe(take(1)).subscribe(async (data) => {
      this.installationOverview = data;
      this.portMeteorologyLoading = false;
    });
  }

  updateBerthDepth() {
    this.portMeteorologyLoading = true;
    this.operationalPlanService.updateBerthDepth(this.portMeteorology.Id, { BerthDepth: Number(this.portMeteorology.BerthDepth) }).pipe(take(1)).subscribe((data) => {
      this.portMeteorologyLoading = false;
      if (data) {
        this.triggerToast('success', 'Success Message', `Berth depth updated`);
      }
      else {
        this.triggerToast('error', 'Message', `Berth depth not updated`);
      }
    });
  }

  refetchPortMeteorology() {
    if (this.operation.OperationStatus.Name === OperationStatusEnum.Completed || this.operation.OperationStatus.Name === OperationStatusEnum.Aborted) {
      this.triggerToast('error', 'Message', `No weather updates available once operation is Completed or Aborted`);
      return;
    }
    if (!this.operation.ETB && !this.operation.Date) {
      this.triggerToast('error', 'Message', `Operation Date or ETB (either of two) is required for weather updates`);
      return;
    }
    if (!this.operation.PortLocation) {
      this.triggerToast('error', 'Message', `No port registered. Please register the port first`);
      return;
    }
    if (!this.operation.PortLocation.Coordinate) {
      this.triggerToast('error', 'Message', `No coordinates registered for the port. Please use Trade Route screen to register lat long first`);
      return;
    }
    this.portMeteorologyLoading = true;
    this.operationalPlanService.refetchPortMeteorology(this.operation.Id).pipe(take(1)).subscribe((data) => {
      this.portMeteorologyLoading = false;
      this.portMeteorology = data;
      if (this.portMeteorology)
        this.triggerToast('success', 'Success Message', `Meteorological data refetched`);
      else
        this.triggerToast('error', 'Message', `Some problem refetching data. Please contact admin`);
    });
  }

  triggerToast(severity: string, summary: string, detail: string): void {
    this.messageService.add(
      {
        severity,
        summary,
        detail
      });
  }

}
