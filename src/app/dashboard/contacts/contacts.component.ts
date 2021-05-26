import { Component, DoCheck, OnInit } from '@angular/core';
import { TokenStorageService } from '../../token-storage.service';
import { ContactsService } from './contacts.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit, DoCheck {

  contactList = [{firstName: "", lastName: ""}];
  userId = this.tokenStorage.getToken().id;
  numberOfContacts = 0;

  constructor(private contactService: ContactsService, private tokenStorage: TokenStorageService) {}

  ngOnInit(): void {
    this.contactList.pop();
    this.getContactList();
  }

  ngDoCheck() {
    if (this.contactService.formSubmitted) {
      //Use set timeout to prevent list from trying to update before database call was complete
      setTimeout(() => {
        this.getContactList();
      }, 100);  
      
      this.contactService.formSubmitted = false;
    }
  }

  getContactList() {
    this.contactService.getContacts(this.userId).subscribe(res => {
      console.log(res);
      //Allows access to the properties tied to an Object
      let resData = Object.values(res);

      //Clear array before loading in data
      this.contactList.splice(0, this.contactList.length);
      
      for (var i = 0; i < resData.length; i++) {
        let firstName = resData[i].first_name;
        let lastName = resData[i].last_name;
        this.numberOfContacts = resData.length;
        this.contactList.push ({firstName: firstName, lastName: lastName});
      }
    });
  }
}
