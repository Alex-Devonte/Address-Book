import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
}) 

export class TokenStorageService {
  tokenKey: string = "userInfo";
  constructor() { }

  saveToken(token: any) {
    localStorage.setItem(this.tokenKey, JSON.stringify(token));
  }

  getToken() {
    return JSON.parse(localStorage.getItem(this.tokenKey) || '{}');
  }
}
