import { Component, OnInit } from '@angular/core';
import { Section } from 'src/app/models/ISection';


@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss']
})
export class SectionsComponent implements OnInit {

  public section: any;
  public sectionList: Section[];
  constructor() { }

  ngOnInit() {}

}
