import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '@kognifai/poseidon-authenticationservice';
import { ConfigurationService } from '@kognifai/poseidon-ng-configurationservice';
import { Configuration } from '../configuration';
import { User } from 'oidc-client';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  domainURL = 'https://hgstest.kognif.ai';
  username: string = '';

  constructor(
    public http: HttpClient,
    private authenticationService: AuthenticationService,
    public configurationService: ConfigurationService<Configuration>
  ) {
    if (this.authenticationService && this.authenticationService.userManager) {
      this.authenticationService.userManager.getUser().then((user: User) => {
        this.getUserInfo(user);
      });
    }
  }

  getData(requestData: any): Observable<any> {
    return this.http.get(`${this.domainURL + requestData.endPoint}`);
  }

  postData(requestData: any): Observable<any> {
    if (requestData.data.EnabledBy) {
      requestData.data.EnabledBy = this.username;
    }
    requestData.data.CreatedBy = this.username;
    requestData.data.LastUpdatedBy = this.username;
    requestData.data.LastUpdatedDate = new Date();
    return this.http.post(`${this.domainURL + requestData.endPoint}`, requestData.data);
  }
  putData(requestData: any): Observable<any> {
    requestData.data.EnabledBy = this.username;
    return this.http.put(`${this.domainURL + requestData.endPoint}`, requestData.data);
  }

  getUserInfo(user) {
    this.getLoggedInUserInfo(user).subscribe((userInfo: any) => {
      this.username = userInfo.username;
    });
  }

  getLoggedInUserInfo(user: User): Observable<any> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + user.access_token
    });
    const url = this.configurationService.config.userInfoApiUrl + user.profile.sub;
    return this.http.get(url, { headers: reqHeader });
  }
}
