import { IConfiguration } from '@kognifai/poseidon-configurationinterface';

export interface Configuration extends IConfiguration {
    environment?: string;
    userInfoApiUrl?: string;
}
