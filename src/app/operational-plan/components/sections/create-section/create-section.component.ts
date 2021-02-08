import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from '@kognifai/poseidon-message-service';
import { ConfirmationService } from 'primeng/api';
import { take } from 'rxjs/operators';
import { FormType } from 'src/app/app.constants';
import { SectionAdapter, VesselSectionAdapter } from 'src/app/models/modelAdapter';
import { VesselSection, SectionStatus, Section } from 'src/app/models/Section';
import { FromBuilderService } from 'src/app/services/from-builder-service';
import { PrepareInstallationService } from 'src/app/services/prepare-installation.service';
import { SectionService } from 'src/app/services/section.service';

@Component({
  selector: 'app-create-section',
  templateUrl: './create-section.component.html',
  styleUrls: ['./create-section.component.scss']
})
export class CreateSectionComponent implements OnInit {
  @Input() vesselSection: VesselSection;
  @Output() sectionUpdated: EventEmitter<any> = new EventEmitter<any>();
  Sections: Section[] = [];
  isDataLoading = true;
  editMode: boolean = false;
  PrepareInstallation: boolean = false;
  formValues: any = null;
  formType = FormType;
  formData: FormGroup;
  config = {
    className: 'kx-col kx-col--12 kx-col--6@mob-m kx-col--4@tab-m kx-col--3@ltp-s',
    formList: []
  };

  sectionStatus: SectionStatus[] = [];

  constructor(
    private sectionService: SectionService,
    private sectionAdapter: SectionAdapter,
    private vesselSectionAdapter: VesselSectionAdapter,
    private prepareInstallationService: PrepareInstallationService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private formBuliderService: FromBuilderService,
    private route: ActivatedRoute,
    public fb: FormBuilder, public messageService: MessageService
  ) { }

  ngOnInit() {
    this.sectionService.getSectionInformations().pipe(take(1)).subscribe((data) => {
      console.log(data);
      this.sectionStatus = data[0];
      this.Sections = data[1];
      this.constructForm();
      this.formData = this.formBuliderService.buildForm(this.config);
      this.isDataLoading = false;
    });
  }

  constructForm(): void {
    this.config.formList = [
      {
        type: FormType.dropdown,
        label: 'Name',
        options: this.Sections,
        value: '',
        key: 'name',
        optionLabel: 'name',
        validators: [Validators.required],
        disabled: false
      },
      {
        type: FormType.dropdown,
        label: 'Status',
        options: this.sectionStatus,
        value: this.sectionStatus[0],
        key: 'sectionStatus',
        validators: [Validators.required],
        optionLabel: 'name',
        disabled: false
      }
    ];
  }

  onSubmit(): void {

    if (this.formData.valid) {
      if (this.editMode) {
        this.saveSection();
      } else {

        this.addNewSection();
      }
      this.onFormReset();
    }
  }

  sectionEditInit(sectionData: VesselSection): void {
    this.editMode = true;
    this.vesselSection = sectionData;
    console.log(this.Sections.find((x) => x.id === sectionData.sectionId));
    this.formData.controls.name.setValue(this.Sections.find((x) => x.id === sectionData.sectionId));
    this.formData.controls.sectionStatus.setValue(sectionData.sectionStatus);
    this.formData.controls.name.disable();
  }

  formOnchangeEvent(changedItem: any): void {

  }
  onFormReset(): void {
    this.formData.reset();
    this.formData.controls.sectionStatus.setValue(this.sectionStatus[0]);
    this.formData.controls.name.enable();
    this.editMode = false;
  }

  addNewSection(): void {
    const newSection = this.vesselSectionAdapter.adapt(this.formData.value);
    newSection.vesselId =  this.prepareInstallationService.installation.id;
    newSection.sectionId = this.formData.controls.name.value.id;
    newSection.sectionStatusId = this.formData.controls.sectionStatus.value.id;
    console.log(newSection);
    newSection.name = this.formData.controls.name.value.name;
    this.sectionService.CreateVesselSection(newSection).pipe(take(1)).subscribe((data) => {
      newSection.id = data.id;
      this.sectionUpdated.emit(newSection);
    });
  }

  saveSection(): void {
    const formValue = this.formData.value;
    this.vesselSection.sectionStatus = formValue.sectionStatus;
    this.sectionService.UpdateVesselSection(this.vesselSection).pipe(take(1)).subscribe((data) => {
    this.sectionUpdated.emit(this.vesselSection);
    this.onFormReset();
    this.formData.controls.name.enable();
    this.editMode = false;
    });
  }

}
