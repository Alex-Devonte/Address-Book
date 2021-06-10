export class Contact {
  constructor(public id: string, public firstName: string, public lastName: string,
              public nickname: string, public emailInfo: [{email: string, emailType: string}],
              public phoneInfo: [{phone: string, phoneType: string}], public path: string, public uid: string) {}
}
