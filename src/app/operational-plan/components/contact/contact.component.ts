import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { FromBuilderService } from 'src/app/services/from-builder-service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(public fb: FormBuilder,
              private router: Router) { }

  ngOnInit() {
  }
  next(): void {
    this.router.navigateByUrl('/operational-plan');
  }
}
