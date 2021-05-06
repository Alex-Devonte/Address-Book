import { Injectable } from '@angular/core';

 const tokenKey: string = "userInfo";

@Injectable({
  providedIn: 'root'
}) 

export class TokenStorageService {

  constructor() { }

  saveToken(token: any) {
    localStorage.setItem(tokenKey, JSON.stringify(token));
  }

  getToken() {
    return JSON.parse(localStorage.getItem(tokenKey) || '{}');
  }
}
