export class Contact {
    constructor(
        public id: number,
        public vesselId: number,
        public contactId: number,
        public vesselContactId: number,
        public contactTypeId: number,
        public name: string,
        public surName: string,
        public email: string,
        public phone: string,
        public alternativePhone: string,
        public ContactType: ContactRole,
        public tagTraining: boolean = false
    ) {}
}
export class ContactRole {
    constructor(
        public id: number,
        public name: string
    ) {}

}