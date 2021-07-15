import { NullVisitor } from '@angular/compiler/src/render3/r3_ast';
import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AutoComplete } from 'primeng/autocomplete';
import { take } from 'rxjs/operators';
import { Contact } from 'src/app/models/Contact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-search',
  templateUrl: './contact-search.component.html', 
  styleUrls: ['./contact-search.component.scss']
})
export class ContactSearchComponent implements OnInit, AfterViewInit {
  @ViewChild('searchInput', {static: false}) searchInputObject: AutoComplete;
 // @ViewChild('autoCompleteObject') private autoCompleteObject: AutoComplete ;
  searchedContact: Contact;
  contactSearch: Contact[];
  constructor(private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private contactService: ContactService) { }
 
 
  @Output() contactSearched: EventEmitter<any> = new EventEmitter<any>();
  ngOnInit() {
  }
  ngAfterViewInit(): void {
    this.searchInputObject.focusInput();
  }

  searchContact(event: any) {
    this.contactService.searchContacts(event.query).subscribe((data) => {
      this.contactSearch = data;
    });
  }

  onSelectContact(event: Contact) {
  this.contactSearched.emit(event);
  }

}
