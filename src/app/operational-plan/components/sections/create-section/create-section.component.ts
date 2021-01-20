import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from '@kognifai/poseidon-message-service';
import { ConfirmationService } from 'primeng/api';
import { take } from 'rxjs/operators';
import { FormType } from 'src/app/app.constants';
import { SectionAdapter } from 'src/app/models/modelAdapter';
import { Section, SectionStatus } from 'src/app/models/Section';
import { FromBuilderService } from 'src/app/services/from-builder-service';
import { SectionService } from 'src/app/services/section.service';

@Component({
  selector: 'app-create-section',
  templateUrl: './create-section.component.html',
  styleUrls: ['./create-section.component.scss']
})
export class CreateSectionComponent implements OnInit {
  @Input() section: Section;
  @Output() sectionUpdated: EventEmitter<any> = new EventEmitter<any>();
  isDataLoading = true;
  editMode: boolean = false;
  PrepareInstallation: boolean = false;
  formValues: any = null;
  formType = FormType;
  formData: FormGroup;
  config = {
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
    this.sectionService.getSectionStatus().pipe(take(1)).subscribe((data) => {
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
        label: 'Name',
        value: this.section ? this.section.name : '',
        key: 'name',
        validators: [Validators.required, Validators.maxLength(20)],
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
    this.section = sectionData;
    this.formData.controls.name.setValue(sectionData.name);
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
    newSection.id = Math.floor(Math.random() * 999999) + 1;
    this.sectionUpdated.emit(newSection);
  }

  saveSection(): void {
    const formValue = this.formData.value;
    this.section.name = formValue.name;
    this.section.sectionStatus = formValue.sectionStatus;
    this.sectionUpdated.emit(this.section);
  }

}
