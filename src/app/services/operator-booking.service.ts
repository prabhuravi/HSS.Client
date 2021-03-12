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
}
