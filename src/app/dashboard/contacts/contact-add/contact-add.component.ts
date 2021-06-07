import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/token-storage.service';
import { ContactsService } from '../../contacts/contacts.service';

@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.scss']
})
export class ContactAddComponent implements OnInit {
  imageSrc: any;
  constructor(private router: Router, private contactService: ContactsService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
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

  onSubmit(form: NgForm) {
    const contactData = form.value;
    this.contactService.addContact(this.tokenStorage.getToken().id, contactData).subscribe(() => {
      this.contactService.refreshContactList();
      this.router.navigate(['/dashboard']);
    });
  }

}
