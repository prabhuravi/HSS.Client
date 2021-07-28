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