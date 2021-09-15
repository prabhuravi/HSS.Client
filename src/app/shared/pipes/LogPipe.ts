/*
 * KONGSBERG PROPRIETARY. This document and its accompanying elements, contain KONGSBERG information which is proprietary and confidential.
Any disclosure, copying, distribution or use is prohibited if not otherwise explicitly agreed with KONGSBERG in writing.
Any authorized reproduction, in whole or in part, must include this legend. © [year of creation] KONGSBERG – All rights reserved.
 */
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'log'})
export class LogPipe implements PipeTransform {
    public transform(value: object): void {
        console.log(value); //This console.log() is intentional
        return;
    }
}
