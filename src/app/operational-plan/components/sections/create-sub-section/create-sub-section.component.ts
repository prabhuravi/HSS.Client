import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from '@kognifai/poseidon-message-service';
import { ConfirmationService } from 'primeng/api';
import { take } from 'rxjs/operators';
import { FormType } from 'src/app/app.constants';
import {  SubSectionAdapter } from 'src/app/models/modelAdapter';
import {  Section, SectionStatus, SubSection } from 'src/app/models/Section';
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
  section: Section;
  isDataLoading = true;
  editMode: boolean = false;
  formValues: any = null;
  formType = FormType;
  formData: FormGroup;
  config = {
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
        type: FormType.text,
        label: 'Name',
        value: this.subSection ? this.subSection.name : '',
        key: 'subSectionName',
        validators: [Validators.required, Validators.maxLength(20)],
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
    this.formData.controls.subSectionName.setValue(this.subSection.name);
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
    const newSubSection = new SubSection(0, this.section.id, this.formData.controls.subSectionName.value, this.formData.controls.subSectionStatus.value, null);
    newSubSection.id = Math.floor(Math.random() * 999999) + 1;
    this.subSectionUpdated.emit(newSubSection);
  }

  saveSubSection(): void {
    const formValue = this.formData.value;
    this.subSection.sectionId = this.subSection.sectionId;
    this.subSection.name = formValue.subSectionName;
    this.subSection.sectionStatus = formValue.subSectionStatus;
    this.subSectionUpdated.emit(this.subSection);
  }

  onNewSubSectionInit(sectionData: Section) {
       this.formData.controls.sectionName.setValue(sectionData.name);
       this.formData.controls.subSectionStatus.setValue(this.sectionStatus[0]);
       this.section = sectionData;
  }

}
