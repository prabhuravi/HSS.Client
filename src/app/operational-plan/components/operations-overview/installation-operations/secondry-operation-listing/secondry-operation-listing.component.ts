import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl  } from '@angular/forms';
import { take } from 'rxjs/operators';
import { FormType } from 'src/app/app.constants';
import { SecondaryOperation } from 'src/app/models/Operation';
import { SubSection, VesselSection } from 'src/app/models/Section';
import { FromBuilderService } from 'src/app/services/from-builder-service';
import { OperationalPlanService } from 'src/app/services/operational-plan.service';

@Component({
  selector: 'app-secondry-operation-listing',
  templateUrl: './secondry-operation-listing.component.html',
  styleUrls: ['./secondry-operation-listing.component.scss']
})
export class SecondryOperationListingComponent implements OnInit {

  @Input() secondaryoperations: SecondaryOperation[] = [];

  secodaryformData = this.fb.group({
    title: [],
    secondaryItems: this.fb.array([])
  });
  isFormSubmmited: boolean = false;
  operationTypes: IOperationTypes[] = [];
  operationStatus: IOperationStatus[] = [];
  requestedBy: IRequestedBy[] = [];
  formValues: any = null;
  editSecondaryOperation: boolean = false;
  displayMaximizable: boolean;
  secondaryVesselSections: any[] = [];
  isDataLoading = false;
  secondaryconfigs: any[] = [];
  selectedVesselSection: VesselSection[] = [];
  @Input() sections: VesselSection[] = [];
  @Input() gobalSelectedSubSectionId: number [] = [];

  constructor(private formBuliderService: FromBuilderService,
              private operationalPlanService: OperationalPlanService,
              public fb: FormBuilder
  ) { }

  ngOnInit() {
    this.isDataLoading = true;
    this.operationalPlanService.getOperationMasterData().pipe(take(1)).subscribe((data) => {
      this.isDataLoading = false;
      this.operationTypes = data[0];
      this.operationStatus = data[1];

      this.secodaryformData = this.fb.group({
        title: [],
        secondaryItems: this.fb.array([])
      });

      this.secondaryoperations.forEach((element) => {
        this.attachToSecondaryList(element);
      });
    });

  }
  get secondaryItems() {
    return this.secodaryformData.get('secondaryItems') as FormArray;
  }

  get updatedSecondaryOperations() {

    this.secondaryItems.controls.forEach((element, index) => {
      console.log(element);
      const ele = element as any;
      this.secondaryoperations[index].StatusId = ele.controls.operationStatus.value.Id;
      this.secondaryoperations[index].OperationStatus =  ele.controls.operationStatus.value;
      this.secondaryoperations[index].OperationTypeId =  ele.controls.operationType.value.Id;
      this.secondaryoperations[index].OperationType =  ele.controls.operationType.value;
      const vesselSection =   this.secondaryVesselSections[index] as VesselSection[];
      const vesselSectionArray = [];
      vesselSection.forEach((sections) => {
       const selectedSubsections =    sections.subSections.filter((x) => x.selected === true);
       if (selectedSubsections.length > 0) {
         const section = JSON.parse(JSON.stringify(sections));
         section.subSections = selectedSubsections;
       // const ids = selectedSubsections.map(({ id }) => id);
         vesselSectionArray.push(section);
         this.secondaryoperations[index].VesselSectionModel = vesselSectionArray;
         //Array.prototype.push.apply(this.secondaryoperations[index].VesselSectionModel, section);
      }
      });
    });
    return this.secondaryoperations;
  }

  private attachToSecondaryList(element: SecondaryOperation) {
    const secondaryconfig = {
      formList: [],
      className: 'kx-col kx-col--12 kx-col--6@mob-m kx-col--5@tab-m kx-col--2@ltp-s'
    };
    this.constructForm(secondaryconfig, element);
    this.secondaryItems.push(this.formBuliderService.buildForm(secondaryconfig));
    this.secondaryconfigs.push(secondaryconfig);
    this.sections.forEach((sec) => {
      sec.subSections.forEach((sub) => {
        if (sub.selected){
          this.gobalSelectedSubSectionId.push(sub.id);
        }
      });
    });
    this.secondaryVesselSections.push(JSON.parse(JSON.stringify(this.sections)));
  }

