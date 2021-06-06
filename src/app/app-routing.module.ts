import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactAddComponent } from './dashboard/contacts/contact-add/contact-add.component';
import { ContactEditComponent } from './dashboard/contacts/contact-edit/contact-edit.component';
import { ContactComponent } from './dashboard/contacts/contact/contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'dashboard', component: DashboardComponent,
      children: [
    { path: 'contact/:id', component: ContactComponent },
    { path: 'add', component: ContactAddComponent },
    { path: 'contact/edit/:id', component: ContactEditComponent }
  ] } ,
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
