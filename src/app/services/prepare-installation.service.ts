/*
 * KONGSBERG PROPRIETARY. This document and its accompanying elements, contain KONGSBERG information which is proprietary and confidential.
Any disclosure, copying, distribution or use is prohibited if not otherwise explicitly agreed with KONGSBERG in writing.
Any authorized reproduction, in whole or in part, must include this legend. © [year of creation] KONGSBERG – All rights reserved.
 */
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { Installation } from '../models/Installation';
import { InstallationService } from './installation.service';

@Injectable({
  providedIn: 'root'
})
export class PrepareInstallationService {

  public installationSource = new Subject<Installation>();
public installation: Installation;
  installationDetail = this.installationSource.asObservable();
  constructor(private installationService: InstallationService ) { }

  getInstallationById(vesselId: number) {
    this.installationService.getinstallationsById(vesselId).pipe(take(1)).subscribe((data) => {
      this.installation = data;
      this.installationSource.next(data);
    });
  }
  updateInstallationDetail(installation: Installation) {
    this.installation = installation;
    this.installationSource.next(installation);
  }
  public setInstallationFromRoute(route: ActivatedRoute) {
    if (route.firstChild && route.firstChild !== undefined && route.firstChild !== null) {
      const params = route.firstChild.snapshot.paramMap.get('vesselId');
      const vesselId = parseInt(params, null);
      if (!this.installation) {
          if (vesselId > 0) {
           this.getInstallationById(vesselId);
          }
        }
    }

  }
}