  updateSecondaryOperationList(event: SecondaryOperation) {
    this.secondaryoperations.push(event);
    this.attachToSecondaryList(event);
  }
  deleteSecondary(index: number){
    this.secondaryoperations.splice(index, 1);
    this.secondaryItems.removeAt(index);
    this.secondaryconfigs.splice(index, 1);
    const sectionForSecondary = this.secondaryVesselSections[index];
    sectionForSecondary.forEach((sec) => {
      sec.subSections.forEach((sub) => {
        if (sub.selected){
         const globalIndex = this.gobalSelectedSubSectionId.findIndex((x) => x === sub.id);
         this.gobalSelectedSubSectionId.splice(globalIndex, 1);
        }
      });
    });
  }
  clearSecondaryListing(){
    this.secondaryoperations = [];
    this.secondaryItems.clear();
    this.secondaryconfigs = [];
    this.secondaryVesselSections = [];    
  }

  constructForm(config: any, secondaryOperation: SecondaryOperation): void {
    const selectedOperationType = this.operationTypes.find((x) => x.Id === secondaryOperation.OperationTypeId);
    const selectedOperationStatus = this.operationStatus.find((x) => x.Id === secondaryOperation.StatusId);
    config.formList = [
      {
        type: FormType.text,
        label: 'Assignment Type',
        value: 'Secondary',
        key: 'name',
        validators: [Validators.required, Validators.maxLength(15)],
        disabled: true
      },
      {
        type: FormType.dropdown,
        label: 'Operation Type',
        options: this.operationTypes,
        value: selectedOperationType,
        key: 'operationType',
        validators: [Validators.required],
        optionLabel: 'OperationTypeName',
        disabled: false
      },
      {
        type: FormType.dropdown,
        label: 'Status',
        options: this.operationStatus,
        value: selectedOperationStatus,
        key: 'operationStatus',
        validators: [Validators.required],
        optionLabel: 'Name',
        disabled: secondaryOperation.Id <= 0
      }

    ];
  }



  showMaximizableDialog(index: number) {
    this.displayMaximizable = true;
    this.selectedVesselSection = this.secondaryVesselSections[index];

}
onSectionSelected(section: VesselSection) {
  if (section.selected)  {
    section.selected = false;
    section.subSections.forEach((subSection) => {
      subSection.selected = false;
    });
  } else {
    section.selected = true;
    section.subSections.forEach((subSection) => {
      subSection.selected = true;
    });
  }
}

onSubSectionSelected(rowsection: VesselSection, rowsubSection: SubSection) {
 if (rowsubSection.selected) {
  rowsubSection.selected = false;
  rowsection.selected = false;
} else {
  rowsubSection.selected = true;

  const unSelectednode =  rowsection.subSections.find((x) => x.selected === false);
  if (!unSelectednode) {
    rowsection.selected = true;
  }
}
}


isBookedSubsection(rowsubSection: SubSection) {
  return this.gobalSelectedSubSectionId.find((x) => x === rowsubSection.id);
}

isBookingSectionsValid() {
  let vaild = false;
  this.sections.forEach((section) => {
    section.subSections.forEach((sub) => {
      if (sub.selected) {
        vaild = true;
      }
    });
  });
  return vaild;
}

isBookedSection(rowsection: VesselSection) {
  if (!rowsection || !rowsection.subSections) {
    return false;
  }
  let booked = true;
  rowsection.subSections.forEach((element) => {
    const subSectionid = this.gobalSelectedSubSectionId.find((x) => x === element.id);
    if (!subSectionid) {
      booked = false;
    }
  });
  return booked;
}

}
