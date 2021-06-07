import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { TokenStorageService } from '../token-storage.service';

import { map } from 'rxjs/operators';
import { User } from '../shared/models/user-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginError: string = '';
  loggedIn = false;

  constructor(private authService: AuthService, private router: Router, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken().id) {
      this.loggedIn = true;
      this.router.navigate(["/dashboard"]);
    }
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    this.authService.login(email, password).pipe(map((resData: any) => {
      if (resData?.login) {
        let data = resData.userInfo;
        const user = new User(data.id, data.firstName, data.lastName, data.email);
        this.tokenStorage.saveToken((user));
        this.router.navigate(["/dashboard"]);

      } else {
        this.loginError = "Invalid email and/or password";
      }
    })).subscribe();
  }
}