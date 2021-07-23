import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../message.service';
import { ContactsService } from './contacts/contacts.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterContentChecked {

  constructor(private contactService: ContactsService, public router: Router, public messageService: MessageService) { }

  showForm = false;
  numOfContacts = this.contactService.contactList.length;

  ngOnInit(): void {

  }

  ngAfterContentChecked() {
   this.numOfContacts = this.contactService.contactList.length;
  }

  showAddForm() {
    this.showForm = !this.showForm;
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

}
