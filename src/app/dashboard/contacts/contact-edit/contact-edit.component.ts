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
  contactData = [new Contact("","","","",[{id: "", email: "", emailType: ""}],[{id: "", phone: "", phoneType: ""}],"","")];
  imageSrc: any;

  emails = [{
    id: 0,
    email: '',
    emailType: ''
  }];

  phones = [{
    id: 0,
    phone: '',
    phoneType: ''
  }];

  ngOnInit(): void {
    this.emails.pop();
    this.phones.pop();

    this.route.paramMap.subscribe(params => {
      let id = params.get('id');

      this.contactService.getContact(id).subscribe(res => {
        this.contactData = [new Contact(res[0].contact_id, res[0].first_name, res[0].last_name,
                                        res[0].nickname, res.emailData, res.phoneData, res[0].profile_picture_path, res[0].user_id)];
        
        //Populate arrays with data from database to fill out form inputs utilizing two-way binding
        for (let i = 0; i < this.contactData[0].emailInfo.length; i++) {
          this.emails.push({
            id: +this.contactData[0].emailInfo[i].id,
            email: this.contactData[0].emailInfo[i].email,
            emailType: this.contactData[0].emailInfo[i].emailType
          });
        }

        for (let i = 0; i < this.contactData[0].phoneInfo.length; i++) {
          this.phones.push({
            id: +this.contactData[0].phoneInfo[i].id,
            phone: this.contactData[0].phoneInfo[i].phone,
            phoneType: this.contactData[0].phoneInfo[i].phoneType
          });
        }                                 
      });
    });
  }

  //Access FileList form the File API to show a preview of the user's uploaded image
  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;

      reader.readAsDataURL(file);
    }
  } 

  addEmailField() {
    this.emails.push({
      id: (this.emails.length + 2),
      email: '',
      emailType: ''
    });
  }

  addPhoneField() {
    this.phones.push({
      id: (this.phones.length + 1),
      phone: '',
      phoneType: ''
    });
  }

  saveChanges(form: NgForm) {
    const formData = form.value;

    formData.emailGroup = this.emails;
    formData.phoneGroup = this.phones;

    this.contactService.editContact(this.contactData[0].id, formData).subscribe((res: any) => {
      if (!res.hasErrors) {
        this.contactService.refreshContactList();
        this.router.navigate(["dashboard"]);
      }
    });
  }
}
