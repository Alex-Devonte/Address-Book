import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/token-storage.service';
import { ContactsService } from '../../contacts/contacts.service';
import { FileUploader, FileLikeObject, FileItem } from 'ng2-file-upload';


@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.scss']
})
export class ContactAddComponent implements OnInit {
  imageSrc: any;
  url = "http://localhost/address-book/src/php/addContact.php";
  myFile: any;

  constructor(private router: Router, private contactService: ContactsService, private tokenStorage: TokenStorageService) { }

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

  //ng2-File-Upload
  public uploader: FileUploader = new FileUploader({
    url: this.url,
    disableMultipart: false,
    autoUpload: true,
    itemAlias: 'attachment'
  });


  ngOnInit(): void {
    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    }
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

  onFileSelected(event: File[]) {
   const file: File = event[0];
   this.myFile = file;
  }

  addEmailField() {
    this.emails.push({
      id: this.emails.length + 1,
      email: '',
      emailType: ''
    });
  }

  addPhoneField() {
    this.phones.push({
      id: this.phones.length + 1,
      phone: '',
      phoneType: ''
    });
  }

  onSubmit(form: NgForm) {
    const contactData = form.value;
    contactData.emailGroup = this.emails;
    contactData.phoneGroup = this.phones;

    //Only set the picture location if one was uploaded
    if (this.uploader.isFile(this.myFile)) {
      contactData.profilePic = "http://localhost/address-book/src/php/images/" + this.myFile.name;
    }

    this.contactService.addContact(this.tokenStorage.getToken().id, contactData).subscribe(res => {
      this.contactService.refreshContactList();
      this.router.navigate(['/dashboard']);
    });
  }
}
