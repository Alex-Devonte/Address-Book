import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contact } from 'src/app/shared/models/contact-model';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(private route: ActivatedRoute, private contactService: ContactsService) { }
  contact = [new Contact("","","","","","","","","","")];

  ngOnInit(): void {
    //Allows ngOnInit to be called every time route changes instead of just once when component is created
    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      this.getContact(id);
    })
  }

  getContact(id: any) {
    this.contactService.getContact(id).subscribe(res => {
     this.contact = [new Contact(res[0].contact_id, res[0].first_name, res[0].last_name,
                                res[0].nickname, res[0].email_address, res[0].email_type,
                                res[0].phone_number, res[0].phone_type, res[0].profile_picture_path,
                                res[0].user_id)];
    });
  }
}
