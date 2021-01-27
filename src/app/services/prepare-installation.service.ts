import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Installation } from '../models/Installation';

@Injectable({
  providedIn: 'root'
})
export class PrepareInstallationService {

  public installationSource = new Subject<Installation>();
public installation: Installation;
  installationDetail = this.installationSource.asObservable();
  constructor() { }

  updateInstallationDetail(installation: Installation) {
    this.installation = installation;
    this.installationSource.next(installation);
  }
}
