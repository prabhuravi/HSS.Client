import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contact } from 'src/app/models/Contact';


@Component({
  selector: 'app-contact-listing',
  templateUrl: './contact-listing.component.html',
  styleUrls: ['./contact-listing.component.scss']
})
export class ContactListingComponent implements OnInit {

  @Input() excludeSearch: boolean;
  searchedContact: Contact;
  @Output() contactOnEdit: EventEmitter<any> = new EventEmitter<any>();
  cols = [
    { field: 'firstName',  header: 'First Name'},
    { field: 'surName', header: 'Surname' },
    { field: 'email',  header: 'Email'},
    { field: 'alternativePhone', header: 'Alternative Phone' },
    { field: 'Phone',  header: 'Phone' },
    { field: 'role', header: 'Role' },
    { field: 'tagTraining', header: 'Tag Training' },
    { field: 'action',  header: 'Actions' }
  ];
contactSearch: Contact[];
  contacts: Contact[] = [
    {
      id: 1,
      firstName: 'Test1',
      surName: 'a',
      email: 'test@tests.com',
      alternativePhone: '12234556',
      phone: '123211',
      role: {
        id: 1,
        name: 'Skate Operator'
      },
      tagTraining: true
    },
    {
      id: 2,
      firstName: 'Test2',
      surName: 'b',
      email: 'test2@tests.com',
      alternativePhone: '1223321',
      phone: '122211',
      role: {
        id: 1,
        name: 'Crew Mate'
      },
      tagTraining: true
    },
    {
      id: 3,
      firstName: 'Test3',
      surName: 'c',
      email: 'test3@tests.com',
      alternativePhone: '1223321',
      phone: '122211',
      role: {
        id: 1,
        name: 'Ship Captain'
      },
      tagTraining: false
    }
  ];
  constructor() { }

  ngOnInit() {
    this.contactSearch = this.contacts;
  }

  onContactEditInit(rowData: Contact) {
    this.contactOnEdit.emit(rowData);
  }

  onContactDelete(rowData: Contact) {
    this.contacts = this.contacts.filter((x) => x !== rowData);
  }

  onContactDataUpdated(ContactData: any): void {
    console.log(ContactData);
    let rowData = this.contacts.find( (x) => x.id ===  ContactData.id);
    if (rowData) {
      rowData = ContactData;
    } else {
      this.contacts.push(ContactData);
    }

    console.log(this.contacts);
  }
  filterPortContact(event: any){
    this.contactSearch.filter((x) => x.firstName.includes(event.query));
  }

}
