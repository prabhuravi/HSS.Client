import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { Template } from 'src/app/models/templateEnum';
import { EmailServiceService } from 'src/app/services/email-service.service';

@Component({
  selector: 'app-operation-document-templates',
  templateUrl: './operation-document-templates.component.html',
  styleUrls: ['./operation-document-templates.component.scss']
})
export class OperationDocumentTemplatesComponent implements OnInit {

  @Input() displayTemplate: boolean;
  @Input() templateType: Template;
  @ViewChild('templateHtmlDiv', { static: false }) templateHtmlDiv: ElementRef;
  opertionId: number;
  templateHtml: any;
  isDataLoading: boolean = false;
  isTemplateLoading = false;
  showEditText = true;
  constructor( private emailService: EmailServiceService, private sanitizer: DomSanitizer, private messageService: MessageService ) { }

  ngOnInit() {
  }

  getPlanProposalTemplate(operationId: number){
    this.opertionId = operationId;
    this.templateHtml = null;
    this.isTemplateLoading = true;
    this.displayTemplate = true;
    this.emailService.getPlanProposal(operationId).subscribe((data) => {
      this.isTemplateLoading = false;
      this.templateHtml = this.sanitizer.bypassSecurityTrustHtml(data);
    });
  }

  getPortRequestTemplate(operationId: number){
    this.opertionId = operationId;
    this.templateHtml = null;
    this.isTemplateLoading = true;
    this.displayTemplate = true;
    this.emailService.getPortRequest(operationId).subscribe((data) => {
      this.isTemplateLoading = false;
      this.templateHtml = this.sanitizer.bypassSecurityTrustHtml(data);
    });
  }

  onEditTemplate() {
    this.templateHtml = null;
    this.isTemplateLoading = true;
    switch(this.templateType) {
      case Template.PlanProposal:{
        this.showEditText = false;
        this.emailService.getPlanProposalEditable(this.opertionId).subscribe((data) => {
          this.isTemplateLoading = false;
          this.templateHtml = this.sanitizer.bypassSecurityTrustHtml(data);
          this.templateType = Template.PlanProposalEditable
        });
        break;
      }
      case Template.PlanProposalEditable:{
        this.showEditText = true;
        this.emailService.getPlanProposal(this.opertionId).subscribe((data) => {
          this.isTemplateLoading = false;
          this.templateHtml = this.sanitizer.bypassSecurityTrustHtml(data);
          this.templateType = Template.PlanProposal
        });
        break;
      }
      case Template.PortRequest:{
        this.showEditText = false;
        this.emailService.getPortRequestEditable(this.opertionId).subscribe((data) => {
          this.isTemplateLoading = false;
          this.templateHtml = this.sanitizer.bypassSecurityTrustHtml(data);
          this.templateType = Template.PortRequestEditable
        });
        break;
      }
      case Template.PortRequestEditable:{
        this.showEditText = true;
        this.emailService.getPortRequest(this.opertionId).subscribe((data) => {
          this.isTemplateLoading = false;
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
      case(Template.PlanProposal):{
        this.emailService.approvePlanProposal(this.opertionId).subscribe((data) => {
          this.isDataLoading = false;
          this.triggerToast('success', 'Success Message', `Email queued for sending`);
        });
        break;
      }
      case(Template.PortRequest):{
        this.emailService.approvePortRequest(this.opertionId).subscribe((data) => {
          this.isDataLoading = false;
          this.triggerToast('success', 'Success Message', `Email queued for sending`);
        });
        break;
      }
      case(Template.PlanProposalEditable):{
        this.emailService.approvePlanProposalEditable(this.opertionId, {TemplateHtml: this.templateHtmlDiv.nativeElement.innerHTML}).subscribe((data) => {
          this.isDataLoading = false;
          this.triggerToast('success', 'Success Message', `Email queued for sending`);
        });
        break;
      }
      case(Template.PortRequestEditable):{
        this.emailService.approvePortRequestEditable(this.opertionId, {TemplateHtml: this.templateHtmlDiv.nativeElement.innerHTML}).subscribe((data) => {
          this.isDataLoading = false;
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
