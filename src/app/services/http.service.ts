import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, config, throwError } from 'rxjs';
import { AuthenticationService } from '@kognifai/poseidon-authenticationservice';
import { ConfigurationService } from '@kognifai/poseidon-ng-configurationservice';
import { Configuration } from '../configuration';
import { User } from 'oidc-client';
import { retry, catchError } from 'rxjs/operators';
import { ConfirmationService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  domainURL = '';
  username: string = '';

  constructor(
    public http: HttpClient,
    private authenticationService: AuthenticationService,
    public configurationService: ConfigurationService<Configuration>,
    private confirmationService: ConfirmationService
  ) {
    this.domainURL = configurationService.config.apiCollection.domainURL;
    if (this.authenticationService && this.authenticationService.userManager) {
      this.authenticationService.userManager.getUser().then((user: User) => {
        this.getUserInfo(user);
      });
    }
  }

  getData(requestData: any): Observable<any> {
    return this.http.get(`${this.domainURL + requestData.endPoint}`).pipe(
      retry(2),
      catchError(this.handleError.bind(this))
    );
  }

  handleError(error) {
    console.log(error);
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}
      Message: ${error.message}`;
    }
    this.confirmationService.confirm({
      header: 'Network Error',
      message: `<span class="u--bgDanger">${errorMessage}</span>`,
      rejectVisible: false,
      acceptLabel: 'Ok'
    });
    return throwError(errorMessage);
  }

  postData(requestData: any): Observable<any> {
    if (requestData.data.EnabledBy) {
      requestData.data.EnabledBy = this.username;
    }
    requestData.data.CreatedBy = this.username;
    requestData.data.LastUpdatedBy = this.username;
    requestData.data.LastUpdatedDate = new Date();
    return this.http.post(`${this.domainURL + requestData.endPoint}`, requestData.data).pipe(
      retry(2),
      catchError(this.handleError.bind(this))
    );
  }
  putData(requestData: any): Observable<any> {
    requestData.data.EnabledBy = this.username;
    return this.http.put(`${this.domainURL + requestData.endPoint}`, requestData.data).pipe(
      retry(2),
      catchError(this.handleError.bind(this))
    );
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
    return this.http.get(url, { headers: reqHeader }).pipe(
      retry(2),
      catchError(this.handleError.bind(this))
    );
  }
}
