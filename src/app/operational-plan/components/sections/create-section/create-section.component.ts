import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from '@kognifai/poseidon-message-service';
import { ConfirmationService } from 'primeng/api';
import { take } from 'rxjs/operators';
import { FormType } from 'src/app/app.constants';
import { SectionAdapter } from 'src/app/models/modelAdapter';
import { VesselSection, SectionStatus } from 'src/app/models/Section';
import { FromBuilderService } from 'src/app/services/from-builder-service';
import { SectionService } from 'src/app/services/section.service';

@Component({
  selector: 'app-create-section',
  templateUrl: './create-section.component.html',
  styleUrls: ['./create-section.component.scss']
})
export class CreateSectionComponent implements OnInit {
  @Input() vesselSection: VesselSection;
  @Output() sectionUpdated: EventEmitter<any> = new EventEmitter<any>();
  Sections: VesselSection[] = [];
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

  sectionEditInit(sectionData: any): void {
    this.editMode = true;
    this.vesselSection = sectionData;
    console.log(this.Sections.find((x) => x.id === sectionData.id));
    this.formData.controls.name.setValue(this.Sections.find((x) => x.id === sectionData.id));
    this.formData.controls.sectionStatus.setValue(sectionData.sectionStatus);
  }

  formOnchangeEvent(changedItem: any): void {

  }
  onFormReset(): void {
    this.formData.reset();
    this.editMode = false;
  }

  addNewSection(): void {
    const newSection = this.sectionAdapter.adapt(this.formData.value);
    newSection.name = this.formData.controls.name.value.name;
    newSection.id = Math.floor(Math.random() * 999999) + 1;
    this.sectionUpdated.emit(newSection);
  }

  saveSection(): void {
    const formValue = this.formData.value;
    console.log(formValue.name.value);
    this.vesselSection.name = formValue.name.value.name;
    this.vesselSection.sectionStatus = formValue.sectionStatus;
    this.sectionUpdated.emit(this.vesselSection);
  }

}
