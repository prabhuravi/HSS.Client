import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  domainURL = 'https://hgstest.kognif.ai';

  constructor(
    public http: HttpClient
  ) { }

  getData(requestData: any): Observable<any> {
    return this.http.get(`${this.domainURL + requestData.endPoint}`);
  }

  postData(requestData: any): Observable<any> {
    return this.http.post(`${this.domainURL + requestData.endPoint}`, requestData.data);
  }

  rquestData(requestData: any): Observable<any> {
    return this.http.request(`${this.domainURL + requestData.endPoint}`, requestData.data);
  }
}
