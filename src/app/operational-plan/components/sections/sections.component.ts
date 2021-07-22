import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { VesselSection } from 'src/app/models/Section';
import { PrepareInstallationService } from 'src/app/services/prepare-installation.service';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss']
})
export class SectionsComponent implements OnInit {

  public vesselSection: any;
  public vesselSectionList: VesselSection[];
  @Output() nextActiveTab: EventEmitter<any> = new EventEmitter();
  constructor( private prepareInstallationService: PrepareInstallationService,
               private router: Router) { }

  ngOnInit() {   
  }
  cancel() {
    this.router.navigateByUrl('/operational-plan');
  }

  next(): void {
    this.router.navigateByUrl('/operational-plan/prepare-installation/fouling-state/' + this.prepareInstallationService.installation.id);
  }

}
