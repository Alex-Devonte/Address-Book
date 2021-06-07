import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/app/shared/models/contact-model';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss']
})
export class ContactEditComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private contactService: ContactsService) { }
  contactData = [new Contact("","","","","","","","","","")];

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let id = params.get('id');

      this.contactService.getContact(id).subscribe(res => {
        this.contactData = [new Contact(res[0].contact_id, res[0].first_name, res[0].last_name,
                                        res[0].nickname, res[0].email_address, res[0].email_type,
                                        res[0].phone_number, res[0].phone_type, res[0].profile_picture_path,
                                        res[0].user_id)];
      });
    });
  }

  saveChanges(form: NgForm) {
    const formData = form.value;
    this.contactService.editContact(this.contactData[0].id, formData).subscribe((res: any) => {
      if (!res.hasErrors) {
        this.contactService.refreshContactList();
        this.router.navigate(["dashboard"]);
      }
    });
  }
}
