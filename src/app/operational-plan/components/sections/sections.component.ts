import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '@kognifai/poseidon-message-service';
import { ConfirmationService } from 'primeng/api';
import { Section } from 'src/app/models/Section';
import { PrepareInstallationService } from 'src/app/services/prepare-installation.service';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss']
})
export class SectionsComponent implements OnInit {

  public section: any;
  public sectionList: Section[];
  @Output() nextActiveTab: EventEmitter<any> = new EventEmitter();
  constructor( private prepareInstallationService: PrepareInstallationService,
               private router: Router,
               private confirmationService: ConfirmationService,
               private messageService: MessageService) { }

  ngOnInit() {
    console.log(this.prepareInstallationService.installation);
  }

  onSectionAdded(newSection: Section) {
    console.log(this.sectionList);
    this.sectionList.push(newSection);

  }

  onSectionEdited(editedSection: Section) {
    console.log(this.sectionList);
    let sectionRow =  this.sectionList.find((x) => x.id === editedSection.id);
    sectionRow = editedSection;
  }

  cancel() {
    this.router.navigateByUrl('/operational-plan');
  }

  next(): void {
    this.nextActiveTab.emit(3);
    this.router.navigateByUrl('/operational-plan/prepare-installation/fouling-state/' + this.prepareInstallationService.installation.id);
  }

}
