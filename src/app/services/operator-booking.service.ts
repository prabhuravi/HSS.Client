/*
 * KONGSBERG PROPRIETARY. This document and its accompanying elements, contain KONGSBERG information which is proprietary and confidential.
Any disclosure, copying, distribution or use is prohibited if not otherwise explicitly agreed with KONGSBERG in writing.
Any authorized reproduction, in whole or in part, must include this legend. © [year of creation] KONGSBERG – All rights reserved.
 */
import { Injectable } from '@angular/core';
import { ConfigurationService } from '@kognifai/poseidon-ng-configurationservice';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { Configuration } from '../configuration';
import { Contact } from '../models/Contact';
import { ContactAdapter, InstallationAdapter } from '../models/modelAdapter';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class OperatorBookingService {
  operationalPlanConfig: any;
  operatorBookingConfig: any;
  constructor(private http: HttpService, public configurationService: ConfigurationService<Configuration>,
              private contactAdapter: ContactAdapter) {
                this.operationalPlanConfig = this.configurationService.config.apiCollection.OperationalPlan;
                this.operatorBookingConfig = this.configurationService.config.apiCollection.OperationalPlan.OperatorBooking;
              }

              getOperatorForVessel(vesselId: number, bookingDate: string): Observable<Contact[]> {
                const requestData = {
                  endPoint: `${this.operationalPlanConfig.domainURL}${this.operatorBookingConfig.path}/${this.operatorBookingConfig.endpoints.GetOperatorForVessel}/${vesselId}/${bookingDate}`
                };
                return this.http.getData(requestData).pipe(map((data: any[]) =>  data.map((item) =>  this.contactAdapter.adapt(item))));
              }

              deleteOperationBooking(id: number): Observable<any> {
                const requestData = {
                  endPoint: `${this.operationalPlanConfig.domainURL}${this.operatorBookingConfig.path}/${this.operatorBookingConfig.endpoints.DeleteOperatorBooking}${id}`
                };
                // return of(true);
                return this.http.deleteData(requestData);
              }
}
