export class Contact {
  constructor(public id: string, public firstName: string, public lastName: string,
              public nickname: string, public emailInfo: [{id: string, email: string, emailType: string}],
              public phoneInfo: [{id: string, phone: string, phoneType: string}], public path: string, public uid: string) {}
}
