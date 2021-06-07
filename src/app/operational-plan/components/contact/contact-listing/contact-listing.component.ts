import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { take } from 'rxjs/operators';
import { AppConstants } from 'src/app/app.constants';
import { Contact } from 'src/app/models/Contact';
import { ContactService } from 'src/app/services/contact.service';
import { PrepareInstallationService } from 'src/app/services/prepare-installation.service';

@Component({
  selector: 'app-contact-listing',
  templateUrl: './contact-listing.component.html',
  styleUrls: ['./contact-listing.component.scss']
})
export class ContactListingComponent implements OnInit {

  isDataLoading = false;
  @Input() excludeSearch: boolean;
  @Input() isOperationScreen: boolean;

  PRIMENG_CONSTANTS = AppConstants.PRIMENG_CONSTANTS;
  @Output() contactOnEdit: EventEmitter<any> = new EventEmitter<any>();
  cols = [
    { field: 'name', header: 'First Name', sortfield: 'name', filterMatchMode: 'contains' , displayInOperation: true },
    { field: 'surName', header: 'Surname', sortfield: 'surName', filterMatchMode: 'contains', displayInOperation: true  },
    { field: 'email', header: 'Email', sortfield: 'email', filterMatchMode: 'contains', displayInOperation: false  },
    { field: 'alternativePhone', header: 'Alternative Phone', sortfield: 'alternativePhone',  filterMatchMode: 'contains', displayInOperation: false },
    { field: 'phone', header: 'Phone', sortfield: 'phone', filterMatchMode: 'contains' , displayInOperation: true},
    { field: 'ContactType.name', header: 'Role', sortfield: 'ContactType.name', filterMatchMode: 'contains', displayInOperation: false },
    { field: 'tagTraining', header: 'Tag Training', sortfield: '', displayInOperation: false },
    { field: 'action', header: 'Actions', sortfield: '', displayInOperation: false }
  ];
  contactSearch: Contact[];
  contacts: Contact[] = [];
  constructor(private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private contactService: ContactService,
              private prepareInstallationService: PrepareInstallationService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    if (!this.prepareInstallationService.installation) {
      this.prepareInstallationService.setInstallationFromRoute(this.route);
    }
    this.loadVesselContacts();
  }

  private loadVesselContacts() {
    this.isDataLoading = true;
    let vesselId = 0;
    const params = this.route.snapshot.paramMap.get('vesselId');
    vesselId = parseInt(params, null);
    this.contactService.getVesselContacts(vesselId).pipe(take(1)).subscribe((data) => {
      console.log(data);
      this.isDataLoading = false;
      this.contacts = data;
    });
  }
public seeDetailedInfo(rowData: Contact): string{
  return 'Email: ' + rowData.email + ' Alternate Phone: ' + rowData.alternativePhone ;
}
  onContactEditInit(rowData: Contact) {
    this.contactOnEdit.emit(rowData);
  }

  onContactDelete(rowData: Contact) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to remove this contact?',
      accept: () => {

        this.isDataLoading = true;
        this.contactService.deleteVesselContact(rowData.vesselContactId).pipe(take(1)).subscribe((data) => {
          this.isDataLoading = false;
          this.loadVesselContacts();
          // this.contacts = this.contacts.filter((x) => x !== rowData);
          this.triggerToast('success', 'Success Message', `contact removed successfully`);
        });
      }
    });
  }

  onContactDataUpdated(ContactData: Contact): void {
    console.log(ContactData);
    this.loadVesselContacts();
    // let rowData = this.contacts.find((x) => x.id === ContactData.id);
    // if (rowData) {
    //   rowData = ContactData;
    // } else {
    //   this.contacts.push(ContactData);
    // }
  }
  onSearchContactEvent(event: Contact) {

      const selectedContact = event;
      const existingContact = this.contacts.filter((x) => x.id === selectedContact.id);
      if (existingContact.length === 0) {
        this.confirmationService.confirm({
          message: 'Would you like to add this contact to this installation?',
          accept: () => {
            selectedContact.contactId = selectedContact.id;
            selectedContact.vesselId = this.prepareInstallationService.installation.id;
            this.isDataLoading = true;
            this.contactService.createVesselContact(selectedContact).pipe(take(1)).subscribe((data) => {
              this.loadVesselContacts();
              this.isDataLoading = false;
              this.triggerToast('success', 'Success Message', `contact added successfully`);

            });
          }
        });
      } else {
        this.triggerToast('warn', 'Warn Message', `contact already exists!`);

      }
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
