import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AppConstants } from 'src/app/app.constants';
import { Contact } from 'src/app/models/Contact';

@Component({
  selector: 'app-contact-listing',
  templateUrl: './contact-listing.component.html',
  styleUrls: ['./contact-listing.component.scss']
})
export class ContactListingComponent implements OnInit {

  isDataLoading = false;
  @Input() excludeSearch: boolean;
  searchedContact: Contact;
  PRIMENG_CONSTANTS = AppConstants.PRIMENG_CONSTANTS;
  @Output() contactOnEdit: EventEmitter<any> = new EventEmitter<any>();
  cols = [
    { field: 'firstName',  header: 'First Name', sortfield: 'firstName', filterMatchMode: 'contains' },
    { field: 'surName', header: 'Surname', sortfield: 'surName', filterMatchMode: 'contains' },
    { field: 'email',  header: 'Email', sortfield: 'email', filterMatchMode: 'contains'},
    { field: 'alternativePhone', header: 'Alternative Phone', sortfield: 'alternativePhone', filterMatchMode: 'contains' },
    { field: 'Phone',  header: 'Phone', sortfield: 'Phone', filterMatchMode: 'contains' },
    { field: 'role', header: 'Role', sortfield: 'role.name', filterMatchMode: 'contains' },
    { field: 'tagTraining', header: 'Tag Training', sortfield: '' },
    { field: 'action',  header: 'Actions',  sortfield: ''  }
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
        id: 2,
        name: 'Crew Mate'
      },
      tagTraining: false
    },
    {
      id: 3,
      firstName: 'Test3',
      surName: 'c',
      email: 'test3@tests.com',
      alternativePhone: '1223321',
      phone: '122211',
      role:  {
        id: 3,
        name: 'Ship Captain'
      },
      tagTraining: false
    }
  ];
  constructor( private confirmationService: ConfirmationService,
               private messageService: MessageService) { }

  ngOnInit() {
    this.contactSearch = this.contacts;
  }

  onContactEditInit(rowData: Contact) {
    this.contactOnEdit.emit(rowData);
  }

  onContactDelete(rowData: Contact) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this contact?',
      accept: () => {

        this.isDataLoading = true;
        this.isDataLoading = false;
        this.contacts = this.contacts.filter((x) => x !== rowData);
        this.triggerToast('success', 'Success Message', `Sub-section deleted successfully`);
      }
    });
  }

  onContactDataUpdated(ContactData: any): void {
    debugger;
    console.log(ContactData);
    let rowData = this.contacts.find( (x) => x.id ===  ContactData.id);
    if (rowData) {
      rowData = ContactData;
    } else {
      this.contacts.push(ContactData);
    }

    console.log(this.contacts);
  }
  filterPortContact(event: any) {
    console.log(event);
    this.contactSearch = this.contacts.filter((x) => x.firstName.includes(event.query));
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
