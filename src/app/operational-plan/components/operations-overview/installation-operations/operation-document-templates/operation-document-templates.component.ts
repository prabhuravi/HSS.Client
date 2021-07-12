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

  onEditTemplate() {
    this.templateHtml = null;
    this.isDataLoading = true;
    switch(this.templateType) {
      case Template.PlanProposal:{
        document.getElementById("edit").textContent  = "Use default";
        this.emailService.getPlanProposalEditable(this.opertionId).subscribe((data) => {
          this.displayTemplate = true;
          this.isDataLoading = false;
          console.log(data);
          this.templateHtml = this.sanitizer.bypassSecurityTrustHtml(data);
          this.templateType = Template.PlanProposalEditable
        });
        break;
      }
      case Template.PlanProposalEditable:{
        document.getElementById("edit").textContent  = "Edit template";
        this.emailService.getPlanProposal(this.opertionId).subscribe((data) => {
          this.displayTemplate = true;
          this.isDataLoading = false;
          console.log(data);
          this.templateHtml = this.sanitizer.bypassSecurityTrustHtml(data);
          this.templateType = Template.PlanProposal
        });
        break;
      }
      case Template.PortRequest:{
        document.getElementById("edit").textContent  = "Use default";
        this.emailService.getPortRequestEditable(this.opertionId).subscribe((data) => {
          this.displayTemplate = true;
          this.isDataLoading = false;
          console.log(data);
          this.templateHtml = this.sanitizer.bypassSecurityTrustHtml(data);
          this.templateType = Template.PortRequestEditable
        });
        break;
      }
      case Template.PortRequestEditable:{
        document.getElementById("edit").textContent  = "Edit template";
        this.emailService.getPortRequest(this.opertionId).subscribe((data) => {
          this.displayTemplate = true;
          this.isDataLoading = false;
          console.log(data);
          this.templateHtml = this.sanitizer.bypassSecurityTrustHtml(data);
          this.templateType = Template.PortRequest
        });
        break;
      }
    }
  }

  onApprovalOfTemplate(){
    this.displayTemplate = false;
    switch(this.templateType){
      case(Template.PlanProposal || Template.PlanProposalEditable):{
        this.emailService.approvePlanProposal(this.opertionId).subscribe((data) => {
          this.isDataLoading = false;
          console.log(data);
          this.triggerToast('success', 'Success Message', `Email queued for sending`);
        });
        break;
      }
      case(Template.PortRequest || Template.PortRequestEditable):{
        this.emailService.approvePortRequest(this.opertionId).subscribe((data) => {
          this.isDataLoading = false;
          console.log(data);
          this.triggerToast('success', 'Success Message', `Email queued for sending`);
        });
        break;
      }
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
