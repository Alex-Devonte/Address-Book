import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../token-storage.service';
import { ContactsService } from './contacts.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  contactList = [{firstName: "", lastName: ""}];
  userId = this.tokenStorage.getToken().id;
  displayContactForm = false;
  numberOfContacts = 0;

  constructor(private contactService: ContactsService, private tokenStorage: TokenStorageService) {}

  ngOnInit(): void {
    this.contactList.pop();
    this.getContactList();
  }

  getContactList() {
    this.contactService.getContacts(this.userId).subscribe(res => {
      let resData = Object.values(res);
      for (var i = 0; i < resData.length; i++) {
        let firstName = resData[i].first_name;
        let lastName = resData[i].last_name;
        this.numberOfContacts = resData.length;
        this.contactList.push ({firstName: firstName, lastName: lastName});
      }
    });
  }

  addContact() {
    this.displayContactForm = !this.displayContactForm;
  }

}
