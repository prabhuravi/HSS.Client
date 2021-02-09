import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OperationalPlanService } from 'src/app/services/operational-plan.service';
import { PrepareInstallationService } from 'src/app/services/prepare-installation.service';

@Component({
  selector: 'app-fouling-state',
  templateUrl: './fouling-state.component.html',
  styleUrls: ['./fouling-state.component.scss']
})
export class FoulingStateComponent implements OnInit {

  @Output() nextActiveTab: EventEmitter<any> = new EventEmitter();
  vesselId = 0;

  constructor(private operationalPlanService: OperationalPlanService, private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private prepareInstallationService: PrepareInstallationService) { }

  ngOnInit() {
    this.vesselId = this.prepareInstallationService.installation.id;
  }

  cancel() {
    this.router.navigateByUrl('/operational-plan');
  }

  next(): void {
    this.nextActiveTab.emit(4);
    this.router.navigateByUrl('/operational-plan/prepare-installation/create-documents/' + this.vesselId);
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
