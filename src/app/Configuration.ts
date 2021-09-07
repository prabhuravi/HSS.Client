/*
 * KONGSBERG PROPRIETARY. This document and its accompanying elements, contain KONGSBERG information which is proprietary and confidential.
Any disclosure, copying, distribution or use is prohibited if not otherwise explicitly agreed with KONGSBERG in writing.
Any authorized reproduction, in whole or in part, must include this legend. © [year of creation] KONGSBERG – All rights reserved.
 */
import { IConfiguration } from '@kognifai/poseidon-configurationinterface';

export interface Configuration extends IConfiguration {
    environment?: string;
    userInfoApiUrl?: string;
    apiCollection?: any;
    filemanagerLink?: any;
    galoreApiUrl?: string;
    galoreSignalRUrl?: string;
}
