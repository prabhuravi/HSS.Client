import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { AppConstants } from 'src/app/app.constants';
import { Section } from 'src/app/models/ISection';
import { FromBuilderService } from 'src/app/services/from-builder-service';

@Component({
  selector: 'app-listing-section',
  templateUrl: './listing-section.component.html',
  styleUrls: ['./listing-section.component.scss']
})
export class ListingSectionComponent implements OnInit {

  constructor(private formBuliderService: FromBuilderService,
              private confirmationService: ConfirmationService,
              public fb: FormBuilder) { }

  @Input() sections: Section[];
  @Input() section: any;
  @Output() sectionOnEdit: EventEmitter<any> = new EventEmitter<any>();
  clonedSections: { [s: string]: Section; } = {};
  sectionRow: any;
  sectionStatusSelceted: any = {
    key: 0,
    name: 'Active'
  };
  public statusList = [
    {
      key: 0,
      name: 'Active'

    },
    {
      key: 1,
      name: 'Obsloute'
    }
  ];

  PRIMENG_CONSTANTS = AppConstants.PRIMENG_CONSTANTS;

  cols = [
    { field: 'Section', header: 'Section' },
    { field: 'SubSection', header: 'Sub-Section' },
    { field: 'Status', header: 'Status' },
    { field: 'Action', header: 'Action' }

  ];

  ngOnInit() {

    this.sections = [
      {
        id: 1,
        name: 'PortFront',
        status: 'Active',
        selected: false,
        subSections: [
          {
            id: 1,
            sectionId: 1,
            name: 'A',
            status: 'Active'
          },
          {
            id: 2,
            sectionId: 1,
            name: 'B',
            status: 'Active'
          },
          {
            id: 3,
            sectionId: 1,
            name: 'C',
            status: 'Active'
          }

        ]
      },
      {
        id: 2,
        name: 'PortMid',
        status: 'Active',
        selected: false,
        subSections: [
          {
            id: 1,
            sectionId: 2,
            name: 'A',
            status: 'Active'
          },
          {
            id: 2,
            sectionId: 2,
            name: 'A',
            status: 'Active'
          },
          {
            id: 3,
            sectionId: 2,
            name: 'A',
            status: 'Active'
          }
        ]
      }
    ];
  }

  onRowEditInit(rowData: Section): void {
    console.log(rowData);
    this.section = rowData;
    this.sectionOnEdit.emit(rowData);
    rowData.selected = true;
    this.clonedSections[rowData.id] = rowData;
  }

  onRowEdit(sectionData: any): void {
    let rowData = this.sections.find( (x) => x.id ===  sectionData.id);
    rowData = sectionData;

  }
}
