import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { map } from 'rxjs/operators/';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  @ViewChild('registrationForm', {static: true}) registrationForm!: NgForm;

  firstName: string = '';
  lastName: string = '' ;
  username: string = '';
  password: string = '';

  registrationError: string = '';
  error: string = '';
  emailExists: boolean = false;
  errorArr = [];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    
  }
  
  checkEmail(form: NgForm) {
    const email = form.value.email;
    //Only check the email if its in a valid format to prevent constant database queries
    if (form.control.get('email')?.valid)
    {
      this.authService.checkEmail(form.value.email).subscribe(res => {
        if (res == '1') {
          this.emailExists = true;
          this.error = "This email already exists";
        } else {
          this.emailExists = false;
        }
      });
    }
  }

  onSubmit(form: NgForm) {
    const firstName = form.value.firstName;
    const lastName = form.value.lastName;
    const email = form.value.email;
    const password = form.value.passwordsGroup.password;

    //Use map operator to manipulate the response
   this.authService.register(firstName, lastName, email, password).pipe(map((resData: any) => {
     if (resData?.hasErrors) {
      //Set the error array to the response error array if applicable 
       this.errorArr = resData.errorArr;
     } else {
       this.router.navigate(["/login"]);
     }
    }
    )).subscribe();
  }
}