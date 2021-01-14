import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fouling-state',
  templateUrl: './fouling-state.component.html',
  styleUrls: ['./fouling-state.component.scss']
})
export class FoulingStateComponent implements OnInit {

  vesselSections: any[] = [];
  selectedSection: any = null;
  foulingStates: any[] = [];
  selectedfoulingState: any = null;
  vesselFoulingStates: any[] = [];

  isDataLoading = false;
  disableActivity: boolean;
  vesselId = 0;

  cols = [
    { field: 'SectionName', sortfield: 'SectionName', header: 'Section', filterMatchMode: 'contains' },
    { field: 'FoulingState', sortfield: 'FoulingState', header: 'Fouling State', filterMatchMode: 'contains' },
    { field: 'Id', sortfield: '', header: 'Action' }
  ];

  constructor() { }

  ngOnInit() {

    this.vesselFoulingStates = [{ Id: 1, SectionId: 11, SectionName: 'Top', FoulingStateId: 22, FoulingState: 'Good'}, {Id: 2, SectionId: 111, SectionName: 'Bottom', FoulingStateId: 333, FoulingState: 'Bad'}];
    this.vesselSections = [{Id: 11, Name: 'Top'}, {Id: 111, Name: 'Bottom'}];
    this.foulingStates = [{Id: 22, Name: 'Good'}, {Id: 333, Name: 'Bad'}, {Id: 444, Name: 'Fair'}];
  }

  addFoulingState()
  {
    console.log(this.selectedSection);
    console.log(this.selectedfoulingState);
  }

  deleteFoulingState(rowData: any)
  {
    console.log(rowData);
  }

  editFoulingState(rowData: any)
  {
    console.log(rowData);
    this.selectedSection =  this.vesselSections.find(v => v.Id == rowData.SectionId);
    console.log(this.selectedSection);

    this.selectedfoulingState =  this.foulingStates.find(v => v.Id == rowData.FoulingStateId);
    console.log(this.selectedfoulingState);
  }

}
