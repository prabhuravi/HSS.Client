import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

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
