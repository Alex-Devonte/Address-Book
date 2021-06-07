import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
}) 

export class TokenStorageService {
  tokenKey: string = "userInfo";
  constructor() { }

  saveToken(token: any) {
    sessionStorage.setItem(this.tokenKey, JSON.stringify(token));
  }

  getToken() {
    return JSON.parse(sessionStorage.getItem(this.tokenKey) || '{}');
  }
}
