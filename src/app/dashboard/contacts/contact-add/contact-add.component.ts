import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/token-storage.service';
import { ContactsService } from '../../contacts/contacts.service';
import { FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { MessageService } from 'src/app/message.service';


@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.scss']
})
export class ContactAddComponent implements OnInit {
  imageSrc: any;
  url = environment.uploadUrl;
  myFile: any;
  attachmentData: any;

  constructor(private router: Router, private contactService: ContactsService, private tokenStorage: TokenStorageService, private messageService: MessageService) { }

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

   this.uploader.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);
  }

  //ng2-File-Upload
  public uploader: FileUploader = new FileUploader({
    url: this.url,
    disableMultipart: false,
    autoUpload: true,
    itemAlias: 'attachment',
    additionalParameter: {folder_id: this.tokenStorage.getToken().id}
  });

  onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    //success server response
    let data = JSON.parse(response); 
    this.attachmentData = data;
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

    //Add attachment property to the form data to be sent to the server
    contactData.attachment = this.attachmentData;

    this.contactService.addContact(this.tokenStorage.getToken().id, contactData).subscribe(res => {
      this.messageService.setMessage("Contact added successfully!");
      this.contactService.refreshContactList();
      this.router.navigate(['/dashboard']);
    });
  }
}
