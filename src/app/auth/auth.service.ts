import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { TokenStorageService } from '../token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  checkEmailUrl = environment.checkEmailUrl;
  registrationUrl = environment.registrationUrl;
  loginUrl = environment.loginUrl;
  
  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

  isAuthenticated(): boolean {
    if(sessionStorage.getItem(this.tokenStorage.tokenKey) != null) {
      return true;
    }
    return false;
  }

  checkEmail(email: string) {
    return this.http.post(this.checkEmailUrl, email, {responseType: 'text'});
  }

  register(firstName: string, lastName:string, email:string, password:string) {
    return this.http.post(this.registrationUrl, {firstName: firstName, lastName: lastName, email:email, password: password}, {responseType: 'text'});
  }

  login(email: string, password: string) {
    return this.http.post(this.loginUrl, {email: email, password: password});
  }
  
  logout() {
    sessionStorage.clear();
  }
}
