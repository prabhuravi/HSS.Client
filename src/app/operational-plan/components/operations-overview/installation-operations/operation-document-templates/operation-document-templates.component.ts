import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { take } from 'rxjs/operators';
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
  templateHtml: any;
  isDataLoading: boolean;
  constructor( private emailService: EmailServiceService, private sanitizer: DomSanitizer ) { }

  ngOnInit() {
  }

  getPlanProposalTemplate(operationId: number){
    this.isDataLoading = true;
    this.emailService.getPlanProposal(operationId).subscribe((data) => {
      this.isDataLoading = false;
      console.log(data);
      this.templateHtml = this.sanitizer.bypassSecurityTrustHtml(data);
    });
  }

  getPortRequestTemplate(operationId: number){
    this.isDataLoading = true;
    this.emailService.getPortRequest(operationId).subscribe((data) => {
      this.isDataLoading = false;
      console.log(data);
      this.templateHtml = this.sanitizer.bypassSecurityTrustHtml(data);
    });
  }

  onApprovalOfTemplate(){
    this.displayTemplate = false;
    
  }

}
