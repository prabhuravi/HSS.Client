/*
 * KONGSBERG PROPRIETARY. This document and its accompanying elements, contain KONGSBERG information which is proprietary and confidential.
Any disclosure, copying, distribution or use is prohibited if not otherwise explicitly agreed with KONGSBERG in writing.
Any authorized reproduction, in whole or in part, must include this legend. © [year of creation] KONGSBERG – All rights reserved.
 */
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PrepareInstallationService } from 'src/app/services/prepare-installation.service';

@Component({
  selector: 'app-fouling-state',
  templateUrl: './fouling-state.component.html',
  styleUrls: ['./fouling-state.component.scss']
})
export class FoulingStateComponent implements OnInit {

  @Output() nextActiveTab: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router,
    private messageService: MessageService, private route: ActivatedRoute,
    private prepareInstallationService: PrepareInstallationService) { }

  ngOnInit() {
    if (!this.prepareInstallationService.installation) {
      this.prepareInstallationService.setInstallationFromRoute(this.route);
    }
  }

  cancel() {
    this.router.navigateByUrl('/operational-plan');
  }

  next(): void {
    this.router.navigateByUrl('/operational-plan/prepare-installation/create-documents/' + this.prepareInstallationService.installation.id);
  }

  anyFunction() {
    console.log('fouling state called from parent - prepare installation');
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
