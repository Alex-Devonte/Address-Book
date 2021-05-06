import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  checkEmailUrl = environment.checkEmailUrl;
  registrationUrl = environment.registrationUrl;
  loginUrl = environment.loginUrl;
  
  constructor(private http: HttpClient) { }

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
    localStorage.clear();
  }
}
