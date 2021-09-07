/*
 * KONGSBERG PROPRIETARY. This document and its accompanying elements, contain KONGSBERG information which is proprietary and confidential.
Any disclosure, copying, distribution or use is prohibited if not otherwise explicitly agreed with KONGSBERG in writing.
Any authorized reproduction, in whole or in part, must include this legend. © [year of creation] KONGSBERG – All rights reserved.
 */
import { Observable, of } from 'rxjs';

export class MockOperationalPlanService {

    getOperationPlans(formData: any): Observable<IOperationalPlan[]> {
        return of();
    }
    updateOperationPlan(planData: any): Observable<IOperationalPlan[]> {
        return of();
    }
    searchOperationPlans(formData: any): Observable<IOperationalPlan[]> {
        return of();
    }
    getSubOperations(planData): Observable<ISubOperations[]> {
        return of();
    }
    updateSubOperationPlan(planData: any): Observable<IOperationalPlan[]> {
        return of();
    }
    getRobotSystemDetails(): Observable<IRobotSystemDetails[]> {
        return of();
    }
    addRobotSystemDetail(robotSystemData): Observable<any> {
        return of();
    }
    deleteRobotSystemDetail(robotSystemData): Observable<any> {
        return of();
    }
    getOperationTypes(): Observable<IOperationTypes[]> {
        return of();
    }
    addOperationType(operationTypeData): Observable<any> {
        return of();
    }
    deleteOperationType(operationTypeData): Observable<any> {
        return of();
    }
    getOperators(): Observable<IOperators[]> {
        return of();
    }
    addOperator(operatorData): Observable<any> {
        return of();
    }
    deleteOperator(operatorData): Observable<any> {
        return of();
    }
    getTimeZone(): ITimeZone[] {
        return [];
    }
    getPlanStatus(): IPlanStatus[] {
        return [];
    }
    getVesselList(): Observable<IVesselList[]> {
        return of();
    }
    addVessel(vesselData): Observable<any> {
        return of();
    }
    deleteVessel(vesselData): Observable<any> {
        return of();
    }

    getOperationalData(): Observable<any[]> {
        return of();
    }
    filterPortLocations(portData: any): Observable<any[]> {
        return of();
    }
}
