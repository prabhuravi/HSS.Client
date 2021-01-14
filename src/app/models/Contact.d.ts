export class Contact {
firstName: string;
surName: string;
email: string;
phone: string;
alternativePhone: string;
Role: ContactRole = {};
tagTraining: boolean = false;

}
export class ContactRole {
id: number;
name: string;
}