import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
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
  contactSearch: Contact[];
  @Output() contactSearched: EventEmitter<any> = new EventEmitter<any>();

  constructor(private contactService: ContactService) { }
  
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
