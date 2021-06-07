import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/shared/models/contact-model';
import { TokenStorageService } from '../../token-storage.service';
import { ContactsService } from './contacts.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  contactList = this.contactService.contactList;

  userId = this.tokenStorage.getToken().id;
  numberOfContacts = 0;

  constructor(private contactService: ContactsService, private tokenStorage: TokenStorageService) {
    this.contactService.refreshList$.subscribe(() => {
      this.getContactList();
    });
  }

  ngOnInit(): void {
    this.getContactList();
  }

  getContactList() {
    this.contactService.getContacts(this.userId).subscribe(res => {
      //Allows access to the properties tied to an Object
      let resData = Object.values(res);

      //Clear array before loading in data
      this.contactList.splice(0, this.contactList.length);
      
      for (var i = 0; i < resData.length; i++) {
        let id = resData[i].contact_id;
        let firstName = resData[i].first_name;
        let lastName = resData[i].last_name;
        let nickname = resData[i].nickname;
        let email = resData[i].email;
        let emailType = resData[i].email_type;
        let phone = resData[i].phone;
        let phoneType = resData[i].phoneType;
        let picPath = resData[i].profile_picture_path; 
        let userId = resData[i].user_id;
        this.numberOfContacts = resData.length;
        this.contactList.push(new Contact(id, firstName, lastName, nickname, email, emailType, phone, phoneType, picPath, userId));
      }
    });
  }
}
