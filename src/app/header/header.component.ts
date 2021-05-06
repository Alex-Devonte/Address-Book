import { Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, DoCheck {

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService ) { }
  loggedIn = false;

  ngOnInit(): void {
  }

  ngDoCheck() {
    this.checkLogin();
  }

  checkLogin() {
    if (localStorage.getItem(this.tokenStorage.tokenKey)) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  }

  logout() {
    this.loggedIn = false;
    this.authService.logout();
  }

}
