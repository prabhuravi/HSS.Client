import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { take } from 'rxjs/operators';
import { FormType } from 'src/app/app.constants';
import { SubSection, VesselSection } from 'src/app/models/Section';
import { FromBuilderService } from 'src/app/services/from-builder-service';
import { OperationalPlanService } from 'src/app/services/operational-plan.service';
import { PrepareInstallationService } from 'src/app/services/prepare-installation.service';
import { SectionService } from 'src/app/services/section.service';

@Component({
  selector: 'app-update-fouling-state',
  templateUrl: './update-fouling-state.component.html',
  styleUrls: ['./update-fouling-state.component.scss']
})
export class UpdateFoulingStateComponent implements OnInit {
  @Output() foulingStateUpdated: EventEmitter<any> = new EventEmitter<any>();
  editSubSection: SubSection;
  sections: VesselSection[] = [];
  subSections: SubSection[] = [];
  isDataLoading = true;
  formData: FormGroup;
  config = {
    formList: []
  };
  vesselId = 0;
  foulingStates: IFoulingState[] = [];
  overallFoulingState: string = 'Not Rated'

  constructor(
    private sectionService: SectionService,
    private prepareInstallationService: PrepareInstallationService, private operationalPlanService: OperationalPlanService,
    private formBuliderService: FromBuilderService,
    public fb: FormBuilder, public messageService: MessageService
  ) { }

  ngOnInit() {
    this.vesselId = this.prepareInstallationService.installation.id;
    this.operationalPlanService.getFoulingStates().pipe(take(1)).subscribe((data) => {
      this.foulingStates = data;
      this.isDataLoading = false;

      this.operationalPlanService.getSectionFoulingState(this.vesselId).pipe(take(1)).subscribe((data) => {
        this.sections = data;
        console.log(this.sections);
        this.isDataLoading = false;
        this.calculateVesselFoulingState();

        this.constructForm();
        this.formData = this.formBuliderService.buildForm(this.config);
      });
    });
  }

  constructForm(): void {
    this.config.formList = [
      {
        type: FormType.dropdown,
        label: 'Section',
        options: this.sections,
        // value: this.sections[0],
        key: 'sectionName',
        validators: [Validators.required],
        optionLabel: 'name',
        disabled: false
      },
      {
        type: FormType.dropdown,
        label: 'Sub Section',
        options: this.subSections,
        // value: this.foulingStates[0],
        key: 'subSectionName',
        validators: [Validators.required],
        optionLabel: 'subSectionNumber',
        disabled: false
      },
      {
        type: FormType.dropdown,
        label: 'Fouling State',
        options: this.foulingStates,
        // value: this.foulingStates[0],
        key: 'foulingState',
        validators: [Validators.required],
        optionLabel: 'State',
        disabled: false
      }
    ];
  }

  formOnchangeEvent(changedItem: any): void {
    const key = changedItem.formItem.key;
    switch (key) {
      case 'sectionName': {
        this.onSectionChanged(changedItem.formValue);
        break;
      }
      default: {
        // console.log('Form Item not found');
        break;
      }
    }
  }

  onSectionChanged(section: VesselSection) {
    if (section) {
      if (section.subSections) {
        this.config.formList[1].options = section.subSections;
      }
    }
  }

  onSubmit(): void {
    if (this.formData.valid) {
      this.updateFoulingState();
    }
  }

  onFoulingStateEdited(data: any): void {
    this.editSubSection = data.subSection;
    this.formData.controls.sectionName.setValue(this.sections.find(x => x.id == data.section.id));
    this.onSectionChanged(data.section);
    this.formData.controls.subSectionName.setValue(data.subSection);
    this.formData.controls.foulingState.setValue(this.foulingStates.find(x => x.Id == data.subSection.foulingState.Id));
  }

  onFormReset(): void {
    this.formData.reset();
  }

  updateFoulingState(): void {
    let subSection: SubSection = this.formData.value.subSectionName;
    subSection.foulingId = this.formData.value.foulingState.Id;
    // subSection.joturnFoulingId = this.editSubSection.joturnFoulingState.Id;
    subSection.joturnFoulingId = this.formData.value.subSectionName.joturnFoulingState.Id;
    // subSection.sectionStatusId = this.editSubSection.sectionStatus.id;
    subSection.sectionStatusId = this.formData.value.subSectionName.sectionStatus.id;
    subSection.foulingState = this.formData.value.foulingState;
    this.isDataLoading = true;
    console.log(subSection);
    this.operationalPlanService.updateSubSectionFoulingState(subSection.id, subSection).pipe(take(1)).subscribe((data) => {
      this.triggerToast('success', 'Success Message', `Sub Section fouling state updated successfully`);
      this.isDataLoading = false;

      console.log(this.formData.value.sectionName);
      this.operationalPlanService.reCalculateFoulingState({VesselSectionId: this.formData.value.sectionName.id, VesselId: this.formData.value.sectionName.vesselId}).pipe(take(1)).subscribe((data) => {
        this.sections = data;
        console.log(this.sections);
        this.config.formList[0].options = this.sections;
        this.isDataLoading = false;
        this.calculateVesselFoulingState();
        this.foulingStateUpdated.emit(true);
        this.onFormReset();
      });

      // this.operationalPlanService.getSectionFoulingState(this.vesselId).pipe(take(1)).subscribe((data) => {
      //   this.sections = data;
      //   this.config.formList[0].options = this.sections;
      //   this.isDataLoading = false;
      // });
      // this.foulingStateUpdated.emit(true);
    });
  }

  calculateVesselFoulingState()
  {
    if(this.sections.some(p => p.foulingState.State === 'Not Rated'))
    {
      this.overallFoulingState = 'Not Rated';
    }
    else if(this.sections.some(p => p.foulingState.State === 'Bad'))
    {
      this.overallFoulingState = 'Bad';
    }
    else if(this.sections.some(p => p.foulingState.State === 'Fair'))
    {
      this.overallFoulingState = 'Fair';
    }
    else if(this.sections.some(p => p.foulingState.State === 'Good'))
    {
      this.overallFoulingState = 'Good';
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
