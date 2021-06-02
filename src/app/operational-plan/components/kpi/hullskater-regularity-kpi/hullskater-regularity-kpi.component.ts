import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
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
  constructor(public fb: FormBuilder, private kpiService: KPIService) { }

  ngOnInit() {
    console.log(this.operation);
    this.isDataLoading = true;
    this.kpiService.getHSRegularityKPIQuestion(1).pipe(take(1)).subscribe((data) => {
      this.isDataLoading = false;
      this.hsRegularityKPIQuestions = data;
      console.log(this.hsRegularityKPIQuestions);
    });
    this.kpiForm = this.buildForm();
  }

  buildForm() {
    const group = this.fb.group({});
    group.addControl('0', this.fb.control({ value: '', disabled: false }, [Validators.required]));
    group.addControl('1', this.fb.control({ value: '', disabled: false }, [Validators.required]));
    group.addControl('2', this.fb.control({ value: '', disabled: false }, [Validators.required]));
    group.addControl('3', this.fb.control({ value: '', disabled: false }, [Validators.required, Validators.pattern('^[0-9][0-9]:[0-5][0-9]$')]));
    group.addControl('4', this.fb.control({ value: '', disabled: false }, [Validators.required]));
    group.addControl('5', this.fb.control({ value: '', disabled: false }, [Validators.required]));
    group.addControl('6', this.fb.control({ value: '', disabled: false }, [Validators.required]));
    group.addControl('7', this.fb.control({ value: '', disabled: false }));
    return group;
  }

  saveKpi()
  {
    console.log(this.kpiForm);
  }

}
