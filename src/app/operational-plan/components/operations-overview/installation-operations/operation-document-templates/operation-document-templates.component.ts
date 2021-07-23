import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { MailRecipient } from 'src/app/models/mailRecipient';
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
  vesselId: number;
  templateHtml: any;
  isDataLoading: boolean = false;
  isTemplateLoading = false;
  showEditText = true;
  mailRecipients: string = '';
  mailRecipientList: MailRecipient[] = [];
  emailRegEx = /^([\w+-.%]+@[\w-.]+\.[A-Za-z]{2,4};?)+$/;
  invalidEmail = false;

  constructor(private emailService: EmailServiceService, private sanitizer: DomSanitizer, private messageService: MessageService) { }

  ngOnInit() {
  }

  getPlanProposalTemplate(operationId: number, vesselId: number) {
    this.opertionId = operationId;
    this.templateHtml = null;
    this.isTemplateLoading = true;
    this.displayTemplate = true;
    this.mailRecipientList = [];
    this.mailRecipients = '';
    this.invalidEmail = false;
    this.emailService.getPlanProposal(operationId).subscribe((htmlTemplate) => {
      this.isTemplateLoading = false;
      this.emailService.getPlanProposalMailRecipients(vesselId).subscribe((data) => {
        this.mailRecipientList = data;
        this.formatMailRecipients();
        this.templateHtml = this.sanitizer.bypassSecurityTrustHtml(this.insertEmailAddressee(htmlTemplate));
      });
    });
  }

  getPortRequestTemplate(operationId: number) {
    this.opertionId = operationId;
    this.templateHtml = null;
    this.isTemplateLoading = true;
    this.displayTemplate = true;
    this.mailRecipientList = [];
    this.mailRecipients = '';
    this.invalidEmail = false;
    this.emailService.getPortRequest(operationId).subscribe((htmlTemplate) => {
      this.isTemplateLoading = false;
      this.emailService.getPortRequestMailRecipients(operationId).subscribe((data) => {
        this.mailRecipientList = data;
        this.formatMailRecipients();
        this.templateHtml = this.sanitizer.bypassSecurityTrustHtml(this.insertEmailAddressee(htmlTemplate));
      });
    });
  }

  onEditTemplate() {
    this.templateHtml = null;
    this.isTemplateLoading = true;
    switch (this.templateType) {
      case Template.PlanProposal: {
        this.showEditText = false;
        this.emailService.getPlanProposalEditable(this.opertionId).subscribe((htmlTemplate) => {
          this.isTemplateLoading = false;
          this.templateHtml = this.sanitizer.bypassSecurityTrustHtml(this.insertEmailAddressee(htmlTemplate));
          this.templateType = Template.PlanProposalEditable
        });
        break;
      }
      case Template.PlanProposalEditable: {
        this.showEditText = true;
        this.emailService.getPlanProposal(this.opertionId).subscribe((htmlTemplate) => {
          this.isTemplateLoading = false;
          this.templateHtml = this.sanitizer.bypassSecurityTrustHtml(this.insertEmailAddressee(htmlTemplate));
          this.templateType = Template.PlanProposal
        });
        break;
      }
      case Template.PortRequest: {
        this.showEditText = false;
        this.emailService.getPortRequestEditable(this.opertionId).subscribe((htmlTemplate) => {
          this.isTemplateLoading = false;
          this.templateHtml = this.sanitizer.bypassSecurityTrustHtml(this.insertEmailAddressee(htmlTemplate));
          this.templateType = Template.PortRequestEditable
        });
        break;
      }
      case Template.PortRequestEditable: {
        this.showEditText = true;
        this.emailService.getPortRequest(this.opertionId).subscribe((htmlTemplate) => {
          this.isTemplateLoading = false;
          this.templateHtml = this.sanitizer.bypassSecurityTrustHtml(this.insertEmailAddressee(htmlTemplate));
          this.templateType = Template.PortRequest
        });
        break;
      }
    }
  }

  onApprovalOfTemplate() {
    const regexp = new RegExp(this.emailRegEx);
    if (!regexp.test(this.mailRecipients)) {
      this.invalidEmail = true;
    }
    else {
      this.displayTemplate = false;
      switch (this.templateType) {
        case (Template.PlanProposal): {
          this.emailService.approvePlanProposal(this.opertionId, { TemplateHtml: null, Recipients: this.mailRecipients }).subscribe((data) => {
            this.isDataLoading = false;
            this.triggerToast('success', 'Success Message', `Email queued for sending`);
          });
          break;
        }
        case (Template.PortRequest): {
          this.emailService.approvePortRequest(this.opertionId, { TemplateHtml: null, Recipients: this.mailRecipients }).subscribe((data) => {
            this.isDataLoading = false;
            this.triggerToast('success', 'Success Message', `Email queued for sending`);
          });
          break;
        }
        case (Template.PlanProposalEditable): {
          this.emailService.approvePlanProposalEditable(this.opertionId, { TemplateHtml: this.templateHtmlDiv.nativeElement.innerHTML, Recipients: this.mailRecipients }).subscribe((data) => {
            this.isDataLoading = false;
            this.triggerToast('success', 'Success Message', `Email queued for sending`);
          });
          break;
        }
        case (Template.PortRequestEditable): {
          this.emailService.approvePortRequestEditable(this.opertionId, { TemplateHtml: this.templateHtmlDiv.nativeElement.innerHTML, Recipients: this.mailRecipients }).subscribe((data) => {
            this.isDataLoading = false;
            this.triggerToast('success', 'Success Message', `Email queued for sending`);
          });
          break;
        }
      }
    }
  }

  insertEmailAddressee(htmlTemplate: string): string {
    if (this.mailRecipientList.length == 1)
      htmlTemplate = htmlTemplate.replace('$recipient', this.mailRecipientList[0].Name);
    else if (this.mailRecipientList.length > 1)
      htmlTemplate = htmlTemplate.replace('$recipient', 'All');
    else
      htmlTemplate = htmlTemplate.replace('$recipient', '');
    return htmlTemplate;
  }

  formatMailRecipients() {
    this.mailRecipientList.forEach(recipient => {
      if (this.mailRecipients == '')
        this.mailRecipients = this.mailRecipients + recipient.EMail;
      else
        this.mailRecipients = this.mailRecipients + '; ' + recipient.EMail;
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
