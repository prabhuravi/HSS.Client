import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable, forkJoin, observable, of } from 'rxjs';
import { ConfigurationService } from '@kognifai/poseidon-ng-configurationservice';
import { Configuration } from '../configuration';
import { Installation } from '../models/Installation';

@Injectable({
  providedIn: 'root'
})
export class InatallationService {
installationEndpointConfig: any;
  installationApiUrl: string;
  constructor(private http: HttpService, public configurationService: ConfigurationService<Configuration>) {
    this.installationEndpointConfig = this.configurationService.config.apiCollection.Installation;
   }
}
