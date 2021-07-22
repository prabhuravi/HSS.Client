import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { Operation } from 'src/app/models/Operation';
import { OperationalPlanService } from 'src/app/services/operational-plan.service';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-operator-log',
  templateUrl: './operator-log.component.html',
  styleUrls: ['./operator-log.component.scss']
})
export class OperatorLogComponent implements OnInit {

  @Input() operation: Operation;
  operatorNote: string;
  @ViewChild('fileInput', null)
  fileInput: ElementRef;
  file: File;
  operatorLogs: IOperatorLog[] = [];
  operatorLogLoading = false;

  constructor(private operationalPlanService: OperationalPlanService, private messageService: MessageService) { }

  ngOnInit() {
    console.log(this.operation);
    this.operatorLogLoading = true;
    this.operationalPlanService.getGetOperatorLogs(this.operation.Id).pipe(take(1)).subscribe((data) => {
      this.operatorLogLoading = false;
      this.operatorLogs = data;
      console.log(this.operatorLogs);
    });
  }

  addOperatorLog() {
    console.log(this.operatorNote);

    const formData: FormData = new FormData();
    formData.append('OperationId', this.operation.Id.toString());
    formData.append('Note', this.operatorNote);
    if (this.file !== undefined) {
      formData.append('File', this.file, this.file.name);
    }
    this.operatorLogLoading = true;
    this.operationalPlanService.addOperatorLog(formData).pipe(take(1)).subscribe((data) => {
      this.operatorLogLoading = false;
      this.fileInput.nativeElement.value = '';
      this.file = undefined;
      this.operatorLogs = data;
      this.operatorNote = '';
      this.triggerToast('success', 'Success Message', `Note added successfully`);
    });
  }

  incomingFile(event) {
    console.log(event);
    console.log('name ----' + event.target.files[0].name);
    this.file = event.target.files[0];
    console.log('file ----' + this.file);
  }
  downloadDocument(log: IOperatorLog) {
    console.log(log);
    this.operationalPlanService.downloadOperatorLogImage(log.Id).subscribe((response) => {
      const blob: any = new Blob([response], { type: response.type });
      console.log(response);
      fileSaver.saveAs(blob, log.FileName);
      // saveAs(blob, row.file {
      //    type: blob.type
      // });
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
