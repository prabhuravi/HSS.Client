import { Component, OnInit } from '@angular/core';
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
  constructor( private prepareInstallationService: PrepareInstallationService) { }

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

}
