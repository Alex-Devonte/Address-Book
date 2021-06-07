import { Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../shared/models/user-model';
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, DoCheck {

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService ) {}
  loggedIn = false;
  user = new User("", "", "", "");

  ngOnInit(): void {
  }

  ngDoCheck() {
    this.checkLogin();
  }

  checkLogin() {
    if (sessionStorage.getItem(this.tokenStorage.tokenKey)) {
      let userInfo = JSON.parse(sessionStorage?.getItem(this.tokenStorage.tokenKey) || '{}');
      this.loggedIn = true;
      
      this.user.firstName = userInfo.firstName;
      this.user.lastName = userInfo.lastName;
      this.user.email = userInfo.email;
    } else {
      this.loggedIn = false;
    }
  }

  logout() {
    this.loggedIn = false;
    this.authService.logout();
  }

}
