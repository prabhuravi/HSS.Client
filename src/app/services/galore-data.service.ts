/*
 * KONGSBERG PROPRIETARY. This document and its accompanying elements, contain KONGSBERG information which is proprietary and confidential.
Any disclosure, copying, distribution or use is prohibited if not otherwise explicitly agreed with KONGSBERG in writing.
Any authorized reproduction, in whole or in part, must include this legend. © [year of creation] KONGSBERG – All rights reserved.
 */

import { Injectable } from '@angular/core';

import * as rxjs from 'rxjs';

import { QueryService, HttpClientHelperService } from '@kognifai/galore-ng-client';
import { ConfigurationService } from '@kognifai/poseidon-ng-configurationservice';
import { AuthenticationService } from '@kognifai/poseidon-ng-authenticationservice';
import { MessageService } from '@kognifai/poseidon-message-service';

import { Configuration } from '../configuration';

export enum GaloreApiConnectionStatus {
    Connected,
    Reconnected
}

@Injectable()
export class GaloreDataService {
    public reconnectIntervalSeconds = 10;
    public reconnectSubscription: rxjs.Subscription;
    public connected: boolean = false;
    constructor(
        public queryService: QueryService,
        public configurationService: ConfigurationService<Configuration>,
        public galoreHttpClientHelperService: HttpClientHelperService,
        public authenticationService: AuthenticationService, public messageService: MessageService) {
    }

    initialize(): rxjs.Observable<GaloreApiConnectionStatus> {
        return new rxjs.Observable((subscriber) => {
            if (this.connected) {
                subscriber.next(GaloreApiConnectionStatus.Connected);
            } else {
                this.connectToGaloreApi().then(() => {
                    this.connected = true;
                    subscriber.next(GaloreApiConnectionStatus.Connected);
                }).catch((error) => {
                    this.connected = false;
                });
            }
        });
    }

    public connectToGaloreApi() {
        this.galoreHttpClientHelperService.setBaseApiUrl(this.configurationService.config.galoreApiUrl);
        return this.queryService.initialize(this.configurationService.config.galoreSignalRUrl,
            () => Promise.resolve(this.authenticationService.accessToken));
    }

    public reconnectToGaloreApi(subscriber: rxjs.Subscriber<GaloreApiConnectionStatus>) {
        if (!this.reconnectSubscription) {
            this.reconnectSubscription = rxjs.interval(this.reconnectIntervalSeconds * 1000).subscribe(() => {
                this.connectToGaloreApi().then(() => {
                    subscriber.next(GaloreApiConnectionStatus.Reconnected);
                    this.reconnectSubscription.unsubscribe();
                    this.reconnectSubscription = null;
                }, (err) => {
                    try {
                        throw new Error(err);
                    } catch (err) {
                        this.messageService.error(err);
                    }
                });
            });
        }
    }
}
