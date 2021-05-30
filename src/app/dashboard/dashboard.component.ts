import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { ContactsService } from './contacts/contacts.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterContentChecked {

  constructor(private contactService: ContactsService) { }

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

}
