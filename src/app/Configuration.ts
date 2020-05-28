import { IConfiguration } from '@kognifai/poseidon-configurationinterface';

export interface Configuration extends IConfiguration {
    environment?: string;
    userInfoApiUrl?: string;
    apiCollection?: any;
    filemanagerLink?: any;
    galoreApiUrl?: string;
    galoreSignalRUrl?: string;
}
