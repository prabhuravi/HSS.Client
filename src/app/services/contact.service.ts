import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable, forkJoin, observable, of } from 'rxjs';
import { ConfigurationService } from '@kognifai/poseidon-ng-configurationservice';
import { Configuration } from '../configuration';
import { map } from 'rxjs/operators';
import { Contact, ContactRole } from '../models/Contact';
import { ContactAdapter, ContactRoleAdapter } from '../models/modelAdapter';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  operationalPlanConfig: any;
  contactConfig: any;
  constructor(
    private http: HttpService,
    public configurationService: ConfigurationService<Configuration>,
    public contactAdapter: ContactAdapter,
    public contactRole: ContactRoleAdapter) {
    this.operationalPlanConfig = this.configurationService.config.apiCollection.OperationalPlan;
    this.contactConfig = this.configurationService.config.apiCollection.OperationalPlan.Contact;
  }

  getVesselContacts(vesselId: number): Observable<Contact[]> {
    const requestData = {
      endPoint: `${this.operationalPlanConfig.domainURL}${this.contactConfig.path}${this.contactConfig.endpoints.GetVesselContacts}/${vesselId}`
    };
    return this.http.getData(requestData).pipe(map((data: any[]) =>
          data.map((item) => this.contactAdapter.adapt(item))
        )
      );
  }

  getContactTypes(): Observable<ContactRole[]> {
    const requestData = {
      endPoint: `${this.operationalPlanConfig.domainURL}${this.contactConfig.path}${this.contactConfig.endpoints.GetContactTypes}`
    };
    return this.http.getData(requestData).pipe(map((data: any[]) =>
          data.map((item) => this.contactRole.adapt(item))
        )
      );
  }

  updateVesselContact(contact: Contact): Observable<boolean> {
    const requestData = {
      endPoint:
        `${this.operationalPlanConfig.domainURL}${this.contactConfig.path}${this.contactConfig.endpoints.UpdateContact}/${contact.id}`,
      data: contact
    };
    return this.http.putData(requestData);
  }

  createVesselContact(contact: Contact): Observable<Contact> {
    const requestData = {
      endPoint:
        `${this.operationalPlanConfig.domainURL}${this.contactConfig.path}${this.contactConfig.endpoints.CreateVesselContact}`,
      data: contact
    };
    return this.http.postData(requestData).pipe(
      map((data: any) =>
        this.contactAdapter.adapt(data))
      );
  }

  deleteVesselContact(id: number): Observable<any> {
    const requestData = {
      endPoint:  `${this.operationalPlanConfig.domainURL}${this.contactConfig.path}${this.contactConfig.endpoints.DeleteVesselContact}/${id}`
    };
    return this.http.deleteData(requestData);
  }
  searchContacts(search: string): Observable<Contact[]> {
    const requestData = {
      endPoint: `${this.operationalPlanConfig.domainURL}${this.contactConfig.path}${this.contactConfig.endpoints.SeachContact}/${search}`
    };
    return this.http.getData(requestData).pipe(map((data: any[]) =>
    data.map((item) => this.contactAdapter.adapt(item))));
  }
}
