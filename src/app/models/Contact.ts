/*
 * KONGSBERG PROPRIETARY. This document and its accompanying elements, contain KONGSBERG information which is proprietary and confidential.
Any disclosure, copying, distribution or use is prohibited if not otherwise explicitly agreed with KONGSBERG in writing.
Any authorized reproduction, in whole or in part, must include this legend. © [year of creation] KONGSBERG – All rights reserved.
 */
export class Contact {
    constructor(
        public id: number,
        public vesselId: number,
        public operationId: number,
        public contactId: number,
        public vesselContactId: number,
        public contactTypeId: number,
        public name: string,
        public surName: string,
        public email: string,
        public phone: string,
        public alternativePhone: string,
        public ContactType: ContactRole,
        public tagTraining: boolean = false,
        public availability: boolean = true,
        public operatorBooking: OperatorBooking
    ) { }
}
export class ContactRole {
    constructor(
        public id: number,
        public name: string
    ) { }

}

export class OperatorBooking {
    constructor(
        public operationBookingId: number,
        public operationId: number,
        public date: Date,
        public status: string,
        public installationName: string
    ) { }

}
