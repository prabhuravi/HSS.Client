/*
 * KONGSBERG PROPRIETARY. This document and its accompanying elements, contain KONGSBERG information which is proprietary and confidential.
Any disclosure, copying, distribution or use is prohibited if not otherwise explicitly agreed with KONGSBERG in writing.
Any authorized reproduction, in whole or in part, must include this legend. © [year of creation] KONGSBERG – All rights reserved.
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthenticationService } from '@kognifai/poseidon-authenticationservice';
import { ConfigurationService } from '@kognifai/poseidon-ng-configurationservice';
import { Configuration } from '../configuration';
import { User } from 'oidc-client';
import { retry, catchError, map } from 'rxjs/operators';
import { ConfirmationService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  username: string = '';

  constructor(
    public http: HttpClient,
    private authenticationService: AuthenticationService,
    public configurationService: ConfigurationService<Configuration>,
    private confirmationService: ConfirmationService
  ) {
    if (this.authenticationService && this.authenticationService.userManager) {
      this.authenticationService.userManager.getUser().then((user: User) => {
        this.getUserInfo(user);
      });
    }
  }

  getData(requestData: any): Observable<any> {
    return this.http.get(requestData.endPoint).pipe(
      retry(0),
      catchError(this.handleError.bind(this))
    );
  }

  getDataGeneric<T>(requestData: any): Observable<T> {
    return this.http.get<T>(requestData.endPoint).pipe(
      retry(0),
      catchError(this.handleError.bind(this))
    );
  }

  getDataV2(requestData: any): Observable<any> {
    return this.http.get(requestData.endPoint, {
      params: new HttpParams({
        fromObject: requestData.params
      })
    }
    ).pipe(
      retry(0),
      catchError(this.handleError.bind(this))
    );
  }
  getMediaData(requestData: any, mediaType: any): Observable<any> {
    return this.http.get(requestData.endPoint, {
      params: new HttpParams({
        fromObject: requestData.params
      }),
      responseType: mediaType
    }
    ).pipe(
      retry(0),
      catchError(this.handleError.bind(this))
    );
  }

  handleError(error) {
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
    if (requestData.data) {
      requestData.data.EnabledBy = this.username;
      requestData.data.CreatedBy = this.username;
      requestData.data.LastUpdatedBy = this.username;
      requestData.data.LastUpdatedDate = new Date();
    }
    return this.http.post(requestData.endPoint, requestData.data).pipe(
      retry(0),
      catchError(this.handleError.bind(this))
    );
  }

  postDocument(requestData: any): Observable<any> {
    requestData.data.set('CreatedBy', this.username);
    return this.http.post(requestData.endPoint, requestData.data).pipe(
      retry(0),
      catchError(this.handleError.bind(this))
    );
  }

  // getFile(requestData: any): Observable<any> {
  //  return this.http.get(requestData.endPoint, { responseType: 'blob' });
  // }

  putData(requestData: any): Observable<any> {
    if (requestData.data) {
      requestData.data.EnabledBy = this.username;
      requestData.data.LastUpdatedBy = this.username;
    }
    return this.http.put(requestData.endPoint, requestData.data).pipe(
      retry(0),
      catchError(this.handleError.bind(this))
    );
  }

  deleteData(requestData: any): Observable<any> {
    return this.http.delete(requestData.endPoint).pipe(
      retry(0),
      catchError(this.handleError.bind(this))
    );
  }

  getUserInfo(user) {
    this.getLoggedInUserInfo(user).subscribe((userInfo: any) => {
      this.username = userInfo.username;
    });
  }

  getLoggedInUser() {
    return this.username;
  }

  getLoggedInUserInfo(user: User): Observable<any> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + user.access_token
    });
    const url = this.configurationService.config.userInfoApiUrl + user.profile.sub;
    return this.http.get(url, { headers: reqHeader }).pipe(
      retry(0),
      catchError(this.handleError.bind(this))
    );
  }
}
