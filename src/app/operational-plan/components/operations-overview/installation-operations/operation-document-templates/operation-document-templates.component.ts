import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { take } from 'rxjs/operators';
import { Template } from 'src/app/models/templateEnum';
import { ConfirmationService, MessageService } from 'primeng/api';
import { EmailServiceService } from 'src/app/services/email-service.service';

@Component({
  selector: 'app-operation-document-templates',
  templateUrl: './operation-document-templates.component.html',
  styleUrls: ['./operation-document-templates.component.scss']
})
export class OperationDocumentTemplatesComponent implements OnInit {

  @Input() displayTemplate: boolean;
  @Input() templateType: Template;
  opertionId: number;
  templateHtml: any;
  isDataLoading: boolean = false;
  constructor( private emailService: EmailServiceService, private sanitizer: DomSanitizer, private messageService: MessageService ) { }

  ngOnInit() {
  }

  getPlanProposalTemplate(operationId: number){
    this.opertionId = operationId;
    this.templateHtml = null;
    this.isDataLoading = true;
    this.emailService.getPlanProposal(operationId).subscribe((data) => {
      this.displayTemplate = true;
      this.isDataLoading = false;
      console.log(data);
      this.templateHtml = this.sanitizer.bypassSecurityTrustHtml(data);
    });
  }

  getPortRequestTemplate(operationId: number){
    this.opertionId = operationId;
    this.templateHtml = null;
    this.isDataLoading = true;
    this.emailService.getPortRequest(operationId).subscribe((data) => {
      this.displayTemplate = true;
      this.isDataLoading = false;
      console.log(data);
      this.templateHtml = this.sanitizer.bypassSecurityTrustHtml(data);
    });
  }

  onApprovalOfTemplate(){
    this.displayTemplate = false;
    if(this.templateType === Template.PlanProposal){
      this.emailService.approvePlanProposal(this.opertionId).subscribe((data) => {
        this.isDataLoading = false;
        console.log(data);
        this.triggerToast('success', 'Success Message', `Email queued for sending`);
      });
    } else{
      this.emailService.approvePortRequest(this.opertionId).subscribe((data) => {
        this.isDataLoading = false;
        console.log(data);
        this.triggerToast('success', 'Success Message', `Email queued for sending`);
      });

    }

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
