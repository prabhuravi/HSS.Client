export class Contact {
    constructor(
        public id: number,
        public firstName: string,
        public surName: string,
        public email: string,
        public phone: string,
        public alternativePhone: string,
        public role: ContactRole,
        public tagTraining: boolean = false
    ) {}
}
export class ContactRole {
    constructor(
        public id: number,
        public name: string
    ) {}

}