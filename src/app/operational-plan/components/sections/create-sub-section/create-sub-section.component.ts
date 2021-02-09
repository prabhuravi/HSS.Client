import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from '@kognifai/poseidon-message-service';
import { ConfirmationService } from 'primeng/api';
import { take } from 'rxjs/operators';
import { FormType } from 'src/app/app.constants';
import {  SubSectionAdapter } from 'src/app/models/modelAdapter';
import {  VesselSection, SectionStatus, SubSection } from 'src/app/models/Section';
import { FromBuilderService } from 'src/app/services/from-builder-service';
import { SectionService } from 'src/app/services/section.service';

@Component({
  selector: 'app-create-sub-section',
  templateUrl: './create-sub-section.component.html',
  styleUrls: ['./create-sub-section.component.scss']
})
export class CreateSubSectionComponent implements OnInit {
  @Output() subSectionUpdated: EventEmitter<any> = new EventEmitter<any>();
  @Output() subSectionCancelled: EventEmitter<any> = new EventEmitter<any>();

  subSection: SubSection;
  vesselSection: VesselSection;
  isDataLoading = true;
  editMode: boolean = false;
  formValues: any = null;
  formType = FormType;
  formData: FormGroup;
  config = {
    className: 'kx-col kx-col--12 kx-col--6@mob-m kx-col--4@tab-m kx-col--2@ltp-s',
    formList: []
  };

  sectionStatus: SectionStatus[] = [];

  constructor(
    private sectionService: SectionService,
    private subsectionAdapter: SubSectionAdapter,
    private router: Router,
    private confirmationService: ConfirmationService,
    private formBuliderService: FromBuilderService,
    private route: ActivatedRoute,
    public fb: FormBuilder, public messageService: MessageService
  ) { }

  ngOnInit() {
    this.sectionService.getSectionStatus().pipe(take(1)).subscribe((data) => {

      console.log(data);
      this.sectionStatus = data;
      this.constructForm();
      this.formData = this.formBuliderService.buildForm(this.config);
      this.isDataLoading = false;
    });
  }

  constructForm(): void {
    this.config.formList = [
      {
        type: FormType.text,
        label: 'Section Name',
        value: '',
        key: 'sectionName',
        validators: [Validators.required, Validators.maxLength(20)],
        disabled: true
      },
      {
        type: FormType.number,
        label: 'Number',
        value: this.subSection ? this.subSection.subSectionNumber : '',
        key: 'subSectionNumber',
        validators: [Validators.required, Validators.min(1)],
        disabled: false
      },
      {
        type: FormType.dropdown,
        label: 'Status',
        options: this.sectionStatus,
        value: this.sectionStatus[0],
        key: 'subSectionStatus',
        validators: [Validators.required],
        optionLabel: 'name',
        disabled: false
      }
    ];
  }

  onSubmit(): void {
    if (this.formData.valid) {
      if (this.editMode) {
        this.saveSubSection();
      } else {

        this.addNewSubSection();
      }
      this.onFormReset();
    }
  }

  subSectionEditInit(subSectionData: any): void {
    this.editMode = true;
    this.subSection = subSectionData.rowData;
    console.log(this.subSection);
    this.formData.controls.sectionName.setValue(subSectionData.sectionRow.name);
    this.formData.controls.subSectionNumber.setValue(this.subSection.subSectionNumber);
    this.formData.get('subSectionStatus').patchValue(this.subSection.sectionStatus);
  }

  formOnchangeEvent(changedItem: any): void {

  }
  onFormReset(): void {
    this.formData.reset();
    this.editMode = false;
    this.subSectionCancelled.emit(true);
  }

  addNewSubSection(): void {
    const newSubSection = new SubSection(0, this.vesselSection.id, this.formData.controls.subSectionStatus.value.id, 0, 0,
                                         this.formData.controls.subSectionNumber.value, this.formData.controls.subSectionStatus.value, null, null);
    this.sectionService.CreateVesselSubSection(newSubSection).pipe(take(1)).subscribe((data) => {
      newSubSection.id = data.id;
      this.subSectionUpdated.emit(newSubSection);
    });
  }

  saveSubSection(): void {
    const formValue = this.formData.value;
    this.subSection.vesselSectionId = this.subSection.vesselSectionId;
    this.subSection.subSectionNumber = formValue.subSectionNumber;
    this.subSection.sectionStatus = formValue.subSectionStatus;
    this.subSection.sectionStatusId = formValue.subSectionStatus.id;
    this.sectionService.UpdateVesselSubSection(this.subSection).pipe(take(1)).subscribe((data) => {
        this.subSectionUpdated.emit(this.subSection);
      });
  }

  onNewSubSectionInit(vesselSectionData: VesselSection) {
       this.formData.controls.sectionName.setValue(vesselSectionData.name);
       this.formData.controls.subSectionStatus.setValue(this.sectionStatus[0]);
       this.vesselSection = vesselSectionData;
  }

}
