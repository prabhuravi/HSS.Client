/*
 * KONGSBERG PROPRIETARY. This document and its accompanying elements, contain KONGSBERG information which is proprietary and confidential.
Any disclosure, copying, distribution or use is prohibited if not otherwise explicitly agreed with KONGSBERG in writing.
Any authorized reproduction, in whole or in part, must include this legend. © [year of creation] KONGSBERG – All rights reserved.
 */
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AutoComplete } from 'primeng/autocomplete';
import { Contact } from 'src/app/models/Contact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-search',
  templateUrl: './contact-search.component.html',
  styleUrls: ['./contact-search.component.scss']
})
export class ContactSearchComponent implements OnInit, AfterViewInit {
  @ViewChild('searchInput', {static: false}) searchInputObject: AutoComplete;
  searchedContact: Contact;
  @Input() isOperationScreen: boolean;
  contactSearch: Contact[];
  @Output() contactSearched: EventEmitter<any> = new EventEmitter<any>();

  constructor(private contactService: ContactService) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.searchInputObject.focusInput();
  }

  searchContact(event: any) {

    if(event.query && event.query.trim()){
      if (this.isOperationScreen) {
        this.contactService.searchOperationContacts(event.query).subscribe((data) => {
          this.contactSearch = data;
        });
      } else {
      this.contactService.searchContacts(event.query).subscribe((data) => {
        this.contactSearch = data;
      });
      }
   }
  }

  onSelectContact(event: Contact) {
  this.contactSearched.emit(event);
  }

}
