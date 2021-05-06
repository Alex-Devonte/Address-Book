export class User {
  constructor(public firstName: string, public lastName: string, public email: string, private _token: string, private _tokenExpiration: Date) {}

  get token() {
    return this._token;
  }
}