import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { take } from 'rxjs/operators';
import { HSRegularityKPIAnswer } from 'src/app/models/hsRegularityKPIAnswer';
import { HSRegularityKPIQuestion } from 'src/app/models/hsRegularityKPIQuestion';
import { Operation } from 'src/app/models/Operation';
import { KPIService } from 'src/app/services/kpi.service';

@Component({
  selector: 'app-hullskater-regularity-kpi',
  templateUrl: './hullskater-regularity-kpi.component.html',
  styleUrls: ['./hullskater-regularity-kpi.component.scss']
})
export class HullskaterRegularityKpiComponent implements OnInit {
  isDataLoading: boolean;
  kpiForm: FormGroup;
  @Input() operation: Operation;
  hsRegularityKPIQuestions: HSRegularityKPIQuestion[] = [];
  hsRegularityKPIAnswers: HSRegularityKPIAnswer[] = [];
  constructor(public fb: FormBuilder, private kpiService: KPIService, private messageService: MessageService) { }

  ngOnInit() {
    this.isDataLoading = true;
    this.kpiService.getHSRegularityKPIQuestion(1).pipe(take(1)).subscribe((data) => {
      this.isDataLoading = false;
      this.hsRegularityKPIQuestions = data;
    });
    this.kpiForm = this.buildForm();
  }

  buildForm() {
    const group = this.fb.group({});
    group.addControl('control0', this.fb.control({ value: '', disabled: false }, [Validators.required]));
    group.addControl('control1', this.fb.control({ value: '', disabled: false }, [Validators.required]));
    group.addControl('control2', this.fb.control({ value: '', disabled: false }, [Validators.required]));
    group.addControl('control3', this.fb.control({ value: '', disabled: false }, [Validators.required, Validators.pattern('^[0-9][0-9]:[0-5][0-9]$')]));
    group.addControl('control4', this.fb.control({ value: '', disabled: false }, [Validators.required]));
    group.addControl('control5', this.fb.control({ value: '', disabled: false }, [Validators.required]));
    group.addControl('control6', this.fb.control({ value: '', disabled: false }, [Validators.required]));
    group.addControl('control7', this.fb.control({ value: '', disabled: false }));
    return group;
  }

  saveKpi() {
    const kpiAnswers: HSRegularityKPIAnswer[] = []
    this.hsRegularityKPIQuestions.forEach((question, index) => {
      const controlName = 'control' + index;
      kpiAnswers.push({ Id: null, OperationId: this.operation.Id, QuestionId: question.Id, AnswerId: this.kpiForm.get(controlName).value.Id ? this.kpiForm.get(controlName).value.Id : null, AnswerText: this.kpiForm.get(controlName).value.Id ? null : this.kpiForm.get(controlName).value });
    });

    this.isDataLoading = true;
    this.kpiService.updateHSRegularityKPIAnswer(this.operation.Id, kpiAnswers).pipe(take(1)).subscribe((data) => {
      this.isDataLoading = false;
      this.triggerToast('success', 'Success Message', `KPI saved successfully`);
    });
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
