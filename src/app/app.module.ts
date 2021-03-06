import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { ContactsComponent } from './dashboard/contacts/contacts.component';
import { ContactComponent } from './dashboard/contacts/contact/contact.component';
import { ContactEditComponent } from './dashboard/contacts/contact-edit/contact-edit.component';
import { ConfirmPasswordDirective } from './confirm-password.directive';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { ContactAddComponent } from './dashboard/contacts/contact-add/contact-add.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FileUploadModule } from 'ng2-file-upload';
import { SearchPipe } from './dashboard/contacts/search.pipe';
import { MessagesComponent } from './messages/messages.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    ContactsComponent,
    ContactComponent,
    ContactEditComponent,
    ConfirmPasswordDirective,
    DashboardComponent,
    HeaderComponent,
    ContactAddComponent,
    SearchPipe,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    NgbModule,
    FileUploadModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
